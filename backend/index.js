import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "mistralai/mistral-7b-instruct",
                messages: [
                    {
                        role: "system",
                        content: "You're a helpful bot that teaches digital tools like WhatsApp, Paytm, and Google Maps to beginners in a friendly tone."
                    },
                    {
                        role: "user",
                        content: question
                    }
                ],
                temperature: 0.7
            })

        });

        const data = await response.json();
        // console.log("🧠 OpenRouter Response:", JSON.stringify(data, null, 2));

        if (!data.choices || !data.choices[0]) {
            return res.status(500).json({ error: "Invalid AI response", data });
        }

        const reply = data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error("❌ Server error:", error);
        res.status(500).json({ error: "Server error while contacting OpenRouter" });
    }
});

app.listen(5000, () => {
    console.log("✅ Server running at http://localhost:5000");
});
