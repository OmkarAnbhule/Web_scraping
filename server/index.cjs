require('dotenv').config()
const express = require('express');
const Groq = require("groq-sdk");
const cors = require('cors')
const app = express();
app.use(express.json())
const allowedOrigins = ['https://webscrap-backend.vercel.app', 'https://webscrap-sigma.vercel.app'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.get('/', (req, resp) => {
    resp.send('Server Started')
})

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