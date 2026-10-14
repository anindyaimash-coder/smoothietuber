#!/usr/bin/env python3
"""
Generate a beautiful, professional, illustrated PDF tutorial for SmoothieTuber TikTok Live Streaming.
Includes a visual Icon Directory with embedded icon graphics, detailed usage instructions,
and full guides for iPhone, Android, and PC (TikTok LIVE Studio & OBS).
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, PageBreak, HRFlowable, Image as RLImage
)
from reportlab.pdfgen import canvas
from PIL import Image as PILImage, ImageDraw, ImageFont

# Color Palette matching SmoothieTuber Aesthetic
INK = colors.HexColor('#2B2825')
INK_MUTED = colors.HexColor('#5F5A54')
INK_LIGHT = colors.HexColor('#8E877E')
PAPER_BG = colors.HexColor('#FAF8F5')
PAPER_CARD = colors.HexColor('#FFFDF9')
CRAYON_YELLOW = colors.HexColor('#FDE68A')
CRAYON_BLUE = colors.HexColor('#BAE6FD')
CRAYON_ORANGE = colors.HexColor('#FED7AA')
CRAYON_MINT = colors.HexColor('#BBF7D0')
CRAYON_CORAL = colors.HexColor('#FCA5A5')
BORDER_INK = colors.HexColor('#2B2825')

def ensure_icon_badges():
    """Generate crisp, high-res icon badge images with pastel backgrounds and Apple Color Emoji."""
    icon_dir = 'pngtuber/assets/icons'
    os.makedirs(icon_dir, exist_ok=True)
    
    ICONS = [
        ('icon_lang', '🌐', '#FEF9C3'),
        ('icon_mic', '🎙️', '#EFF6FF'),
        ('icon_meter', '🎚️', '#ECFDF5'),
        ('icon_bg', '🖼️', '#FDF4FF'),
        ('icon_obs', '👁️', '#FFF1F2'),
        ('icon_audiofile', '📁', '#FFFBEB'),
        ('icon_emo', '🎭', '#F0FDF4'),
        ('icon_motion', '✨', '#FEFCE8'),
        ('icon_export', '📹', '#FEE2E2'),
        ('icon_hotkeys', '⌨️', '#F1F5F9'),
        ('icon_pencil', '✏️', '#FFF7ED'),
        ('icon_drag', '👆', '#F5F3FF'),
    ]

    try:
        emoji_font = ImageFont.truetype('/System/Library/Fonts/Apple Color Emoji.ttc', 64)
    except Exception:
        emoji_font = None

    for name, emoji, bg_color in ICONS:
        out_path = os.path.join(icon_dir, f'{name}.png')
        if not os.path.exists(out_path):
            img = PILImage.new('RGBA', (130, 130), (0, 0, 0, 0))
            draw = ImageDraw.Draw(img)
            # Drop Shadow
            draw.rounded_rectangle([7, 7, 125, 125], radius=24, fill='#2B2825')
            # Card Background
            draw.rounded_rectangle([3, 3, 119, 119], radius=24, fill=bg_color, outline='#2B2825', width=3)
            # Emoji Text
            if emoji_font:
                draw.text((28, 22), emoji, font=emoji_font, embedded_color=True)
            img.save(out_path)

class NumberedCanvas(canvas.Canvas):
    """Two-pass canvas to dynamically add running header and footer with total page count."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        self.saveState()
        # Top running header (pages 2+)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(INK_MUTED)
            self.drawString(1.8 * cm, A4[1] - 1.2 * cm, "SmoothieTuber 🥤 • Panduan Lengkap Siaran Langsung TikTok LIVE & Direktori Ikon")
            self.drawRightString(A4[0] - 1.8 * cm, A4[1] - 1.2 * cm, "Official Release Guide")
            self.setStrokeColor(colors.HexColor('#E5E0D8'))
            self.setLineWidth(0.8)
            self.line(1.8 * cm, A4[1] - 1.35 * cm, A4[0] - 1.8 * cm, A4[1] - 1.35 * cm)

        # Bottom running footer
        self.setFont("Helvetica", 8)
        self.setFillColor(INK_MUTED)
        self.drawString(1.8 * cm, 1.2 * cm, "SmoothieTuber 2D PNGTuber Studio © 2026 • Hak Cipta Dilindungi")
        page_str = f"Halaman {self._pageNumber} dari {total_pages}"
        self.drawRightString(A4[0] - 1.8 * cm, 1.2 * cm, page_str)
        self.setStrokeColor(colors.HexColor('#E5E0D8'))
        self.setLineWidth(0.8)
        self.line(1.8 * cm, 1.45 * cm, A4[0] - 1.8 * cm, 1.45 * cm)
        self.restoreState()

