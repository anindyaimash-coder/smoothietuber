# SmoothieTuber 🥤 — 2D Doodle PNGTuber Studio

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-22c55e?style=for-the-badge&logo=github)](https://anindyaimash-coder.github.io/smoothietuber/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Release](https://img.shields.io/badge/Release-v4.0.0-amber?style=for-the-badge)](https://github.com/anindyaimash-coder/smoothietuber/releases)

**SmoothieTuber** adalah aplikasi web PNGTuber pribadi bergaya *whimsical sketchy line-art & doodle aesthetic* (ala Veadotube mini) yang ringan, cepat, dan reaktif suara secara *real-time* menggunakan **Web Audio API murni**.

Dirancang khusus untuk streamer dan kreator konten yang ingin menyiarkan avatar 2D langsung di **TikTok LIVE (iPhone & Android)**, **TikTok LIVE Studio**, serta **OBS Studio** dengan latar belakang transparan alami tanpa perlu memasang aplikasi berat.

---

## 🌐 Tautan Resmi Aplikasi (Live Deployment)

* 🚀 **Aplikasi Web Resmi (Langsung Pakai):**  
  👉 **[https://anindyaimash-coder.github.io/smoothietuber/](https://anindyaimash-coder.github.io/smoothietuber/)**

* 🔑 **Tautan Otomatis Masuk (Tanpa Ketik Kode Akses):**  
  👉 **[https://anindyaimash-coder.github.io/smoothietuber/?key=BETATESTER](https://anindyaimash-coder.github.io/smoothietuber/?key=BETATESTER)**

* 🪟 **Tautan Browser Source (Khusus OBS Studio & TikTok LIVE Studio — 100% Transparan):**  
  👉 **[https://anindyaimash-coder.github.io/smoothietuber/?obs=1&key=BETATESTER](https://anindyaimash-coder.github.io/smoothietuber/?obs=1&key=BETATESTER)**

* 🔐 **Kode Akses VIP Tester:**  
  `BETATESTER`

---

## ✨ Fitur-Fitur Utama (Versi 4.0)

1. **🌐 Layar Pemilihan Bahasa Awal & Dynamic Translation**:
   - Mendukung 5 bahasa: **Bahasa Indonesia**, **日本語 (Japanese)**, **中文 (Mandarin)**, **English (US)**, dan **English (UK)**.
   - Tombol pengubah bahasa (`🌐`) selalu tersedia di pojok kiri atas layar.
   - Preferensi bahasa langsung tersimpan otomatis di *LocalStorage*.

2. **🎚️ VU Meter & Ambang Batas Suara Presisi (0.1 – 40.0)**:
   - Pembacaan energi suara real-time (kalkulasi RMS) dengan rentang desimal yang peka (`0.1 - 40.0`, step `0.1`).
   - Jarum ambang batas reaktif: mulut avatar membuka seketika saat volume bicara melewati posisi jarum.
   - Fitur *Hang Time* (50–500 ms) untuk mencegah kedipan mulut cepat antar suku kata bicara.

3. **✏️ Fitur Ganti Nama Emosi Langsung (Inline Rename)**:
   - Ubah nama label emosi langsung di flyout dok (misal: *Senyum, Kaget, Marah, Tertawa*).
   - Dilengkapi isolasi tombol keyboard (*keystroke protection*) agar pengetikan nama tidak memicu pergantian ekspresi secara tidak sengaja.

4. **✨ Efek Animasi Melayang Canva (Breathing Effect)**:
   - Slider **Tinggi Ayunan** dapat diatur dari **`1 px` hingga `50 px`**.
   - Slider **Kecepatan Melayang** dapat diatur dari **`0.1 s` hingga `6.0 s`**.
   - Gerakan napas lembut dan konstan tanpa membebani GPU/baterai HP.

5. **👆 Penataan Posisi Bebas (Drag & Drop)**:
   - Sentuh avatar dengan jari di HP atau klik tahan kursor mouse di PC untuk memposisikan avatar di sudut mana pun di layar.

6. **📷 Kamera Latar Belakang (Handcam Mode)**:
   - Aktifkan kamera belakang HP secara penuh (*Edge-to-Edge Fullscreen*) untuk merekam meja kegiatan (menggambar, melukis, unboxing, kerajinan tangan, atau main piano) sambil avatar melayang di sudut layar.

7. **📹 Perekam Video & Ekspor Galeri**:
   - Rasio video: **📱 9:16 Vertikal (Default TikTok/Reels/Shorts)**, **📷 3:2**, **⏹️ 1:1**, dan **📺 16:9**.
   - Pilihan format ekspor: **MP4**, **MOV**, dan **WebM**.
   - Dilengkapi tombol *"📱 Simpan ke Galeri / Bagikan"* (Web Share API) untuk langsung mengirim video ke Album Foto HP.

8. **🛡️ Keamanan Data Mandiri (Client-Side LocalStorage)**:
   - Seluruh avatar, pengaturan suara, dan kalibrasi tersimpan di memori browser pengguna masing-masing.
   - Penonton siaran langsung maupun tester lain di internet **100% tidak bisa** mengacak-acak sistem atau pengaturan Anda.

---

## 📦 Berkas Unduhan & Panduan Lengkap

* 📄 **Buku Panduan PDF Lengkap (TikTok Live & Direktori 12 Ikon Visual):**  
  👉 [SmoothieTuber-Tutorial-TikTok-Live.pdf](SmoothieTuber-Tutorial-TikTok-Live.pdf)
* 📱 **Paket Arsip Distribusi Tester Android:**  
  👉 [SmoothieTuber-Android-Tester.zip](SmoothieTuber-Android-Tester.zip)
* 📝 **Panduan Teks Android & TikTok:**  
  👉 [pngtuber/PANDUAN_PENGGUNAAN_ANDROID_DAN_TIKTOK.txt](pngtuber/PANDUAN_PENGGUNAAN_ANDROID_DAN_TIKTOK.txt)

---

## ⌨️ Pintasan Keyboard (*Hotkeys*) di PC

| Tombol | Fungsi |
| :---: | :--- |
| <kbd>M</kbd> | Bisu / Aktifkan Mikrofon (*Mute / Unmute*) |
| <kbd>H</kbd> | Mode OBS Bersih (Sembunyikan / Tampilkan Seluruh Menu) |
| <kbd>R</kbd> | Reset & Rekalibrasi Mesin Audio |
| <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd>... | Beralih Ekspresi Wajah Seketika |

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
SmoothieTuber © 2026.
