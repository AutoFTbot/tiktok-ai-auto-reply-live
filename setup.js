const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const banner = `
🤖 TikTok AI Auto-Reply Bot Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

console.log(chalk.cyan(banner));

const questions = [
    {
        key: 'TIKTOK_USERNAME',
        question: 'Masukkan username TikTok target (contoh: @username): ',
        required: true
    },
    {
        key: 'GEMINI_API_KEY',
        question: 'Masukkan Google Gemini API Key: ',
        required: true
    },
    {
        key: 'TIKTOK_SESSION_ID',
        question: 'Masukkan TikTok Session ID (opsional, untuk mengirim balasan): ',
        required: false
    },
    {
        key: 'TIKTOK_TARGET_IDC',
        question: 'Masukkan TikTok Target IDC (opsional): ',
        required: false
    },
    {
        key: 'REPLY_DELAY_MS',
        question: 'Delay antar balasan dalam ms (default: 2000): ',
        required: false,
        defaultValue: '2000'
    }
];

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(chalk.yellow(question.question), (answer) => {
            if (question.required && !answer.trim()) {
                console.log(chalk.red('❌ Field ini wajib diisi!'));
                return askQuestion(question).then(resolve);
            }
            resolve(answer.trim() || question.defaultValue || '');
        });
    });
}

async function setup() {
    console.log(chalk.green('🚀 Mari setup TikTok AI Bot Anda!\n'));
    
    const config = {
        BOT_REPLY_ENABLED: 'true',
        MAX_REPLY_LENGTH: '100'
    };
    
    for (const question of questions) {
        const answer = await askQuestion(question);
        config[question.key] = answer;
    }
    const envContent = Object.entries(config)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    fs.writeFileSync('.env', envContent);
    
    console.log(chalk.green('\n✅ Setup selesai!'));
    console.log(chalk.cyan('📁 File .env telah dibuat'));
    
    if (!config.TIKTOK_SESSION_ID || !config.TIKTOK_TARGET_IDC) {
        console.log(chalk.yellow('\n⚠️  Note: Tanpa Session ID, bot hanya bisa monitoring (tidak bisa kirim balasan)'));
        console.log(chalk.white('   Untuk mendapatkan Session ID, lihat README.md bagian Authentication'));
    }
    
    console.log(chalk.magenta('\n🚀 Jalankan bot dengan: npm start'));
    console.log(chalk.white('📖 Untuk informasi lengkap, baca README.md\n'));
    
    rl.close();
}

console.log(chalk.blue('📝 Info: Untuk mendapatkan Gemini API Key:'));
console.log(chalk.white('   1. Kunjungi: https://makersuite.google.com/app/apikey'));
console.log(chalk.white('   2. Buat API key baru'));
console.log(chalk.white('   3. Copy dan paste saat diminta\n'));

setup().catch(console.error); 