def build_pdf(filename):
    ensure_icon_badges()

    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=1.6 * cm,
        rightMargin=1.6 * cm,
        topMargin=1.5 * cm,
        bottomMargin=1.6 * cm
    )

    styles = getSampleStyleSheet()

    # Typography Styles
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=INK,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=INK,
        spaceBefore=7,
        spaceAfter=2,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.8,
        textColor=INK,
        spaceAfter=4
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    callout_text = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.5,
        textColor=INK
    )

    story = []

    # =========================================================================
    # HEADER BANNER BLOCK (WITH LOGO)
    # =========================================================================
    logo_path = 'pngtuber/assets/logo.png'
    logo_cell = RLImage(logo_path, width=1.5 * cm, height=1.5 * cm) if os.path.exists(logo_path) else Paragraph("🥤", h1_style)

    header_data = [
        [
            logo_cell,
            Paragraph(
                "<b>SMOOTHIETUBER 🥤</b><br/>"
                "<font size='8' color='#78350F'>PANDUAN LENGKAP PENGGUNAAN &amp; SIARAN LANGSUNG TIKTOK LIVE</font>",
                ParagraphStyle('HdrTxt', fontName='Helvetica-Bold', fontSize=12.5, leading=15.5, textColor=colors.HexColor('#92400E'))
            ),
            Paragraph(
                "<b>KODE VIP TESTER:</b><br/>"
                "<font size='11' color='#1E3A8A'><b>BETATESTER</b></font>",
                ParagraphStyle('HdrBdg', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.HexColor('#1E3A8A'), alignment=2)
            )
        ]
    ]
    t_header = Table(header_data, colWidths=[1.8 * cm, 10.2 * cm, 5.8 * cm])
    t_header.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), CRAYON_YELLOW),
        ('BOX', (0, 0), (-1, -1), 1.5, BORDER_INK),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_header)
    story.append(Spacer(1, 6))

    # Tautan Akses Cepat
    key_box_data = [
        [
            Paragraph("🔑", ParagraphStyle('KeyIco', fontSize=16, alignment=1)),
            Paragraph(
                "<b>TAUTAN RESMI WEBSITE:</b> <font color='#1D4ED8'><b>https://anindyaimash-coder.github.io/smoothietuber/</b></font><br/>"
                "Kode Akses VIP <b>BETATESTER</b> tersimpan aman di browser Anda. "
                "Untuk langsung masuk otomatis tanpa mengetik kode: "
                "<font color='#92400E'><b>https://anindyaimash-coder.github.io/smoothietuber/?key=BETATESTER</b></font>",
                callout_text
            )
        ]
    ]
    t_key = Table(key_box_data, colWidths=[1.0 * cm, 16.8 * cm])
    t_key.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#FEF9C3')),
        ('BOX', (0, 0), (-1, -1), 1.2, colors.HexColor('#CA8A04')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_key)
    story.append(Spacer(1, 8))

    # =========================================================================
    # BAGIAN 1: DIREKTORI IKON ANTARMUKA & KEGUNAAN (VISUAL ICON DIRECTORY)
    # =========================================================================
    story.append(Paragraph("BAGIAN 1: DIREKTORI IKON ANTARMUKA &amp; KEGUNAAN LENGKAP", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=BORDER_INK, spaceBefore=1, spaceAfter=6))
    story.append(Paragraph(
        "Berikut adalah referensi visual seluruh tombol, ikon dok, dan indikator fungsi di dalam antarmuka SmoothieTuber:",
        body_style
    ))

    icon_base = 'pngtuber/assets/icons'
    def get_ico(name):
        p = os.path.join(icon_base, f'{name}.png')
        return RLImage(p, width=1.1 * cm, height=1.1 * cm) if os.path.exists(p) else Paragraph("🔘", body_style)

    icon_table_data = [
        [
            Paragraph("<b>IKON</b>", ParagraphStyle('ThIco', fontName='Helvetica-Bold', fontSize=8, alignment=1)),
            Paragraph("<b>NAMA FITUR &amp; LOKASI</b>", ParagraphStyle('ThNom', fontName='Helvetica-Bold', fontSize=8)),
            Paragraph("<b>FUNGSI UTAMA &amp; CARA PENGGUNAAN</b>", ParagraphStyle('ThFnc', fontName='Helvetica-Bold', fontSize=8))
        ],
        [
            get_ico('icon_lang'),
            Paragraph("<b>Pilihan Bahasa (🌐)</b><br/><font size='7' color='#78350F'>Pojok Kiri Atas Layar</font>", body_bold),
            Paragraph("Mengganti bahasa tampilan aplikasi seketika. Tersedia 5 bahasa: <b>Indonesia</b>, <b>日本語 (Japanese)</b>, <b>中文 (Mandarin)</b>, <b>English (US)</b>, dan <b>English (UK)</b>. Pilihan bahasa langsung tersimpan otomatis di browser.", body_style)
        ],
        [
            get_ico('icon_meter'),
            Paragraph("<b>VU Meter &amp; Ambang Batas (🎚️)</b><br/><font size='7' color='#047857'>Dok Kiri (Paling Atas)</font>", body_bold),
            Paragraph("Menampilkan volume suara mikrofon real-time (skala <b>0.1 - 40.0</b>). Geser jarum segitiga untuk menyesuaikan batas deteksi suara. Saat volume suara melewati jarum, mulut avatar otomatis membuka.", body_style)
        ],
        [
            get_ico('icon_mic'),
            Paragraph("<b>Kalibrasi Suara (🎙️)</b><br/><font size='7' color='#1D4ED8'>Dok Kiri (Ikon Kedua)</font>", body_bold),
            Paragraph("Menu pengaturan sensitivitas suara, pemilihan perangkat mikrofon (internal/headset/USB), waktu tahan buka mulut (<i>Hang Time</i> 50-500 ms), dan tombol rekalibrasi audio (Hotkey: <b>R</b>).", body_style)
        ],
        [
            get_ico('icon_bg'),
            Paragraph("<b>Latar Belakang &amp; Kamera (🖼️)</b><br/><font size='7' color='#7E22CE'>Dok Kiri (Ikon Ketiga)</font>", body_bold),
            Paragraph("Memilih tampilan latar avatar: <b>🏁 Transparan</b> (paling pas untuk OBS), <b>🟩 Green Screen</b>, wallpaper kustom, atau <b>📷 Kamera Belakang/Depan (Handcam)</b> untuk merekam meja kegiatan secara langsung.", body_style)
        ],
        [
            get_ico('icon_obs'),
            Paragraph("<b>Sembunyikan Menu / Mode OBS (👁️)</b><br/><font size='7' color='#BE123C'>Dok Kiri (Ikon Keempat)</font>", body_bold),
            Paragraph("Menyembunyikan seluruh tombol toolbar, dok, dan slider agar layar bersih total untuk siaran langsung (Hotkey: <b>H</b>). Di HP, tombol bulat kuning 🟡 akan muncul di sudut kanan bawah untuk membuka kembali.", body_style)
        ],
        [
            get_ico('icon_audiofile'),
            Paragraph("<b>File Rekaman Suara (📁)</b><br/><font size='7' color='#B45309'>Dok Kiri (Ikon Kelima)</font>", body_bold),
            Paragraph("Memungkinkan avatar merespons file audio rekaman lokal (.mp3, .wav) tanpa mikrofon hidup. Cocok untuk sinkronisasi dubbing suara atau animasi pra-rekam.", body_style)
        ],
        [
            get_ico('icon_emo'),
            Paragraph("<b>Pilihan Emosi (🎭)</b><br/><font size='7' color='#15803D'>Dok Kanan (Ikon Teratas)</font>", body_bold),
            Paragraph("Memilih ekspresi aktif avatar (Normal, Senang, Kaget, dsb.), mengunggah gambar sprite (mulut buka/tutup, mata berkedip), menambah slot emosi baru, serta ekspor/impor profil (.json).", body_style)
        ],
        [
            get_ico('icon_pencil'),
            Paragraph("<b>Ganti Nama Emosi (✏️)</b><br/><font size='7' color='#C2410C'>Di Dalam Flyout Emosi (🎭)</font>", body_bold),
            Paragraph("Klik langsung pada kolom teks nama emosi untuk mengubah namanya sendiri (misal: <i>Senyum, Kaget, Marah</i>). Dilengkapi proteksi tombol dan tersimpan otomatis ke penyimpanan browser.", body_style)
        ],
        [
            get_ico('icon_motion'),
            Paragraph("<b>Gerakan &amp; Ukuran (✨)</b><br/><font size='7' color='#A16207'>Dok Kanan (Ikon Kedua)</font>", body_bold),
            Paragraph("Mengatur efek animasi melayang Canva: <b>Tinggi Ayunan (1 - 50 px)</b> dan <b>Kecepatan Melayang (0.1 - 6.0 detik)</b>, kekuatan pantulan bicara (Hop 0-30 px), serta interval kedip otomatis.", body_style)
        ],
        [
            get_ico('icon_drag'),
            Paragraph("<b>Geser Bebas Avatar (👆)</b><br/><font size='7' color='#6D28D9'>Panggung / Layar Bebas</font>", body_bold),
            Paragraph("Sentuh avatar di layar HP dengan jari atau klik tahan kursor mouse di PC (*drag &amp; drop*) untuk memposisikan avatar ke sudut mana pun di layar secara bebas tanpa batasan menu.", body_style)
        ],
        [
            get_ico('icon_export'),
            Paragraph("<b>Rekam Video &amp; Galeri (📹)</b><br/><font size='7' color='#B91C1C'>Dok Kanan (Ikon Ketiga)</font>", body_bold),
            Paragraph("Merekam video animasi avatar dengan rasio: <b>📱 9:16 Vertikal</b> (default TikTok/Reels), <b>📷 3:2</b>, <b>⏹️ 1:1</b>, dan <b>📺 16:9</b>. Pilihan format ekspor: <b>MP4</b>, <b>MOV</b>, atau <b>WebM</b>, dengan tombol langsung simpan ke Galeri Foto HP.", body_style)
        ],
        [
            get_ico('icon_hotkeys'),
            Paragraph("<b>Pintasan Keyboard (⌨️)</b><br/><font size='7' color='#334155'>Dok Kanan (Ikon Keempat)</font>", body_bold),
            Paragraph("Mengatur tombol keyboard pintasan di PC: Tombol <b>M</b> (Mute Mic), <b>H</b> (Mode OBS Bersih), <b>R</b> (Reset Audio), serta angka <b>1, 2, 3...</b> untuk berganti ekspresi seketika saat siaran.", body_style)
        ]
    ]

    t_icon = Table(icon_table_data, colWidths=[1.5 * cm, 4.3 * cm, 12.0 * cm])
    t_icon.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), CRAYON_MINT),
        ('BOX', (0, 0), (-1, -1), 1.2, BORDER_INK),
        ('INNERGRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#E5E0D8')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('VALIGN', (0, 1), (-1, -1), 'TOP'),
        ('PADDING', (0, 0), (-1, -1), 4),
    ]))
    story.append(t_icon)
    story.append(Spacer(1, 10))

    # =========================================================================
    # BAGIAN 2: PANDUAN LIVE DI SMARTPHONE (IPHONE 13 & ANDROID)
    # =========================================================================
    story.append(KeepTogether([
        Paragraph("BAGIAN 2: PANDUAN SIARAN LANGSUNG DI SMARTPHONE (IPHONE &amp; ANDROID)", h1_style),
        HRFlowable(width="100%", thickness=1, color=BORDER_INK, spaceBefore=1, spaceAfter=6)
    ]))

    t_handcam_steps = [
        [
            Paragraph("<b>Langkah 1:</b><br/>Buka &amp; Pilih Bahasa", body_bold),
            Paragraph(
                "• Buka <font color='#1D4ED8'><b>https://anindyaimash-coder.github.io/smoothietuber/</b></font> di <b>Safari (iPhone)</b> atau <b>Chrome (Android)</b>.<br/>"
                "• Pilih bahasa antarmuka favorit Anda pada layar sambutan, lalu ketik kode <b>BETATESTER</b>.<br/>"
                "• Saat browser meminta izin mikrofon, pilih <b>'Izinkan'</b> agar mulut avatar merespons suara.",
                body_style
            )
        ],
        [
            Paragraph("<b>Langkah 2:</b><br/>Aktifkan Kamera Handcam", body_bold),
            Paragraph(
                "• Ketuk ikon Latar Belakang (🖼️) pada dok toolbar sebelah kiri.<br/>"
                "• Pada bagian <b>Kamera Langsung (Handcam)</b>, ketuk tombol <b>📷 Kamera Belakang</b>.<br/>"
                "• Kamera belakang HP Anda kini aktif secara langsung menjadi latar belakang penuh di layar (<i>Edge-to-Edge</i>) mengarah ke meja kerajinan, buku gambar, makanan, atau keyboard musik.",
                body_style
            )
        ],
        [
            Paragraph("<b>Langkah 3:</b><br/>Posisikan Avatar &amp; Sembunyikan Menu", body_bold),
            Paragraph(
                "• Sentuh avatar di layar dan geser (*drag &amp; drop*) ke sudut pojok kanan/kiri bawah meja.<br/>"
                "• Ketuk tombol ikon mata <b>👁️ (Sembunyikan Menu)</b>. Seluruh tombol akan menghilang rapi sehingga layar HP murni hanya menampilkan rekaman kamera meja + avatar Anda yang melayang responsif.",
                body_style
            )
        ],
        [
            Paragraph("<b>Langkah 4:</b><br/>Mulai Live di TikTok", body_bold),
            Paragraph(
                "• Buka aplikasi <b>TikTok</b> ➔ ketuk tanda <b>(+)</b> di bawah ➔ geser ke menu <b>LIVE</b>.<br/>"
                "• Pilih opsi mode siaran <b>'Game Seluler' (Siaran Layar / Screen Broadcast)</b>.<br/>"
                "• Ketuk tombol merah <b>'Mulai Siaran Langsung'</b> (di iPhone ketuk 'Mulai Penyiaran').<br/>"
                "• Beralih kembali ke layar browser <b>Safari / Chrome SmoothieTuber</b>.<br/>"
                "• <b>Selesai!</b> Penonton di TikTok melihat meja kegiatan Anda secara jernih, dan avatar SmoothieTuber melayang di sudut layar berbicara mengikuti suara Anda secara live!",
                body_style
            )
        ]
    ]
    t_handcam = Table(t_handcam_steps, colWidths=[3.5 * cm, 14.3 * cm])
    t_handcam.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F3F4F6')),
        ('BACKGROUND', (1, 0), (1, -1), PAPER_CARD),
        ('BOX', (0, 0), (-1, -1), 1.2, BORDER_INK),
        ('INNERGRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#E5E0D8')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_handcam)
    story.append(Spacer(1, 10))

    # =========================================================================
    # BAGIAN 3: PANDUAN DI PC / LAPTOP (TIKTOK LIVE STUDIO & OBS STUDIO)
    # =========================================================================
    story.append(KeepTogether([
        Paragraph("BAGIAN 3: PANDUAN DI PC / LAPTOP (TIKTOK LIVE STUDIO &amp; OBS)", h1_style),
        HRFlowable(width="100%", thickness=1, color=BORDER_INK, spaceBefore=1, spaceAfter=6)
    ]))

    story.append(Paragraph("METODE A: Sumber Tautan Web (Browser Source) — <i>Paling Praktis &amp; Transparan Alami</i>", h2_style))
    steps_pc_a = [
        "1. Buka software <b>TikTok LIVE Studio</b> (atau OBS Studio) di komputer/laptop Anda.",
        "2. Di panel <b>Sumber (Sources)</b>, klik <b>'+ Tambah Sumber' ➔ 'Tautan Web' (Browser Source)</b>.",
        "3. Masukkan tautan URL berikut:<br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<font color='#92400E'><b>https://anindyaimash-coder.github.io/smoothietuber/?obs=1&amp;key=BETATESTER</b></font><br/>"
        "&nbsp;&nbsp;&nbsp;&nbsp;<i>(Parameter <code>?obs=1</code> otomatis mengaktifkan mode transparan tanpa menu, dan <code>&amp;key=BETATESTER</code> membuka akses VIP secara otomatis).</i>",
        "4. Atur resolusi menjadi <b>Lebar: 1080</b> dan <b>Tinggi: 1080</b>, lalu klik Simpan.",
        "5. Avatar langsung melayang bebas di atas tampilan siaran game atau kamera PC Anda!"
    ]
    for step in steps_pc_a:
        story.append(Paragraph(step, body_style))
    story.append(Spacer(1, 4))

    story.append(Paragraph("METODE B: Tangkap Jendela (Window Capture + Green Screen)", h2_style))
    steps_pc_b = [
        "1. Buka browser Chrome di PC ➔ buka SmoothieTuber ➔ di menu Latar (🖼️) pilih <b>🟩 Green Screen</b>.",
        "2. Tekan tombol keyboard <kbd>H</kbd> untuk menyembunyikan semua tombol.",
        "3. Di TikTok LIVE Studio / OBS, tambah sumber <b>'Tangkap Jendela' (Window Capture)</b> ➔ pilih Chrome.",
        "4. Tambahkan filter <b>'Kunci Kroma' (Chroma Key)</b> warna hijau. Layar hijau akan terhapus sempurna!"
    ]
    for step in steps_pc_b:
        story.append(Paragraph(step, body_style))
    story.append(Spacer(1, 10))

    # =========================================================================
    # BAGIAN 4: TIPS KALIBRASI, SUARA & PERSISTENSI KEAMANAN UPDATE
    # =========================================================================
    story.append(KeepTogether([
        Paragraph("BAGIAN 4: TIPS KALIBRASI SUARA &amp; KEAMANAN SISTEM", h1_style),
        HRFlowable(width="100%", thickness=1, color=BORDER_INK, spaceBefore=1, spaceAfter=6)
    ]))

    tips_data = [
        [
            Paragraph("<b>TOPIK PANDUAN</b>", ParagraphStyle('Th1', fontName='Helvetica-Bold', fontSize=8, textColor=INK)),
            Paragraph("<b>PENJELASAN &amp; CARA PENGGUNAAN TERBAIK</b>", ParagraphStyle('Th2', fontName='Helvetica-Bold', fontSize=8, textColor=INK))
        ],
        [
            Paragraph("<b>Kalibrasi Ambang Batas (0.1 - 40.0)</b>", body_bold),
            Paragraph("Bilah VU Meter sebelah kiri memiliki rentang presisi desimal <b>0.1 - 40.0</b>. Jika mulut avatar sering terbuka sendiri karena deru kipas angin atau napas, geser jarum segitiga sedikit ke atas (misal ke 15.0 - 22.0) hingga mulut hanya terbuka saat Anda benar-benar bersuara.", body_style)
        ],
        [
            Paragraph("<b>Animasi Melayang Canva</b>", body_bold),
            Paragraph("Di menu ✨ Gerakan, Anda dapat mengatur <b>Tinggi Ayunan (1 - 50 px)</b> dan <b>Kecepatan Melayang (0.1 - 6.0 detik)</b> untuk menghasilkan gerakan napas avatar yang sangat hidup, lembut, dan natural.", body_style)
        ],
        [
            Paragraph("<b>Perekaman Video &amp; Format Ekspor</b>", body_bold),
            Paragraph("Di menu 📹 Rekam Video, rasio default adalah <b>📱 9:16 Vertikal</b> (tersedia juga 3:2, 1:1, 16:9). Pilihan format ekspor video mencakup <b>MP4</b>, <b>MOV</b>, dan <b>WebM</b>. Selesai merekam, gunakan tombol <b>'📱 Simpan ke Galeri / Bagikan'</b> untuk langsung mengirim ke Album Foto HP.", body_style)
        ],
        [
            Paragraph("<b>Keamanan Data Pengaturan (*Persistence*)</b>", body_bold),
            Paragraph("Seluruh avatar, nama emosi kustom, dan preferensi tersimpan di <i>LocalStorage</i> browser Anda. Penonton siaran maupun tester lain di internet <b>100% TIDAK BISA</b> mengacak-acak sistem atau pengaturan Anda. Data Anda juga aman dan tidak akan hilang saat browser dibuka ulang.", body_style)
        ]
    ]
    t_tips = Table(tips_data, colWidths=[4.6 * cm, 13.2 * cm])
    t_tips.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), CRAYON_YELLOW),
        ('BOX', (0, 0), (-1, -1), 1.2, BORDER_INK),
        ('INNERGRID', (0, 0), (-1, -1), 0.6, colors.HexColor('#E5E0D8')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t_tips)
    story.append(Spacer(1, 8))

    # =========================================================================
    # BAGIAN 5: FORMULIR SURVEY PENGUJI BETA & EVALUASI
    # =========================================================================
    survey_box_data = [
        [
            Paragraph("📝", ParagraphStyle('SurvIco', fontSize=18, alignment=1)),
            Paragraph(
                "<b>FORMULIR SURVEY KEPUASAN &amp; EVALUASI BETA TESTER:</b><br/>"
                "Masukan dan ulasan pengalaman Anda sangat berharga untuk penyempurnaan SmoothieTuber sebelum peluncuran resmi. "
                "Mohon kesediaannya meluangkan waktu sejenak untuk mengisi formulir evaluasi pada tautan dokumen resmi berikut:<br/>"
                "👉 <font color='#1D4ED8'><b>https://drive.google.com/file/d/1KvGdsx-KrlJ976it--U1PwyCy4H_z9Nf/view</b></font>",
                callout_text
            )
        ]
    ]
    t_survey = Table(survey_box_data, colWidths=[1.0 * cm, 16.8 * cm])
    t_survey.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#ECFDF5')),
        ('BOX', (0, 0), (-1, -1), 1.2, colors.HexColor('#059669')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(t_survey)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Illustrated PDF successfully generated: {filename}")

if __name__ == '__main__':
    target_path = sys.argv[1] if len(sys.argv) > 1 else 'SmoothieTuber-Tutorial-TikTok-Live.pdf'
    build_pdf(target_path)
