import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

export const generateSummary = async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey.trim() === '') {
            return res.status(500).json({ message: "AI Engine is offline. Missing GEMINI_API_KEY inside backend/.env" });
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const { jobTitle, experienceLevel } = req.body;
        
        if (!jobTitle) {
            return res.status(400).json({ message: "Job title is required to generate a summary." });
        }

        const prompt = `You are an expert resume writer and career coach. Please generate a highly professional, impactful, and ATS-optimized 'Professional Summary' for a resume. 
The user is a ${experienceLevel || 'Professional'} ${jobTitle}. 
The summary should be 3-4 sentences long, highlighting core strengths, leadership, and technical prowess. Do NOT use placeholder brackets like [Years] or [Skills], make it sound generic but powerful enough to copy-paste. Output ONLY the summary text, without any conversational padding or quotes.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.status(200).json({ summary: response.text });
    } catch (error) {
        console.error("AI Summary Error:", error);
        res.status(500).json({ message: "Failed to generate AI summary", error: error.message });
    }
};

export const enhanceBullet = async (req, res) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey.trim() === '') {
            return res.status(500).json({ message: "AI Engine is offline. Missing GEMINI_API_KEY inside backend/.env" });
        }
        
        const ai = new GoogleGenAI({ apiKey });

        const { text, jobTitle } = req.body;
        
        if (!text) {
            return res.status(400).json({ message: "Bullet point text is required to enhance it." });
        }

        const prompt = `You are an elite career coach. Please rewrite the following resume bullet point to make it exceptionally impactful and ATS-optimized. 
${jobTitle ? `The candidate's role is: ${jobTitle}.` : ''}
Original bullet: "${text}"

Rules:
1. Start with a strong action verb.
2. Incorporate an implied metric or result if possible.
3. Make it concise but powerful (1-2 lines).
4. Output ONLY the enhanced bullet text, without bullet characters like '-' or '*', and without any conversational padding or quotes.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        res.status(200).json({ enhancedText: response.text });
    } catch (error) {
        console.error("AI Bullet Error:", error);
        res.status(500).json({ message: "Failed to enhance bullet point", error: error.message });
    }
};
