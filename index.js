import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "There is necessary send a message." });
    }

    const openai = new OpenAI({
        apiKey: process.env.API_KEY
    });

    const request = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role: "user",
            content: message,
            stream: true
        }]
    });

    const reply = request.choices[0]?.message.content || "There is no answer by gpt-4o-mini";
    res.json({ reply });
});

app.listen(port, () => {
    console.log(`This is my new server on http:localhost:${port}.`);
});