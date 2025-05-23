const gtts = require('gtts');
const player = require('play-sound')({});
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

class TTSService {
    constructor() {
        this.audioDir = path.join(__dirname, '../audio');
        this.ensureAudioDirectory();
    }

    ensureAudioDirectory() {
        if (!fs.existsSync(this.audioDir)) {
            fs.mkdirSync(this.audioDir, { recursive: true });
        }
    }

    async textToSpeech(text) {
        try {
            const filename = `reply_${Date.now()}.mp3`;
            const filepath = path.join(this.audioDir, filename);
            await new Promise((resolve, reject) => {
                const gttsInstance = new gtts(text, 'id');
                gttsInstance.save(filepath, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            await new Promise((resolve, reject) => {
                player.play(filepath, (err) => {
                    if (err) {
                        console.error('Error playing audio:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            console.log(chalk.blue(`🔊 Generated and played audio for: "${text}"`));

        } catch (error) {
            console.error('TTS Error:', error);
            throw error;
        }
    }
}

module.exports = TTSService; 