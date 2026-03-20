// routes/chatRoutes.js
import express from "express";
import OpenAI from "openai";
import Chat from "../models/Chat.js";

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/", async (req, res) => {
    try {
        const { message, userId, product } = req.body;

        const systemPrompt = `
You are an AI assistant for a pawnshop web app.

You help users with:
- Product valuation
- Selling process
- Loan against items
- FAQs

Rules:
- Give short and clear answers
- Suggest next steps
- If irrelevant question → politely refuse
- No Gemstone or Diamond it is just Gold
-Valuation only
- current INR price per gram gold fetch it from yourself,
`;

        const userContext = `
User Message: ${message}

Product Details:
Name: ${product?.name || "N/A"}
Category: ${product?.category || "N/A"}
Weight: ${product?.weight || "N/A"}
Condition: ${product?.condition || "N/A"}
Karat: "22K"
Currency: "INR"
`;

        const response = await openai.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContext }
            ],
            // temperature: 0.7
        });

        const aiReply = response.choices[0].message.content;

        // Save chat
        await Chat.create({
            userId,
            message,
            response: aiReply
        });

        res.json({ reply: aiReply });

    } catch (err) {
        console.error(err);
        res.status(500).send("AI Error");
    }
});

export default router;