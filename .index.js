require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: message },
            ],
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong. Please try again." });
    }
})