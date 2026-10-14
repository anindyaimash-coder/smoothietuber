# 🎙️ PNGTuber Mini Web (OBS Studio Ready)

Aplikasi PNGTuber web pribadi yang ringan, cepat, dan responsif mirip Veadotube Mini. Dibuat menggunakan **HTML5, CSS3, dan Web Audio API murni (Vanilla JavaScript)** tanpa ketergantungan library eksternal (zero dependencies).

---

## ✨ Fitur Utama

1. **Deteksi Suara Real-Time (Web Audio API)**:
   - Menggunakan `AudioContext` dan `AnalyserNode` untuk membaca amplitudo suara secara instan menggunakan kalkulasi energi RMS (*Root Mean Square*).
   - Visual VU Meter dinamis lengkap dengan pin penanda ambang batas (*threshold marker*).

2. **Avatar Reaktif 2D (State-Switching Cepat)**:
   - Mulut tertutup (`closed.png`) saat volume berada di bawah ambang batas (*idle*).
   - Mulut terbuka (`open.png`) saat volume berada di atas ambang batas (*speaking*).
   - **Hang Time / Hold Delay (Anti-Flicker)**: Dilengkapi jeda tahanan mulut sehingga avatar tidak berkedip cepat saat ada jeda singkat antar suku kata bicara.
   - **Efek Pantulan Veadotube (Bounce)**: Avatar melompat kecil secara alami saat berbicara.

3. **Panel Kontrol Interaktif**:
   - Tombol **Mulai / Hentikan Mikrofon** dengan indikator LED status.
   - Slider penggeser sensitivitas (*Threshold*) yang responsif.
   - Slider pengaturan intensitas pantulan (*Bounce*) dan skala avatar (*Scale*).
   - Fitur ganti gambar avatar kustom langsung dari browser (tersimpan otomatis di browser `localStorage`).

4. **Siap Digunakan di OBS Studio**:
   - Latar belakang transparan secara default.
   - Tombol cepat **Mode OBS (Sembunyikan Panel)** dan shortcut keyboard `H` atau `O`.
   - Dukungan URL parameter `?obs=1` agar panel kontrol langsung tersembunyi saat dimuat sebagai *Browser Source* di OBS Studio.

---

## 📁 Struktur File

```text
pngtuber/
├── index.html        # Struktur antarmuka, stage avatar, & panel kontrol
├── style.css         # Desain glassmorphism, animasi pantulan, & transparansi
├── script.js         # Logika Web Audio API, kalkulasi RMS, & state-switching
├── closed.png        # Gambar avatar default saat diam (mulut tertutup)
├── open.png          # Gambar avatar default saat bicara (mulut terbuka)
└── README.md         # Dokumentasi panduan penggunaan & konfigurasi OBS
```

---

## 🚀 Cara Menjalankan Aplikasi

> [!IMPORTANT]
> **Catatan Keamanan Browser:**
> Fitur mikrofon (`getUserMedia` & `Web Audio API`) **wajib dijalankan melalui server lokal** (`http://localhost`) atau koneksi aman HTTPS. Browser memblokir akses mikrofon jika dibuka langsung dengan klik ganda berkas `file:///`.

Pilih salah satu cara menjalankan server lokal berikut:

### Cara 1: Menggunakan Python (Paling Mudah)
Buka Terminal / Command Prompt di dalam folder proyek, lalu jalankan:
```bash
python3 -m http.server 3000
```
Buka browser dan akses:
👉 `http://localhost:3000/pngtuber/`

### Cara 2: Menggunakan Node.js / npx
```bash
npx serve . -l 3000
```
Buka browser dan akses:
👉 `http://localhost:3000/pngtuber/`

### Cara 3: Menggunakan VS Code Live Server
1. Buka folder di Visual Studio Code.
2. Pasang ekstensi **Live Server**.
3. Klik kanan pada `pngtuber/index.html` dan pilih **"Open with Live Server"**.

---

## 🎥 Panduan Pemasangan di OBS Studio

1. Buka **OBS Studio**.
2. Pada panel **Sources** (Sumber), klik tombol **`+`** lalu pilih **Browser** (Peramban).
3. Beri nama sumber (misalnya `PNGTuber Avatar`).
4. Pada kolom **URL**, masukkan alamat web server lokal Anda dengan menambahkan parameter `?obs=1`:
   ```text
   http://localhost:3000/pngtuber/?obs=1
   ```
   *(Parameter `?obs=1` akan otomatis menyembunyikan semua tombol dan panel kontrol, sehingga hanya avatar transparan yang tampil)*.
5. Atur ukuran jendela:
   - **Width**: `800` (atau `1080`)
   - **Height**: `800` (atau `1080`)
6. Centang opsi:
   - ✅ **Shutdown source when not visible** (opsional)
   - ✅ **Refresh browser when scene becomes active** (opsional)
7. Klik **OK**. Avatar PNGTuber Anda sekarang langsung melayang transparan di atas gameplay atau background streaming Anda!

---

## ⌨️ Tombol Pintas & Pengaturan

- **Tombol H atau O**: Sembunyikan atau tampilkan kembali panel kontrol secara instan.
- **Ganti Gambar Sendiri**: Klik tombol **"📁 Unggah PNG"** di panel kontrol untuk mengganti avatar dengan gambar PNG buatan Anda sendiri tanpa perlu mengedit kode.
