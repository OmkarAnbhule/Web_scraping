require('dotenv').config()
const express = require('express');
const corsAnywhere = require('cors-anywhere');
const Groq = require("groq-sdk");
const cors = require('cors')
const app = express();
app.use(express.json())

app.use(cors({
    origin: ['https://webscrap-sigma.vercel.app'], // Allow this origin
    credentials: true
}));



const PORT = process.env.PORT || 8080;

corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
}).listen(PORT, () => {
    console.log(`CORS Anywhere server running on http://localhost:${PORT}`);
});

app.post('/api/chat', async (req, res) => {
    try {
        console.log(process.env.API_KEY, req.body)
        const groq = new Groq({ apiKey: process.env.API_KEY });
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: `summarize ${req.body.url}`,
                },
            ],
            model: "mixtral-8x7b-32768",
        });

        res.status(200).send({ success: true, message: completion.choices[0]?.message?.content || "" });
    } catch (e) {
        console.error(e);
        res.status(500).send({ success: false, message: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('API server running on http://localhost:3000');
});