import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { BingChat } from 'bing-chat';
import tf from '@tensorflow/tfjs'
import mongoose from 'mongoose'
import crypto from 'crypto'
// import googleOAuth from '../routes/googleOauth'
import axios from 'axios'
import passport from 'passport'
import LocalStrategy from 'passport-local'
import passportLocalMongoose from 'passport-local-mongoose'
import OpenAI from 'openai';
import session from 'express-session'
import Account from './models/account.js'
const app = express()
const PORT = 5000

// app.use('../routes/googleOauth', googleOAuth);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.KEY,
    // Forces the session to be saved back to the session store
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const MONGO_URL = process.env.MONGO_URL
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((connected) => connected ? console.log("Database connected") : console.log("Something ain't right"))
    .catch(error => console.log(`Make sure the database is connected, otherwise, read this error: ${error}`));

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

if (!process.env.OPENAI_API_KEY) console.log("OPENAI_API_KEY not set, skipping chatgpt");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const threadByUser = {}
let tempUserId;
// For authenticating the user
app.get("/", (req, res) => {
    res.send("Task AI get it!")
    console.log("Task AI base get request")
    // Direct existing user to home page, otherwise, direct to login page.
    // Save user data for future sessions
    // if(req.isAuthenticated()){
    //     Account.find({}).then(userContent => {
    //         res.render('Home')
    //     }).catch(err => console.log("There's something wrong:", err))
    // } else {
    //     res.redirect('/AuthPage')
    //     console.log('Problem!')
    // }
})

// Chatbot
app.post('/chat', async (req, res) => {
    const { userRequest } = req.body || {};
    const userId = crypto.randomUUID();
    const taskAIAssistant = await openai.beta.assistants.retrieve(process.env.OPENAI_ASSISTANT_ID);
    console.log(`User id BEFORE: ${userId} and thread by user id: ${threadByUser[userId]}`)
    // Create a new thread if it's the user's first message
    if (!threadByUser[userId]) {
        try {
            tempUserId = userId;
            const chatThread = await openai.beta.threads.create();
            console.log("New thread created with ID: ", chatThread.id, "\n");
            threadByUser[tempUserId] = chatThread.id; // Store the thread ID for this user; helpful for organizing chats
        } catch (error) {
            console.error("Error creating thread:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    }

    // Add a Message to the Thread
    try {
        const userMessage = await openai.beta.threads.messages.create(
            threadByUser[tempUserId], // Use the stored thread ID for this user
            {
                role: "user",
                content: userRequest,
            }
        );
        console.log("This is the message object: ", userMessage, "\n");

        // Run the Assistant
        let assistantRun = await openai.beta.threads.runs.create(
            threadByUser[tempUserId], // Use the stored thread ID for this user
            {
                assistant_id: taskAIAssistant.id,
            }
        );
        console.log("This is the run object: ", assistantRun, "\n");
        while (assistantRun.status !== "completed") {
            await new Promise(resolve => setTimeout(resolve, 1000)) // if it's still incomplete, run it again with a 1 second delay until the status says "completed"
            assistantRun = await openai.beta.threads.runs.retrieve(threadByUser[tempUserId], assistantRun.id);
            console.log(`This is the run retrieve object: ${JSON.stringify(assistantRun)}`);
        }
        // Get the Assistant's response
        const assistantResponse = await openai.beta.threads.messages.list(threadByUser[tempUserId]);
        assistantResponse.body.data.forEach(response => {
            console.log("This is the assistant's response: ", response.content, "\n");
        });
        console.log(`User id AFTER: ${tempUserId} and thready by user id: ${threadByUser[tempUserId]}`)
        // Send the response back to the front-end
        res.json({ response: assistantResponse.body.data[0].content[0].text.value });
    } catch (error) {
        console.error("Error running the assistant:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})
app.get('/register', (req, res) => {
    console.log("Register page!")
    res.status(200).send("Register page loaded!")
})
app.post('/register', (req, res) => {
    console.log('Request body:', req.body);
    let { emailState, passwordState } = req.body || {}
    console.log(`Email: ${emailState}, Password: ${passwordState}`)
    if (!emailState || !passwordState) {
        console.log(!emailState ? `EmailState is false ${emailState}` : !passwordState && `PasswordState is false ${passwordState}`)
        return res.status(400).json({ error: 'Both email and password are required.' });
    }
    Account.register({ email: emailState }, passwordState, (err, user) => {
        if (err) {
            console.log(err)
            console.log(emailState)
            console.log(passwordState)
            return res.status(400).json({ error: err.message });
        } else {
            passport.authenticate('local')(req, res, (err, result) => {
                if (err) console.log(`Passport authenticate in registration isn't working properly: ${err}`)
                console.log('User registered successfully');
                console.log(emailState)
                return res.status(200).json({ message: 'Registration successful' });
            });
        }
    })
    console.log(`passwordState after register method: ${passwordState}`)
})
app.get('/login', (req, res) => {
    console.log("Login page!")
})
app.post('/login', (req, res) => {
    let { emailInput, passwordInput } = req.body || {}
    console.log(emailInput, passwordInput);
    const user = new Account({
        email: emailInput
    })
    if (!req.isAuthenticated()) {
        console.log("Not authenticated!")
    } else {
        console.log("Authenticated!")
    }
    req.login(user, (err) => {
        if (err) {
            console.log(err)
        } else {
            passport.authenticate('local')(req, res, function () {
                if (!passwordInput) {
                    res.redirect('/AuthPage')
                    console.log("Please insert a password");
                }
                res.redirect('/')
            });
        }
    })
})


app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))