const { TikTokLiveConnection, WebcastEvent } = require('tiktok-live-connector');
const chalk = require('chalk');
const GeminiAIService = require('./geminiAI');
const TTSService = require('./ttsService');
const figlet = require('figlet');

class TikTokBot {
    constructor(config) {
        this.config = config;
        this.connection = null;
        this.aiService = new GeminiAIService(config.gemini.apiKey);
        this.ttsService = new TTSService();
        this.isConnected = false;
        this.stats = {
            totalComments: 0,
            repliesSent: 0,
            errors: 0,
            startTime: null
        };
        this.gradient = null;
        this.lastGiftTime = 0;
        this.lastGiftId = null;
    }

    async initGradient() {
        if (!this.gradient) {
            const gradientModule = await import('gradient-string');
            this.gradient = gradientModule.default;
        }
    }

    async connect() {
        try {
            await this.initGradient();
            console.clear();
            console.log(this.gradient.rainbow(figlet.textSync('TikTok AI Bot', { horizontalLayout: 'full' })));
            console.log(chalk.blue('🚀 Initializing TikTok Live Connection...'));
            const connectionOptions = {
                enableExtendedGiftInfo: true,
                enableWebsocketUpgrade: true,
                requestPollingIntervalMs: 2000,
                clientParams: {
                    app_language: 'id-ID',
                    device_platform: 'web',
                    browser_language: 'id',
                    browser_platform: 'Win32',
                    browser_name: 'Mozilla',
                    browser_version: '5.0',
                    browser_online: true,
                    cookie_enabled: true,
                    screen_width: 1920,
                    screen_height: 1080,
                    browser_timezone: 'Asia/Jakarta'
                },
                webClientOptions: {
                    timeout: 10000,
                    retries: 3
                },
                wsClientOptions: {
                    timeout: 10000,
                    retries: 3
                },
                processInitialData: true,
                signApiKey: 'MWY3MWY2NjE4MzBiNWNlMTgxYzEwNWFjNmE3YTMwMzU1YWRiODRiYmQ0NmIxOTU3NTY1OTcw'
            };
            
            if (this.config.tiktok.sessionId && this.config.tiktok.targetIdc) {
                connectionOptions.sessionId = this.config.tiktok.sessionId;
                connectionOptions.ttTargetIdc = this.config.tiktok.targetIdc;
                console.log(chalk.yellow('🔐 Using authenticated connection'));
            } else {
                console.log(chalk.yellow('⚠️ Running without authentication (limited features)'));
            }

            const username = this.config.tiktok.username.replace('@', '');
            console.log(chalk.blue(`🎯 Connecting to: ${username}`));
            
            this.connection = new TikTokLiveConnection(username, connectionOptions);
            this.setupEventListeners();
            
            let retryCount = 0;
            const maxRetries = 3;
            
            while (retryCount < maxRetries) {
                try {
                    await this.connection.connect();
                    this.stats.startTime = new Date();
                    break;
                } catch (error) {
                    retryCount++;
                    if (retryCount === maxRetries) {
                        throw error;
                    }
                    console.log(chalk.yellow(`⚠️ Connection attempt ${retryCount} failed, retrying...`));
                    await this.sleep(2000);
                }
            }
            
        } catch (error) {
            console.error(chalk.red('❌ Failed to connect:'), error.message || error);
            if (error.stack) {
                console.error(chalk.red('Stack trace:'), error.stack);
            }
            throw error;
        }
    }

