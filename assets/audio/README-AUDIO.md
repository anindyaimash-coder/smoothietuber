# 🎙️ Panduan Penempatan File Audio & Voice Over

Web app ini dilengkapi sistem audio interaktif ganda:
1. **Direct MP3 / WAV Playback**: Memutar rekaman suara asli Anda (studio microphone / voice note).
2. **Built-in Web Audio & Speech Fallback**: Menghasilkan efek suara whimsical (chime, sparkle, pop) dan demo suara karakter secara otomatis sebelum Anda memasukkan rekaman asli, sehingga website selalu terdengar interaktif dan hidup!

---

## 📁 Daftar Rekomendasi File Audio:

### 1. Intro Voice Note (Hero Section):
- **Path:** `assets/audio/intro-greeting.mp3`
- **Durasi ideal:** 10 - 20 detik
- **Saran isi suara:** Sapaan ceria dan ramah kepada calon penerbit/klien (misal: *"Halo! Selamat datang di duniaku di mana setiap goresan kuas punya suara dan jiwanya sendiri..."*)

### 2. Character Voice Samples:
- `char-1-voice.mp3` : Suara dialog karakter 1 (misal 5 - 15 detik)
- `char-2-voice.mp3` : Suara dialog karakter 2
- `char-3-voice.mp3` : Suara dialog karakter 3
- `char-4-voice.mp3` : Suara dialog karakter 4
- `char-5-voice.mp3` : Suara dialog karakter 5
- `char-6-voice.mp3` : Suara dialog karakter 6

### 3. Storybook Narration & Sound Effects (Hotspots):
- `spread-1-narration.mp3` : Narasi lengkap untuk hamparan buku cerita 1
- `sfx-lantern.mp3`, `sfx-baking.mp3`, `sfx-sparkle.mp3`, dll.

---
> 💡 **Tip:** Anda cukup menaruh file `.mp3` ke folder ini dan menyesuaikan jalurnya di `app.js` pada konfigurasi karakter dan hotspot!
