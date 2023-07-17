import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { BingChat } from 'bing-chat';
import axios from 'axios'
import { sendMessagesToApiHub } from './dist/chatGPT.js';
const app = express()
const PORT = 5000

if (!process.env.OPENAI_API_KEY) console.log("OPENAI_API_KEY not set, skipping chatgpt");

app.use(bodyParser.json());

const sendMessagesToGPT = async(input) => {
    try {
        const api = new BingChat({
            cookie: process.env.BING_COOKIE
        })
        const response = await api.sendMessage(input);
        console.log(response.text)
    } catch (error) {
        console.log(error)
        throw error
    }
}

app.use(cors());

app.get('/', (req, res) => {
    res.send("Task AI GET it")
})

app.post('/chat', async (req, res) => {
    let { requestData } = req.body || {};
    console.log('Received request:', requestData);
    const userMessage = requestData.messages[0].content
    res.status(200).send(await sendMessagesToGPT(userMessage))
})

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))