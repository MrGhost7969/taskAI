import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { BingChat } from 'bing-chat';
import tf from '@tensorflow/tfjs'
import axios from 'axios'

const app = express()
const PORT = 5000

if (!process.env.OPENAI_API_KEY) console.log("OPENAI_API_KEY not set, skipping chatgpt");

app.use(bodyParser.json());

const model = tf.sequential()


const sendMessagesToGPT = async(input) => {
    try {
        const api = new BingChat({
            cookie: process.env.BING_COOKIE
        })
        const res = await api.sendMessage(input);
        console.log(res.text)
        return res.text
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
    console.log("User input: ", requestData.messages[0].content)
    const userMessage = requestData.messages[0].content
    res.status(200).json(await sendMessagesToGPT(userMessage))
})

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))