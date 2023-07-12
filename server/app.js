import express from 'express'
import { Configuration, OpenAIApi } from 'openai'
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const chat_completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: "Hello world" }],
// });
const app = express()
const PORT = 5000

app.get('/', (req, res) => {
    console.log("Hello World")
    res.send("Hello World")
})

app.post('/', (req, res) => {
    console.log("POST")
})

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))