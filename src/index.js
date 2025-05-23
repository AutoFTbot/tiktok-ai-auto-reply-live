const chalk = require('chalk');
const { config, validateConfig } = require('./config');
const TikTokBot = require('./tiktokBot');

const banner = `
████████╗██╗██╗  ██╗████████╗ ██████╗ ██╗  ██╗    ██████╗  ██████╗ ████████╗
╚══██╔══╝██║██║ ██╔╝╚══██╔══╝██╔═══██╗██║ ██╔╝    ██╔══██╗██╔═══██╗╚══██╔══╝
   ██║   ██║█████╔╝    ██║   ██║   ██║█████╔╝     ██████╔╝██║   ██║   ██║   
   ██║   ██║██╔═██╗    ██║   ██║   ██║██╔═██╗     ██╔══██╗██║   ██║   ██║   
   ██║   ██║██║  ██╗   ██║   ╚██████╔╝██║  ██╗    ██████╔╝╚██████╔╝   ██║   
   ╚═╝   ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
                                                                              
                    🤖 AI Auto-Reply Bot with Gemini AI 🤖
`;

async function main() {
    console.log(chalk.cyan(banner));
    console.log(chalk.magenta('━'.repeat(80)));
    
    try {
        console.log(chalk.blue('🔧 Validating configuration...'));
        validateConfig();
        console.log(chalk.green('✅ Configuration validated'));
        console.log(chalk.blue('🤖 Initializing TikTok AI Bot...'));
        const bot = new TikTokBot(config);
        
        bot.connect().catch(error => {
            console.error(chalk.red('💥 Fatal Error:'), error.message);
            process.exit(1);
        });
        process.on('SIGINT', () => {
            console.log(chalk.yellow('\n⚠️ Shutting down...'));
            bot.disconnect();
            process.exit(0);
        });
        
        process.on('SIGTERM', () => {
            console.log(chalk.yellow('\n⚠️ Shutting down...'));
            bot.disconnect();
            process.exit(0);
        });
        
    } catch (error) {
        console.error(chalk.red('💥 Fatal Error:'), error.message);
        
        if (error.message.includes('GEMINI_API_KEY')) {
            console.log(chalk.yellow('\n📝 How to get Gemini API Key:'));
            console.log(chalk.white('1. Go to https://makersuite.google.com/app/apikey'));
            console.log(chalk.white('2. Create a new API key'));
            console.log(chalk.white('3. Add it to your .env file\n'));
        }
        
        if (error.message.includes('TIKTOK_USERNAME')) {
            console.log(chalk.yellow('\n📝 Setup Instructions:'));
            console.log(chalk.white('1. Copy .env.example to .env'));
            console.log(chalk.white('2. Set TIKTOK_USERNAME to target stream (e.g., @username)'));
            console.log(chalk.white('3. Get your Gemini API key and add it to .env\n'));
        }
        
        process.exit(1);
    }
}

process.on('uncaughtException', (error) => {
    console.error(chalk.red('💥 Uncaught Exception:'), error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('💥 Unhandled Rejection:'), reason);
    process.exit(1);
});

main(); 