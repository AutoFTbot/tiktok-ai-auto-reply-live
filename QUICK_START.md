# 🚀 Quick Start - TikTok AI Auto-Reply Bot

Panduan cepat untuk menjalankan bot dalam 5 menit!

## 📋 Prerequisites

1. **Node.js** (versi 14 atau lebih baru)
2. **Google Gemini API Key** (gratis)
3. **Username TikTok** target yang sedang live

## ⚡ Setup Cepat (5 Menit)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Otomatis
```bash
npm run setup
```

Ikuti petunjuk interaktif untuk:
- Username TikTok target
- Gemini API Key
- Konfigurasi lainnya

### 3. Test AI (Opsional)
```bash
npm run demo
```

### 4. Jalankan Bot
```bash
npm start
```

## 🔑 Mendapatkan Gemini API Key

1. Kunjungi: https://makersuite.google.com/app/apikey
2. Login dengan Google Account
3. Klik **"Create API Key"**
4. Copy API key yang dihasilkan

## 🎯 Mode Bot

### Mode Monitoring (Tanpa Auth)
- ✅ Memantau semua aktivitas live
- ✅ Generate AI replies
- ❌ Tidak bisa kirim balasan

### Mode Full (Dengan Auth)
- ✅ Semua fitur monitoring
- ✅ **Kirim balasan otomatis**

## 📱 Mendapatkan Session Cookies (Opsional)

Untuk mode full (kirim balasan):

1. **Login ke TikTok** di browser
2. **Buka Developer Tools** (F12)
3. **Tab Network** → Refresh halaman
4. **Cari request** ke `webcast.tiktok.com`
5. **Copy cookies:**
   - `sessionid`
   - `tt-target-idc`

Tambahkan ke `.env`:
```env
TIKTOK_SESSION_ID=your_session_here
TIKTOK_TARGET_IDC=your_target_idc_here
```

## 🎨 Contoh Output

```
🤖 TikTok AI Auto-Reply Bot

✅ Connected to TikTok Live!
📺 Stream: Live streaming now!
👥 Viewers: 1,234
🤖 AI Auto-Reply Bot is now active!

💬 user123: Halo semua!
🤖 Bot replied: Halo juga! Selamat datang! 👋

💬 fan456: Kontennya keren!
🤖 Bot replied: Makasih! Senang kamu suka! 🔥
```

## 🚨 Troubleshooting

### Bot tidak connect?
- Cek username TikTok (gunakan @username)
- Pastikan target sedang live stream
- Cek koneksi internet

### AI tidak merespon?
- Pastikan Gemini API key valid
- Cek quota API (gratis: 15 requests/menit)

### Bot tidak kirim balasan?
- Perlu session cookies TikTok
- Pastikan cookies masih valid

## 📞 Support

- **GitHub Issues**: Untuk bug reports
- **Discord**: discord.gg/2c6kX6g3Pa (TikTok Live Connector)
- **Documentation**: README.md lengkap

---
**Happy Botting! 🤖✨** 