const chalk = require('chalk');
const GeminiAIService = require('./src/geminiAI');
const TTSService = require('./src/ttsService');

const banner = `
🎭 TikTok AI Bot Demo - Test AI Responses & Voice
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

console.log(chalk.cyan(banner));
const sampleComments = [
    { username: 'user123', comment: 'Halo semua!' },
    { username: 'gamer456', comment: 'Kontennya keren banget!' },
    { username: 'fan789', comment: 'Pertama kali nonton, suka banget!' },
    { username: 'viewer101', comment: 'Kapan live lagi?' },
    { username: 'supporter', comment: 'Semangat terus ya!' },
    { username: 'newbie', comment: 'Gimana caranya jadi pro kayak gini?' },
    { username: 'follower', comment: 'Tutorial dong!' },
    { username: 'regular', comment: 'Selalu nonton live kamu!' }
];

async function runDemo() {
    require('dotenv').config();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        console.log(chalk.red('❌ GEMINI_API_KEY tidak ditemukan!'));
        console.log(chalk.yellow('📝 Setup API key terlebih dahulu:'));
        console.log(chalk.white('   1. Copy .env.example ke .env'));
        console.log(chalk.white('   2. Tambahkan GEMINI_API_KEY ke file .env'));
        console.log(chalk.white('   3. Atau jalankan: npm run setup\n'));
        return;
    }
    
    console.log(chalk.green('✅ Gemini API Key ditemukan'));
    console.log(chalk.blue('🤖 Initializing AI Service...\n'));
    
    const aiService = new GeminiAIService(apiKey);
    const ttsService = new TTSService();
    
    console.log(chalk.magenta('🎯 Testing AI responses dan voice untuk sample comments:\n'));
    
    for (const sample of sampleComments) {
        console.log(chalk.white(`💬 ${sample.username}: ${sample.comment}`));
        
        try {
            const reply = await aiService.generateReply(sample.comment, sample.username);
            console.log(chalk.green(`🤖 AI Reply: ${reply}`));
            console.log(chalk.blue('🔊 Converting to speech...'));
            await ttsService.textToSpeech(reply);
            
        } catch (error) {
            console.log(chalk.red(`❌ Error: ${error.message}`));
        }
        
        console.log(chalk.gray('─'.repeat(50)));
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(chalk.cyan('\n✨ Demo selesai!'));
    console.log(chalk.yellow('📖 Untuk menjalankan bot sebenarnya:'));
    console.log(chalk.white('   1. Setup credentials lengkap dengan: npm run setup'));
    console.log(chalk.white('   2. Jalankan bot dengan: npm start\n'));
}

runDemo().catch(error => {
    console.error(chalk.red('💥 Demo Error:'), error.message);
}); 