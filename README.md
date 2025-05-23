# 🤖 TikTok AI Auto-Reply Bot

Bot TikTok Live yang otomatis membalas komentar menggunakan AI Gemini. Bot ini dapat memantau live stream TikTok dan memberikan balasan yang cerdas dan contextual menggunakan Google Gemini AI.

## ✨ Fitur

- 🎯 **Auto-Reply Cerdas**: Membalas komentar secara otomatis dengan AI Gemini
- 🔊 **Voice Replies**: Mengkonversi balasan teks ke suara menggunakan Google TTS
- 🇮🇩 **Bahasa Indonesia**: Bot dioptimalkan untuk percakapan dalam bahasa Indonesia  
- 🎭 **Karakter Bot**: Personality ramah, energik dengan emoji yang menarik
- 📊 **Real-time Monitoring**: Memantau likes, follows, gifts, dan aktivitas lainnya
- 🔐 **Authentication Support**: Mendukung login untuk mengirim balasan
- ⚡ **Rate Limiting**: Delay otomatis untuk menghindari spam
- 📈 **Statistics**: Laporan statistik real-time

## 🚀 Quick Start

### 1. Clone dan Install

```bash
git clone <repository-url>
cd tiktok-ai-auto-reply
npm install
```

### 2. Setup Environment

Copy file environment dan edit sesuai kebutuhan:

```bash
cp .env.example .env
```

Edit file `.env`:

```env
# TikTok Configuration
TIKTOK_USERNAME=@username_target
TIKTOK_SESSION_ID=your_session_id_here
TIKTOK_TARGET_IDC=your_target_idc_here

# Google Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Bot Configuration  
BOT_REPLY_ENABLED=true
REPLY_DELAY_MS=2000
MAX_REPLY_LENGTH=100
```

### 3. Dapatkan API Key Gemini

1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Buat API key baru
3. Copy dan paste ke file `.env`

### 4. Jalankan Bot

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🔐 Authentication (Opsional)

Untuk mengirim balasan ke chat, Anda perlu authentication TikTok:

### Cara Mendapatkan Session Cookies:

1. **Login ke TikTok** di browser
2. **Buka Developer Tools** (F12)
3. **Pergi ke tab Network**
4. **Refresh halaman** TikTok
5. **Cari request** ke `webcast.tiktok.com`
6. **Copy cookies:**
   - `sessionid` → `TIKTOK_SESSION_ID`
   - `tt-target-idc` → `TIKTOK_TARGET_IDC`

> ⚠️ **Penting**: Jaga kerahasiaan session cookies Anda!

## 📋 Mode Operation

### Tanpa Authentication
- ✅ Memantau komentar, likes, follows
- ✅ Generate AI replies
- ❌ Tidak bisa mengirim balasan ke chat

### Dengan Authentication  
- ✅ Semua fitur monitoring
- ✅ Generate AI replies
- ✅ **Mengirim balasan ke chat TikTok**

## 🛠️ Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `TIKTOK_USERNAME` | Username TikTok target (contoh: @username) | Required |
| `TIKTOK_SESSION_ID` | Session cookie untuk authentication | Optional |
| `TIKTOK_TARGET_IDC` | Target IDC cookie untuk authentication | Optional |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `BOT_REPLY_ENABLED` | Enable/disable auto-reply | `true` |
| `REPLY_DELAY_MS` | Delay antar balasan (ms) | `2000` |
| `MAX_REPLY_LENGTH` | Maksimal panjang balasan | `100` |

## 🎨 Contoh Output

```
🤖 TikTok AI Auto-Reply Bot

✅ Connected to TikTok Live!
📺 Stream: Live streaming now!
👥 Viewers: 1,234
🤖 AI Auto-Reply Bot is now active!

💬 user123: Halo semua!
🔊 Generated audio for: "Halo juga! Selamat datang di live stream! 👋"
🤖 Bot replied: Halo juga! Selamat datang di live stream! 👋

💬 fan456: Kontennya keren!
🔊 Generated audio for: "Makasih ya! Senang kalian suka kontennya! 🔥✨"
🤖 Bot replied: Makasih ya! Senang kalian suka kontennya! 🔥✨
```

## 📊 Monitoring

Bot akan menampilkan statistik setiap 60 detik:

```
📊 Bot Statistics:
💬 Comments Processed: 45
🤖 Replies Sent: 38
❌ Errors: 2
🔗 Status: Connected
```

## 🎯 Customization

### Mengubah Personality Bot

Edit file `src/geminiAI.js` pada bagian `systemPrompt`:

```javascript
this.systemPrompt = `Kamu adalah bot AI yang membalas komentar di TikTok Live stream. 
Karaktermu:
- [Tambah karakteristik sesuai keinginan]
- [Ubah style bahasa]
- [Tentukan emoji favorit]
...`;
```

### Menambah Event Handlers

Edit file `src/tiktokBot.js` untuk menambah handler event lain:

```javascript
// Contoh: Handle event share
this.connection.on(WebcastEvent.SHARE, (data) => {
    console.log(`📤 ${data.uniqueId} shared the stream`);
});
```

## 🚨 Troubleshooting

### Bot tidak bisa connect
- Pastikan username TikTok benar (gunakan format @username)
- Cek apakah live stream sedang aktif
- Pastikan koneksi internet stabil

### Bot tidak bisa kirim balasan
- Pastikan `TIKTOK_SESSION_ID` dan `TIKTOK_TARGET_IDC` sudah diisi
- Cek apakah cookies masih valid (biasanya expire dalam beberapa hari)
- Pastikan account TikTok tidak ter-ban atau ter-limit

### AI tidak merespon
- Cek apakah `GEMINI_API_KEY` valid
- Pastikan quota API Gemini masih tersedia
- Cek koneksi internet

## 📝 Notes

- **Rate Limiting**: Bot memiliki delay 2 detik antar balasan untuk menghindari spam
- **Fallback Replies**: Jika Gemini API error, bot akan menggunakan balasan default
- **Session Expiry**: Session cookies TikTok biasanya expire dalam beberapa hari
- **API Limits**: Gemini API memiliki limit requests per hari (check Google AI Studio)

## 🤝 Contributing

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## ⚖️ Legal

Bot ini dibuat untuk tujuan edukasi dan pengembangan. Pastikan untuk:
- Mematuhi Terms of Service TikTok
- Tidak menggunakan untuk spam atau harassment  
- Menghormati privacy pengguna lain
- Menggunakan dengan bertanggung jawab

## 📄 License

Project ini menggunakan MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Credits

- [TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector) - Library untuk koneksi TikTok Live
- [Google Gemini AI](https://ai.google.dev/) - AI untuk generate balasan
- Dibuat dengan ❤️ untuk komunitas developer Indonesia 