    setupEventListeners() {
        this.connection.on('connected', (state) => {
            this.isConnected = true;
            console.log('\n' + this.gradient.rainbow('='.repeat(50)));
            console.log(chalk.green('✅ Connected to TikTok Live!'));
            if (state && state.roomInfo) {
                if (state.roomInfo.title) {
                    console.log(chalk.cyan(`📺 Stream: ${state.roomInfo.title}`));
                }
                if (state.roomInfo.viewerCount) {
                    console.log(chalk.cyan(`👥 Viewers: ${state.roomInfo.viewerCount}`));
                }
            }
            console.log(chalk.magenta('🤖 AI Auto-Reply Bot is now active!'));
            console.log(this.gradient.rainbow('='.repeat(50)) + '\n');
        });

        this.connection.on('disconnected', () => {
            this.isConnected = false;
            console.log('\n' + this.gradient.rainbow('='.repeat(50)));
            console.log(chalk.red('❌ Disconnected from TikTok Live'));
            console.log(this.gradient.rainbow('='.repeat(50)) + '\n');
        });

        this.connection.on('error', (error) => {
            this.stats.errors++;
            console.log('\n' + this.gradient.rainbow('='.repeat(50)));
            console.error(chalk.red('❌ Connection Error:'), error.message || error);
            if (error.stack) {
                console.error(chalk.red('Stack trace:'), error.stack);
            }
            console.log(this.gradient.rainbow('='.repeat(50)) + '\n');
        });

        this.connection.on(WebcastEvent.CHAT, async (data) => {
            await this.handleComment(data);
        });

        this.connection.on(WebcastEvent.MEMBER, async (data) => {
            const username = data.user?.uniqueId || data.uniqueId || 'Anonymous';
            console.log(chalk.blue(`👋 ${username} joined the stream`));
            
            // Play welcome audio
            try {
                await this.ttsService.textToSpeech(`Selamat datang ${username} di live streaming`);
            } catch (ttsError) {
                console.error(chalk.red('❌ TTS Error:'), ttsError.message);
            }
        });

        this.connection.on(WebcastEvent.LIKE, (data) => {
            const username = data.user?.uniqueId || data.uniqueId || 'Anonymous';
            console.log(chalk.red(`❤️ ${username} liked the stream (${data.likeCount} likes)`));
        });

        this.connection.on(WebcastEvent.GIFT, async (data) => {
            const now = Date.now();
            const giftId = `${data.user?.uniqueId}-${data.giftId}-${now}`;
            if (now - this.lastGiftTime < 1000 && this.lastGiftId === giftId) {
                return;
            }
            this.lastGiftTime = now;
            this.lastGiftId = giftId;

            const username = data.user?.uniqueId || data.uniqueId || 'Anonymous';
            const giftName = data.giftName || data.gift?.name || 'Gift';
            const repeatCount = data.repeatCount || data.repeat || 1;
            console.log(chalk.yellow(`🎁 ${username} sent ${giftName} (${repeatCount}x)`));
            
            // Play gift audio
            try {
                await this.ttsService.textToSpeech(`Terima kasih ${username} telah mengirim ${giftName}`);
            } catch (ttsError) {
                console.error(chalk.red('❌ TTS Error:'), ttsError.message);
            }
        });

        this.connection.on(WebcastEvent.FOLLOW, (data) => {
            const username = data.user?.uniqueId || data.uniqueId || 'Anonymous';
            console.log(chalk.green(`➕ ${username} followed the streamer`));
        });
    }

    async handleComment(data) {
        this.stats.totalComments++;
        const username = data.user?.uniqueId || data.uniqueId || 'Anonymous';
        const comment = data.comment;
        
        console.log('\n' + this.gradient.rainbow('='.repeat(50)));
        console.log(chalk.white(`💬 ${username}: ${comment}`));
        
        if (!this.config.bot.replyEnabled) {
            return;
        }

        try {
            await this.sleep(this.config.bot.replyDelay);
            
            const aiReply = await this.aiService.generateReply(comment, username);
            console.log(chalk.magenta(`🤖 Bot: ${aiReply}`));
            try {
                await this.ttsService.textToSpeech(aiReply);
            } catch (ttsError) {
                console.error(chalk.red('❌ TTS Error:'), ttsError.message);
            }
            
            const isAuthenticated = this.config.tiktok.sessionId && this.config.tiktok.targetIdc;
            
            if (isAuthenticated) {
                try {
                    await this.sendReply(aiReply);
                    this.stats.repliesSent++;
                } catch (error) {
                    if (!error.message?.includes('Premium Feature')) {
                        throw error;
                    }
                }
            }
            
            console.log(this.gradient.rainbow('='.repeat(50)) + '\n');
            
        } catch (error) {
            this.stats.errors++;
            if (!error.message?.includes('Premium Feature')) {
                console.error(chalk.red('❌ Error handling comment:'), error.message);
            }
            console.log(this.gradient.rainbow('='.repeat(50)) + '\n');
        }
    }

    async sendReply(message) {
        try {
            if (!this.config.tiktok.sessionId || !this.config.tiktok.targetIdc) {
                throw new Error('Authentication required to send messages');
            }

            await this.connection.sendMessage(message);
        } catch (error) {
            if (!error.message?.includes('Premium Feature')) {
                console.error(chalk.red('❌ Failed to send reply:'), error.message);
                throw error;
            }
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    disconnect() {
        if (this.connection && this.isConnected) {
            this.connection.disconnect();
            console.log('\n' + this.gradient.rainbow('='.repeat(50)));
            console.log(chalk.yellow('👋 Bot disconnected'));
            console.log(this.gradient.rainbow('='.repeat(50)) + '\n');
        }
    }
}

module.exports = TikTokBot;