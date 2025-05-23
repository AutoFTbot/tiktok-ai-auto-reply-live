# 🤖 TikTok AI Auto-Reply Bot

Bot TikTok Live yang otomatis membalas komentar menggunakan AI Gemini. Bot ini dapat memantau live stream TikTok dan memberikan balasan yang cerdas dan contextual menggunakan Google Gemini AI.

## 📸 Screenshot

![TikTok AI Bot Screenshot](https://raw.githubusercontent.com/AutoFTbot/tiktok-ai-auto-reply-live/main/photo_2025-05-23_21-24-27.jpg)

## ✨ Fitur

* 🎯 **Auto-Reply Cerdas**: Membalas komentar secara otomatis dengan AI Gemini
* 🔊 **Voice Replies**: Mengkonversi balasan teks ke suara menggunakan Google TTS
* 🎤 **Voice Events**: Audio untuk event join, gift, dan komentar
* 🇮🇩 **Bahasa Indonesia**: Bot dioptimalkan untuk percakapan dalam bahasa Indonesia
* 🎭 **Karakter Bot**: Personality ramah, energik dengan emoji yang menarik
* 📊 **Real-time Monitoring**: Memantau likes, follows, gifts, dan aktivitas lainnya
* 🔐 **Authentication Support**: Mendukung login untuk mengirim balasan
* ⚡ **Rate Limiting**: Delay otomatis untuk menghindari spam

## 🚀 Quick Start

### 1. Clone dan Install

```bash
git clone https://github.com/AutoFTbot/tiktok-ai-auto-reply-live.git
cd tiktok-ai-auto-reply-live
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
   * `sessionid` → `TIKTOK_SESSION_ID`  
   * `tt-target-idc` → `TIKTOK_TARGET_IDC`

> ⚠️ **Penting**: Jaga kerahasiaan session cookies Anda!

## 📋 Mode Operation

### Tanpa Authentication

* ✅ Memantau komentar, likes, follows
* ✅ Generate AI replies
* ✅ Audio untuk event join, gift, dan komentar
* ❌ Tidak bisa mengirim balasan ke chat

### Dengan Authentication

* ✅ Semua fitur monitoring
* ✅ Generate AI replies
* ✅ Audio untuk event join, gift, dan komentar
* ✅ **Mengirim balasan ke chat TikTok**

## 🎨 Contoh Output

```
🤖 TikTok AI Bot

✅ Connected to TikTok Live!
📺 Stream: Live streaming now!
👥 Viewers: 1,234
🤖 AI Auto-Reply Bot is now active!

👋 user123 joined the stream
🔊 "Selamat datang user123 di live streaming"

💬 user123: Halo semua!
🔊 "Halo juga! Selamat datang di live stream! 👋"
🤖 Bot: Halo juga! Selamat datang di live stream! 👋

🎁 fan456 sent Rose (1x)
🤖 "Terima kasih fan456 telah mengirim Rose"

```

## 🛠️ Configuration

| Variable            | Description                                | Default  |
| ------------------- | ------------------------------------------ | -------- |
| TIKTOK_USERNAME    | Username TikTok target (contoh: @username) | Required |
| TIKTOK_SESSION_ID | Session cookie untuk authentication        | Optional |
| TIKTOK_TARGET_IDC | Target IDC cookie untuk authentication     | Optional |
| GEMINI_API_KEY    | Google Gemini API key                      | Required |
| BOT_REPLY_ENABLED | Enable/disable auto-reply                  | true     |
| REPLY_DELAY_MS    | Delay antar balasan (ms)                   | 2000     |
| MAX_REPLY_LENGTH  | Maksimal panjang balasan                   | 100      |

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

## 🚨 Troubleshooting

### Bot tidak bisa connect

* Pastikan username TikTok benar (gunakan format @username)
* Cek apakah live stream sedang aktif
* Pastikan koneksi internet stabil

### Bot tidak bisa kirim balasan

* Pastikan `TIKTOK_SESSION_ID` dan `TIKTOK_TARGET_IDC` sudah diisi
* Cek apakah cookies masih valid (biasanya expire dalam beberapa hari)
* Pastikan account TikTok tidak ter-ban atau ter-limit

### AI tidak merespon

* Cek apakah `GEMINI_API_KEY` valid
* Pastikan quota API Gemini masih tersedia
* Cek koneksi internet

## 📝 Notes

* **Rate Limiting**: Bot memiliki delay 2 detik antar balasan untuk menghindari spam
* **Audio Events**: Bot akan memutar audio untuk event join, gift, dan komentar
* **Session Expiry**: Session cookies TikTok biasanya expire dalam beberapa hari
* **API Limits**: Gemini API memiliki limit requests per hari (check Google AI Studio)

## 🤝 Contributing

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## ⚖️ Legal

Bot ini dibuat untuk tujuan edukasi dan pengembangan. Pastikan untuk:

* Mematuhi Terms of Service TikTok
* Tidak menggunakan untuk spam atau harassment
* Menghormati privacy pengguna lain
* Menggunakan dengan bertanggung jawab

## 📄 License

Project ini menggunakan MIT License - lihat file LICENSE untuk detail.

## 🙏 Credits

* [TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector) - Library untuk koneksi TikTok Live
* [Google Gemini AI](https://ai.google.dev/) - AI untuk generate balasan
* Dibuat dengan ❤️ untuk komunitas developer Indonesia
