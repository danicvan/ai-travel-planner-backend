import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();
const port = process.env.PORT || 6000;

express.json();

app.post('/api/chat', async (req, res) => {
    req.send(res.json({ message: "Hello World!" }));
});

app.listen(port, () => {
    console.log(`This is my new server on http:localhost:${port}.`);
});