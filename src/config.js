require('dotenv').config();

const config = {
    tiktok: {
        username: process.env.TIKTOK_USERNAME,
        sessionId: process.env.TIKTOK_SESSION_ID,
        targetIdc: process.env.TIKTOK_TARGET_IDC
    },
    
    gemini: {
        apiKey: process.env.GEMINI_API_KEY
    },
    
    bot: {
        replyEnabled: process.env.BOT_REPLY_ENABLED === 'true',
        replyDelay: parseInt(process.env.REPLY_DELAY_MS) || 2000,
        maxReplyLength: parseInt(process.env.MAX_REPLY_LENGTH) || 100
    }
};

function validateConfig() {
    const requiredFields = [
        { field: config.tiktok.username, name: 'TIKTOK_USERNAME' },
        { field: config.gemini.apiKey, name: 'GEMINI_API_KEY' }
    ];
    
    const missingFields = requiredFields.filter(req => !req.field);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required configuration: ${missingFields.map(f => f.name).join(', ')}`);
    }
}

module.exports = { config, validateConfig }; 