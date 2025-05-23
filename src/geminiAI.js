const { GoogleGenerativeAI } = require('@google/generative-ai');
const chalk = require('chalk');

class GeminiAIService {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        this.systemPrompt = `Kamu adalah bot AI yang membalas komentar di TikTok Live stream. 
Karaktermu:
- Ramah dan energik
- Menggunakan bahasa gaul Indonesia 
- Suka menggunakan emoji yang relevan
- Jawaban singkat dan menarik (maksimal 100 karakter)
- Responsif terhadap konteks komentar
- Jangan gunakan kata-kata kasar atau tidak pantas

Balas komentar dengan cara yang natural dan engaging sesuai konteks.`;
    }

    async generateReply(comment, username) {
        try {
            const prompt = `${this.systemPrompt}

Username: ${username}
Komentar: "${comment}"

Balas komentar ini dengan singkat dan menarik:`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            let reply = response.text().trim();
            
            if (reply.length > 100) {
                reply = reply.substring(0, 97) + '...';
            }
            
            console.log(chalk.green(`✨ AI Reply Generated: ${reply}`));
            return reply;
            
        } catch (error) {
            console.error(chalk.red('❌ Error generating AI reply:'), error.message);
            
            const fallbackReplies = [
                'Halo! 👋',
                'Mantap komennya! 🔥',
                'Thanks udah nonton! 😊',
                'Setuju banget! 💯',
                'Wah keren! ✨'
            ];
            
            return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
        }
    }
}

module.exports = GeminiAIService; 