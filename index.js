import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAi from "openai";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 6000;

const openai = new OpenAi({
    apiKey: process.env.API_KEY,
});

const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "user",
            content: "Say this is a test"
        }
    ],
});

const jsonParser = bodyParser.json();
const urlencodedParser = bordyParser.urlencoded({ extended: false });

app.post('/api/chat', urlencodedParser, async (req, res) => {
    console.log(`This receive a message: ${message}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}.`);
});