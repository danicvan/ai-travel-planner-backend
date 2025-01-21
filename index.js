import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAi from "openai";

const app = express();
const port = process.env.PORT || 6000;

const openai = new OpenAi({
    apiKey: process.env.API_KEY,
});

const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-4o-mini"
})

app.listen(port, () => {
    console.log(JSON.stringify(`gpt-4o-mini answered and return request id: ${response._request_id}`));
});