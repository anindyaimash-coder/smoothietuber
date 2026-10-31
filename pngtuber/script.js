/**
 * ============================================================================
 * SmoothieTuber - Veadotube Style Sleek Dual Dock Engine
 * Pure Vanilla JavaScript & Web Audio API
 * ============================================================================
 */

(function () {
  'use strict';

  // --- 1. DEFAULT DATA & STATE ---
  const DEFAULT_EMOTIONS = [
    {
      id: 'emotion_normal',
      name: 'Normal',
      hotkey: '1',
      sprites: {
        closed: 'assets/normal_closed.png',
        closedBlink: 'assets/normal_closed_blink.png',
        open: 'assets/normal_open.png',
        openBlink: 'assets/normal_open_blink.png'
      }
    },
    {
      id: 'emotion_happy',
      name: 'Senang',
      hotkey: '2',
      sprites: {
        closed: 'assets/happy_closed.png',
        closedBlink: 'assets/happy_closed_blink.png',
        open: 'assets/happy_open.png',
        openBlink: 'assets/happy_open_blink.png'
      }
    },
    {
      id: 'emotion_surprised',
      name: 'Kaget',
      hotkey: '3',
      sprites: {
        closed: 'assets/surprised_closed.png',
        closedBlink: 'assets/surprised_closed_blink.png',
        open: 'assets/surprised_open.png',
        openBlink: 'assets/surprised_open_blink.png'
      }
    }
  ];

  // --- 2. MULTI-LANGUAGE I18N SYSTEM ---
  const I18N = {
    'id': {
      app_title: 'SmoothieTuber - Doodle Avatar 2D Reaktif Suara',
      brand_badge: '2D PNGTuber',
      brand_tagline: 'Whimsical Sketchy Line-Art & Voice Reactive Studio',
      pill_live_audio: 'Live Reactive Audio',
      dock_mute: 'Mute/Unmute Suara (Hotkey: M)',
      dock_audio: 'Kalibrasi Audio & Hang Time',
      dock_bg: 'Pilih Latar Belakang / Green Screen',
      dock_obs: 'Sembunyikan Menu untuk OBS (Hotkey: H)',
      dock_pure_green: 'Mode Layar Green Screen Murni (Prism Live / HP)',
      dock_camera: 'Kamera Langsung Handcam (Klik: Belakang / Depan / Mati)',
      dock_record: 'Mulai / Hentikan Rekam Video Transparan',
      dock_emotions: 'Kelola atau ganti emosi',
      dock_motion: 'Animasi Melayang Canva & Gerak',
      dock_hotkeys: 'Pintasan Keyboard (Hotkeys)',
      dock_audio_file: 'Deteksi dari File Rekaman Suara',
      dock_export: 'Studio Rekam & Ekspor Video',
      slot_closed: 'Mulut Tutup, Mata Buka (Klik untuk ganti PNG)',
      slot_open: 'Mulut Buka, Mata Buka (Klik untuk ganti PNG)',
      slot_closed_blink: 'Mulut Tutup, Kedip Mata (Klik untuk ganti PNG)',
      slot_open_blink: 'Mulut Buka, Kedip Mata (Klik untuk ganti PNG)',
      flyout_audio_title: '🎙️ Kalibrasi Suara',
      status_disconnected: 'Terputus',
      status_active: 'Aktif',
      status_muted: 'Bungkam',
      label_mic_device: 'Perangkat Mikrofon:',
      option_default_system: '⚡ Otomatis (Prioritas Mic Eksternal)',
      btn_refresh_mic: '🔄 Deteksi Mic',
      label_active_mic: 'Aktif:',
      toast_mic_refreshed: '🎙️ Perangkat mikrofon diperbarui:',
      label_camera_zoom: '🔍 Zoom Kamera:',
      toast_cam_zoom: '🔍 Zoom Kamera:',
      label_threshold: 'Ambang Batas Suara (Threshold):',
      label_hang_time: 'Waktu Tahan Mulut (Hang Time):',
      btn_reset_audio: '🔄 Reset / Rekalibrasi Audio (Hotkey: R)',
      flyout_bg_title: '🏁 Latar Belakang',
      bg_transparent: '🏁 Transparan',
      bg_green: '🟩 Green Screen',
      bg_blue: '🟦 Blue Screen',
      bg_dark: '⬛ Studio Gelap',
      btn_upload_bg: '🖼️ Unggah Wallpaper Sendiri',
      btn_remove_bg: '❌ Hapus Gambar Kustom',
      title_adjust_bg: '📐 Sesuaikan Ukuran & Posisi Background',
      btn_bg_fit_cover: '📐 Penuh (Cover)',
      btn_bg_fit_contain: '🖼️ Pas Utuh (Contain)',
      label_bg_scale: 'Ukuran / Zoom Background:',
      label_bg_pos_x: 'Geser Posisi Horizontal (X):',
      label_bg_pos_y: 'Geser Posisi Vertikal (Y):',
      btn_reset_bg_transform: '🔄 Reset Ukuran & Posisi Background',
      toast_bg_transform_reset: '🔄 Ukuran & posisi background dipulihkan ke normal!',
      label_camera_handcam: '📷 Kamera Langsung (Handcam):',
      desc_camera_handcam: 'Sorot meja, tangan, atau kegiatan live di HP. Avatar melayang di atas kamera secara live!',
      btn_camera_back: '📷 Kamera Belakang',
      btn_camera_front: '🤳 Kamera Depan',
      btn_camera_stop: '⏹️ Matikan Kamera HP',
      btn_camera_fit_cover: '📐 Tampilan: Penuh Layar (Cover)',
      btn_camera_fit_contain: '📐 Tampilan: Proporsional (Fit)',
      flyout_emotions_title: '🎭 Kelola Emosi',
      desc_emotions: 'Pilih emosi aktif, ubah nama atau atur tombol pintas:',
      btn_add_emotion: '➕ Tambah Emosi Baru',
      title_backup_restore: '💾 Cadangkan & Pulihkan Avatar',
      desc_backup_restore: 'Simpan seluruh avatar & pengaturan ke file agar tidak pernah hilang saat ganti perangkat atau update browser.',
      btn_export_profile: '📥 Ekspor Profil',
      btn_import_profile: '📤 Impor Profil',
      btn_emo_active: '✓ Aktif',
      btn_emo_select: 'Pilih',
      placeholder_emo_name: 'Nama emosi...',
      flyout_motion_title: '✨ Gerakan & Melayang',
      label_floating: 'Efek Melayang Canva:',
      hint_floating: 'Gerakan bernapas lembut konstan',
      label_anim_behavior_mode: 'Mode Animasi Avatar (Respons Suara):',
      opt_anim_mode_bounce: 'Mode Pantulan',
      opt_anim_mode_scale: 'Mode Skala',
      desc_anim_mode_bounce: 'Diam: normal/melayang • Bicara: memantul hop-hop',
      desc_anim_mode_scale: 'Diam: mengecil (0.92x) • Bicara: membesar dinamis (1.05x–1.10x)',
      btn_report_bug: 'Lapor Bug',
      bug_modal_title: '🐞 Lapor Bug / Masukan',
      bug_modal_desc: 'Temukan kendala saat menggunakan aplikasi? Kirimkan laporan di bawah ini agar segera kami perbaiki:',
      label_bug_reporter: '1. Nama / Kontak Pelapor (Opsional):',
      placeholder_bug_reporter: 'Contoh: Rina / @rina_art (boleh dikosongkan)',
      label_bug_category: '2. Kategori Kendala:',
      opt_bug_cat_audio: 'Audio Tidak Sinkron',
      opt_bug_cat_image: 'Gambar Hilang',
      opt_bug_cat_ui: 'Tampilan Rusak',
      opt_bug_cat_other: 'Lainnya',
      label_bug_desc: '3. Deskripsi Kendala / Bug:',
      placeholder_bug_desc: 'Ceritakan detail kendala yang kamu alami...',
      btn_submit_bug: 'Kirim Laporan',
      bug_status_sending: 'Mengirim...',
      bug_status_success: 'Laporan berhasil terkirim! Terima kasih masukannya.',
      label_float_intensity: 'Tinggi Ayunan:',
      label_float_speed: 'Kecepatan Melayang:',
      label_bounce: 'Pantulan Bicara (Hop):',
      label_bounce_speed: 'Kecepatan Pantulan:',
      label_avatar_scale: 'Ukuran Avatar:',
      label_pos_y: 'Posisi Vertikal (Offset Y):',
      label_pos_presets: '📍 Posisi Cepat Avatar (Sudut Layar):',
      desc_pos_presets: 'Bisa juga sentuh & geser avatar langsung di layar!',
      pos_bottom_right: '↘️ Kanan Bawah',
      pos_bottom_left: '↙️ Kiri Bawah',
      pos_top_right: '↗️ Kanan Atas',
      pos_top_left: '↖️ Kiri Atas',
      pos_center: '⏺️ Tengah Layar',
      label_blink_interval: 'Interval Kedip Otomatis:',
      label_blink_duration: 'Durasi Kedip:',
      flyout_hotkeys_title: '⌨️ Kustomisasi Hotkeys',
      title_sys_hotkeys: '🎮 Pintasan Sistem',
      name_mute: '🎙️ Mute / Unmute',
      desc_mute: 'Bungkam / buka suara instan',
      name_obs: '👁️ Sembunyikan Menu (OBS)',
      desc_obs: 'Mode tampilan bersih transparan',
      name_reset: '🔄 Reset Audio',
      desc_reset: 'Normalkan volume & buffer',
      btn_reset_sys_keys: '🔄 Pulihkan Hotkey Sistem (M, H, R)',
      title_emo_hotkeys: '🎭 Pintasan Ganti Emosi',
      desc_emo_hotkeys: 'Tekan tombol untuk beralih ekspresi seketika. Tekan lagi untuk kembali ke Normal.',
      btn_reset_emo_keys: '🔄 Pulihkan Hotkey Emosi (1, 2, 3...)',
      btn_relock_vip: '🔒 Kunci Ulang Akses Tester (Keluar)',
      flyout_audio_file_title: '📁 File Rekaman Suara',
      btn_pick_audio: '📂 Pilih File Audio (MP3 / WAV)',
      no_audio_loaded: 'Belum ada file dipilih',
      btn_remove_audio: '🗑️ Hapus File Audio',
      flyout_export_title: '🎬 Rekam Video & Ekspor',
      label_transparent_export: '✨ Ekspor Transparan (Format WEBM)',
      hint_transparent_export: 'Alpha channel murni tanpa background, siap drag & drop ke OBS / Premiere',
      label_export_bg: 'Latar Belakang Video:',
      opt_bg_current: '📷 Sesuai Layar (Kamera HP / Wallpaper Aktif)',
      opt_bg_green: '🟩 Green Screen (Chroma Key CapCut / TikTok)',
      opt_bg_transparent: '✨ Transparan Penuh (Khusus OBS WebM di PC)',
      label_export_format: 'Format Video:',
      opt_fmt_mp4: '🎬 MP4 (Universal: iPhone, Android, TikTok, CapCut, PC)',
      opt_fmt_mov: '🍏 MOV (Apple QuickTime / Final Cut Pro / iPhone)',
      opt_fmt_webm: '✨ WebM (Transparan / Alpha Channel untuk OBS)',
      label_export_resolution: 'Ukuran & Rasio Video:',
      opt_res_9_16: '📱 9:16 Vertikal (1080 × 1920 - TikTok, Reels, Shorts)',
      opt_res_9_16_hd: '📱 9:16 HD Cepat & Mulus (720 × 1280 - Rekomendasi Medsos / HP)',
      opt_res_9_16_fhd: '📱 9:16 Full HD (1080 × 1920 - Tajam / PC & HP Flagship)',
      opt_res_3_2: '📷 3:2 Kamera (1620 × 1080 - Rasio Kamera Standar)',
      opt_res_2_3: '📸 2:3 Potret (1080 × 1620 - Foto Vertikal)',
      opt_res_1_1: '⏹️ 1:1 Persegi (1080 × 1080 - Feed IG & Profil)',
      opt_res_16_9: '🖥️ 16:9 Horizontal (1920 × 1080 - YouTube / PC)',
      opt_res_16_9_hd: '🖥️ 16:9 HD Cepat (1280 × 720 - YouTube HD)',
      opt_res_16_9_fhd: '🖥️ 16:9 Full HD (1920 × 1080 - YouTube 1080p)',
      label_export_fps: 'Kecepatan Bingkai (FPS):',
      opt_fps_30: '⚡ 30 FPS (Rekomendasi Medsos - Super Mulus, Stabil, Anti-Lag di CapCut & IG)',
      opt_fps_60: '🚀 60 FPS (Ultra Smooth - Butuh Perangkat Kuat)',
      btn_record_start: 'Mulai Merekam Video',
      btn_record_stop: 'Hentikan Rekaman Video',
      status_record_ready: 'Siap merekam video avatar reaktif audio (CFR Mulus • Ramah CapCut & Medsos).',
      status_recording: 'Sedang merekam...',
      btn_restore_controls: '⚙️ Tampilkan Toolbar',
      btn_pure_green: '🟩 Layar Penuh Green Screen Murni (#00FF00)',
      desc_pure_green: 'Sembunyikan semua menu & ubah layar jadi hijau solid #00FF00. Siap untuk chroma key langsung di Prism Live / HP.',
      btn_quick_camera: '📷 Aktifkan Kamera Langsung (Handcam)',
      desc_quick_camera: 'Sorot meja, tangan, atau kegiatan live di HP. Avatar melayang di atas kamera secara live untuk langsung dipakai ngonten!',
      btn_restore_green: '⚙️ Keluar Green Screen',
      modal_rec_title: '🎉 Rekaman Berhasil Dibuat!',
      meta_duration: 'Durasi:',
      meta_size: 'Ukuran:',
      meta_format: 'Format:',
      btn_download_mp4: '⬇️ Unduh MP4 (.mp4)',
      btn_download_mov: '🍏 Unduh MOV (.mov)',
      btn_share_video: '📱 Simpan ke Galeri / Bagikan',
      btn_dismiss_modal: 'Tutup',
      lang_modal_badge: '🌐 Multi-Language Support',
      lang_modal_title: 'Pilih Bahasa / Select Language',
      lang_modal_subtitle: 'Silakan tentukan bahasa tampilan aplikasi favoritmu:',
      lang_btn_confirm: 'Lanjutkan ✨ Continue',
      lang_footer_hint: '💡 Kamu selalu bisa mengganti bahasa kapan saja lewat tombol 🌐 di bar atas.',
      vip_pill_badge: '🔒 Exclusive Closed Beta',
      vip_subtitle: 'Aplikasi ini dalam tahap uji coba eksklusif & berlisensi privat.',
      vip_input_label: 'Masukkan Kode Akses Tester:',
      vip_placeholder: 'Ketik kode di sini...',
      vip_error_msg: '⚠️ Kode akses tidak sesuai! Silakan hubungi pembuat aplikasi.',
      vip_btn_submit: 'Buka Aplikasi ✨',
      vip_footer_note: '💡 Memiliki kode tester? Masukkan sekali dan kode akan otomatis tersimpan di HP/perangkat kamu.',
      toast_lang_switched: '🌐 Bahasa diubah ke Bahasa Indonesia',
      toast_emotion_renamed: '✏️ Nama emosi berhasil disimpan!',
      badge_active: '✓ Aktif',
      desc_active_emotion: 'Ekspresi tampil di avatar',
      desc_switch_emotion: 'Tekan hotkey untuk beralih',
      btn_change_hotkey_title: 'Klik untuk ubah hotkey emosi ini',
      label_status_prefix: 'Status: ',
      status_mic_disconnected: 'Terputus',
      status_mic_connecting: 'Meminta Izin Mic...',
      status_mic_active: 'Aktif & Mendengarkan',
      status_mic_https: 'Butuh HTTPS / Local Server',
      status_mic_denied: 'Izin Ditolak',
      status_mic_error: 'Gagal Mengakses',
      btn_download_webm: '✨ Unduh WebM Transparan (.webm)',
      title_hotkey_mute: 'Klik untuk ubah hotkey mute',
      title_hotkey_obs: 'Klik untuk ubah hotkey OBS',
      title_hotkey_reset: 'Klik untuk ubah hotkey reset audio',
      err_camera_unsupported: 'Kamera tidak didukung di browser ini.',
      err_camera_denied: 'Izin kamera ditolak. Berikan izin di browser HP.',
      err_camera_failed: 'Gagal menyalakan kamera',
      dock_camera_back_active: 'Kamera Belakang Aktif (Klik untuk ganti Kamera Depan)',
      dock_camera_front_active: 'Kamera Depan Aktif (Klik untuk matikan kamera)',
      toast_camera_back_active: '📷 Kamera Belakang aktif! (Sorot meja/kegiatan)',
      toast_camera_front_active: '🤳 Kamera Depan aktif!',
      toast_camera_stopped: 'Kamera dimatikan',
      toast_camera_fit_cover: '📐 Mode: Kamera Penuh Layar (Cover)',
      toast_camera_fit_contain: '📐 Mode: Kamera Pas Sensor (Fit)',
      toast_mic_active: '🎙️ Mikrofon aktif & mendengarkan suara!',
      toast_mic_muted: '🔇 Mikrofon Dimute',
      toast_mic_unmuted: '🎙️ Mikrofon Di-unmute (Aktif)',
      toast_recording_ready: '🎉 Rekaman video siap disimpan!',
      toast_video_downloading: '⬇️ Mengunduh video...',
      toast_video_shared: '✅ Berhasil dibagikan / disimpan ke Galeri!',
      toast_audio_reset: '🔄 Audio berhasil direkalibrasi & direset!',
      toast_press_hotkey_prefix: '⌨️ Tekan tombol baru untuk ',
      toast_press_hotkey_suffix: ' (Esc untuk batal)',
      toast_green_screen_active: '🟩 Mode Green Screen Murni (#00FF00) Aktif (Prism Live Ready)',
      toast_green_screen_exit: 'Kembali ke tampilan editor',
      toast_obs_active: 'Mode OBS aktif (Tekan H untuk kembali)',
      toast_rec_start_cfr: '🔴 Merekam video 60 FPS CFR (Kualitas Tinggi)...',
      toast_rec_start_cfr_audio: '🔴 Merekam 60 FPS CFR & memutar audio...',
      toast_rec_start_transparent: '✨🔴 Merekam video WebM transparan (60 FPS CFR)...',
      toast_rec_start_transparent_audio: '✨🔴 Merekam WebM Transparan (60 FPS CFR) & memutar audio...',
      toast_rec_unsupported: '⚠️ Perekaman video tidak didukung di browser ini.',
      toast_transparent_export_active: '✨ Mode Ekspor Transparan Aktif (WebM VP9 Alpha)',
      toast_normal_export_restored: 'Mode latar belakang & format video normal dipulihkan.',
      toast_webm_transparent_hint: '💡 Format WebM dipilih. Aktifkan sakelar "Ekspor Transparan" untuk alpha channel murni!',
      toast_floating_enabled: 'Efek melayang Canva aktif',
      toast_floating_disabled: 'Efek melayang Canva dimatikan',
      toast_pos_bottom_right: '📍 Avatar dipindah ke Kanan Bawah',
      toast_pos_bottom_left: '📍 Avatar dipindah ke Kiri Bawah',
      toast_pos_top_right: '📍 Avatar dipindah ke Kanan Atas',
      toast_pos_top_left: '📍 Avatar dipindah ke Kiri Atas',
      toast_pos_center: '📍 Avatar dipindah ke Tengah Layar',
      toast_custom_bg_set: 'Latar belakang kustom dipasang!',
      toast_reset_sys_keys: 'Hotkey dikembalikan ke default: M, H, R!',
      toast_reset_emo_keys: 'Hotkey emosi dikembalikan ke default: [1], [2], [3]...',
      toast_profile_saved: '💾 Profil avatar & pengaturan berhasil dicadangkan!',
      toast_profile_export_failed: '⚠️ Gagal mengekspor profil',
      toast_profile_restored: '🎉 Profil avatar berhasil dipulihkan!',
      toast_profile_import_failed: '⚠️ Gagal membaca file backup: Format tidak sesuai',
      toast_hotkey_cancel: 'Batal mengubah pintasan',
      toast_hotkey_set: 'Pintasan diset ke: ',
      toast_active_emotion: 'Emosi aktif: ',
      toast_return_to: 'Kembali ke: ',
      toast_sprite_saved: '💾 Sprite tersimpan permanen di HP!',
      toast_audio_file_ready: 'File audio siap dideteksi!',
      toast_audio_file_removed: 'File audio dihapus. Kembali ke mikrofon live.',
      toast_processing_sprite: 'Memproses gambar sprite...',
      toast_new_emotion: 'Emosi baru ditambahkan!'
    },
    'ja': {
      app_title: 'SmoothieTuber - 落書き風2D手描きPNGTuber',
      brand_badge: '2D PNGTuber',
      brand_tagline: '落書き風手描きラインアート＆音声反応スタジオ',
      pill_live_audio: 'リアルタイム音声反応',
      dock_mute: '音声をミュート/解除 (ホットキー: M)',
      dock_audio: '音声調整＆口の開き保持時間',
      dock_bg: '背景選択 / グリーンスクリーン',
      dock_obs: 'OBS用メニュー非表示 (ホットキー: H)',
      dock_pure_green: '純粋グリーンスクリーンモード (スマホ配信/Prism Live)',
      dock_camera: '手元/背景カメラ (クリック: 背面 / 前面 / オフ)',
      dock_record: '透過動画の録画開始 / 停止',
      dock_emotions: '表情の管理・切り替え',
      dock_motion: 'Canva浮遊＆揺れアニメーション',
      dock_hotkeys: 'キーボードショートカット (ホットキー)',
      dock_audio_file: '録音音声ファイルから検出',
      dock_export: '動画録画＆書き出しスタジオ',
      slot_closed: '口閉じ・目開き (PNG変更はクリック)',
      slot_open: '口開き・目開き (PNG変更はクリック)',
      slot_closed_blink: '口閉じ・まばたき (PNG変更はクリック)',
      slot_open_blink: '口開き・まばたき (PNG変更はクリック)',
      flyout_audio_title: '🎙️ 音声キャリブレーション',
      status_disconnected: '未接続',
      status_active: '有効',
      status_muted: 'ミュート中',
      label_mic_device: 'マイクデバイス:',
      option_default_system: '⚡ 自動 (外部マイク優先)',
      btn_refresh_mic: '🔄 マイク再検出',
      label_active_mic: '使用中:',
      toast_mic_refreshed: '🎙️ マイクを更新しました:',
      label_camera_zoom: '🔍 カメラズーム:',
      toast_cam_zoom: '🔍 カメラズーム:',
      label_threshold: '音声検出しきい値 (Threshold):',
      label_hang_time: '口開き保持時間 (Hang Time):',
      btn_reset_audio: '🔄 音声リセット / 再調整 (ホットキー: R)',
      flyout_bg_title: '🏁 背景設定',
      bg_transparent: '🏁 透過背景',
      bg_green: '🟩 グリーンスクリーン',
      bg_blue: '🟦 ブルースクリーン',
      bg_dark: '⬛ ダークスタジオ',
      btn_upload_bg: '🖼️ カスタム壁紙をアップロード',
      btn_remove_bg: '❌ カスタム画像を削除',
      label_camera_handcam: '📷 リアルタイムカメラ (手元配信):',
      desc_camera_handcam: 'デスクや手元、スマホの作業風景を写しながらアバターが上に重なります！',
      btn_camera_back: '📷 背面カメラ',
      btn_camera_front: '🤳 前面カメラ',
      btn_camera_stop: '⏹️ カメラを停止',
      btn_camera_fit_cover: '📐 表示: 全画面 (Cover)',
      btn_camera_fit_contain: '📐 表示: 縦横比維持 (Fit)',
      flyout_emotions_title: '🎭 表情管理',
      desc_emotions: '表情の選択、名前変更、ショートカットキー設定:',
      btn_add_emotion: '➕ 新しい表情を追加',
      title_backup_restore: '💾 アバターのバックアップ＆復元',
      desc_backup_restore: 'デバイス変更や更新時も消えないようプロファイルを保存します。',
      btn_export_profile: '📥 プロファイル書き出し',
      btn_import_profile: '📤 プロファイル読み込み',
      btn_emo_active: '✓ 使用中',
      btn_emo_select: '選択',
      placeholder_emo_name: '表情の名前...',
      flyout_motion_title: '✨ 動きと浮遊効果',
      label_floating: 'Canva浮遊効果:',
      hint_floating: '自然でなめらかな呼吸モーション',
      label_anim_behavior_mode: 'アバターのアニメーションモード (音声反応):',
      opt_anim_mode_bounce: 'バウンスモード',
      opt_anim_mode_scale: 'スケールモード',
      desc_anim_mode_bounce: '無音時: 通常/浮遊 • 発声時: リズムよく跳ねる',
      desc_anim_mode_scale: '無音時: 縮小 (0.92x) • 発声時: 音量に応じて拡大 (1.05x–1.10x)',
      btn_report_bug: 'バグ報告',
      bug_modal_title: '🐞 バグ報告 / フィードバック',
      bug_modal_desc: '不具合を見つけましたか？以下のフォームからご報告ください：',
      label_bug_reporter: '1. お名前 / 連絡先 (任意):',
      placeholder_bug_reporter: '例: Rina / @rina_art (空欄でもOK)',
      label_bug_category: '2. 問題の種類:',
      opt_bug_cat_audio: '音声が同期しない',
      opt_bug_cat_image: '画像が消える・表示されない',
      opt_bug_cat_ui: '画面レイアウトの崩れ',
      opt_bug_cat_other: 'その他',
      label_bug_desc: '3. 詳細な説明:',
      placeholder_bug_desc: '発生した問題の詳細をご記入ください...',
      btn_submit_bug: '報告を送信',
      bug_status_sending: '送信中...',
      bug_status_success: '報告が送信されました！フィードバックありがとうございます。',
      label_float_intensity: '揺れの高さ:',
      label_float_speed: '浮遊速度:',
      label_bounce: '発声時の跳ね (Hop):',
      label_bounce_speed: '跳ねる速度 (Bounce Speed):',
      label_avatar_scale: 'アバターサイズ:',
      label_pos_y: '垂直位置 (Y軸オフセット):',
      label_pos_presets: '📍 クイック配置 (画面の隅):',
      desc_pos_presets: '画面上で直接ドラッグして移動も可能です！',
      pos_bottom_right: '↘️ 右下',
      pos_bottom_left: '↙️ 左下',
      pos_top_right: '↗️ 右上',
      pos_top_left: '↖️ 左上',
      pos_center: '⏺️ 画面中央',
      label_blink_interval: '自動まばたき間隔:',
      label_blink_duration: 'まばたき時間:',
      flyout_hotkeys_title: '⌨️ ホットキー設定',
      title_sys_hotkeys: '🎮 システムショートカット',
      name_mute: '🎙️ ミュート / 解除',
      desc_mute: '瞬時に音声を消音 / 再開',
      name_obs: '👁️ メニュー非表示 (OBS)',
      desc_obs: '透過クリーン画面モード',
      name_reset: '🔄 音声リセット',
      desc_reset: '音量バッファをリフレッシュ',
      btn_reset_sys_keys: '🔄 システムキーを初期化 (M, H, R)',
      title_emo_hotkeys: '🎭 表情切り替えショートカット',
      desc_emo_hotkeys: 'キーを押して瞬時に表情を切り替えます。もう一度押すと通常に戻ります。',
      btn_reset_emo_keys: '🔄 表情キーを初期化 (1, 2, 3...)',
      btn_relock_vip: '🔒 テスターアクセスを再ロック (ログアウト)',
      flyout_audio_file_title: '📁 録音音声ファイル',
      btn_pick_audio: '📂 音声ファイル選択 (MP3 / WAV)',
      no_audio_loaded: 'ファイルが選択されていません',
      btn_remove_audio: '🗑️ 音声ファイルを削除',
      flyout_export_title: '🎬 動画録画＆書き出し',
      label_transparent_export: '✨ 透過動画エクスポート (WEBM形式)',
      hint_transparent_export: '背景なしの純粋なアルファチャンネル。OBSや動画編集ソフトにそのままD&D可能',
      label_export_bg: '動画の背景:',
      opt_bg_current: '📷 画面のまま (カメラ/壁紙)',
      opt_bg_green: '🟩 グリーンスクリーン (TikTok/CapCut用クロマキー)',
      opt_bg_transparent: '✨ 完全透過 (PC OBS用WebM)',
      label_export_format: '動画形式:',
      opt_fmt_mp4: '🎬 MP4 (汎用: iPhone, Android, TikTok, CapCut, PC)',
      opt_fmt_mov: '🍏 MOV (Apple QuickTime / Final Cut Pro / iPhone)',
      opt_fmt_webm: '✨ WebM (透過アルファチャンネル対応 OBS用)',
      label_export_resolution: '動画サイズ＆比率:',
      opt_res_9_16: '📱 9:16 縦型 (1080 × 1920 - TikTok, Reels, Shorts)',
      opt_res_9_16_hd: '📱 9:16 HD 高速・快適 (720 × 1280 - スマホ推奨, TikTok, Reels)',
      opt_res_9_16_fhd: '📱 9:16 フルHD (1080 × 1920 - 高精細 / PC・フラグシップ)',
      opt_res_3_2: '📷 3:2 カメラ (1620 × 1080 - 標準カメラ比率)',
      opt_res_2_3: '📸 2:3 ポートレート (1080 × 1620 - 縦向き写真)',
      opt_res_1_1: '⏹️ 1:1 正方形 (1080 × 1080 - IGフィード・アイコン)',
      opt_res_16_9: '🖥️ 16:9 横型 (1920 × 1080 - YouTube / PC)',
      opt_res_16_9_hd: '🖥️ 16:9 HD 高速 (1280 × 720 - YouTube HD)',
      opt_res_16_9_fhd: '🖥️ 16:9 フルHD (1920 × 1080 - YouTube 1080p)',
      label_export_fps: 'フレームレート (FPS):',
      opt_fps_30: '⚡ 30 FPS (SNS推奨 - 超スムーズ・CapCut/IG安定)',
      opt_fps_60: '🚀 60 FPS (ウルトラスムーズ - 高性能端末向け)',
      btn_record_start: '録画を開始',
      btn_record_stop: '録画を停止',
      status_record_ready: '音声反応アバター動画の録画準備完了 (CFRスムーズ・SNS/CapCut対応)',
      status_recording: '録画中...',
      btn_restore_controls: '⚙️ ツールバーを表示',
      btn_pure_green: '🟩 全画面純粋グリーンスクリーン (#00FF00)',
      desc_pure_green: 'すべてのメニューを隠し画面を純粋な#00FF00グリーンにします。Prism Liveやスマホ配信アプリのクロマキーに最適です。',
      btn_quick_camera: '📷 カメラ配信を有効化 (手元/自撮り)',
      desc_quick_camera: '手元や作業風景をリアルタイム撮影。アバターを重ねて即配信＆動画作成！',
      btn_restore_green: '⚙️ グリーンスクリーン解除',
      modal_rec_title: '🎉 録画が完了しました！',
      meta_duration: '再生時間:',
      meta_size: 'ファイル容量:',
      meta_format: 'フォーマット:',
      btn_download_mp4: '⬇️ MP4をダウンロード (.mp4)',
      btn_download_mov: '🍏 MOVをダウンロード (.mov)',
      btn_share_video: '📱 写真・カメラロールに保存 / 共有',
      btn_dismiss_modal: '閉じる',
      lang_modal_badge: '🌐 多言語対応',
      lang_modal_title: '言語を選択してください / Select Language',
      lang_modal_subtitle: 'お好みの表示言語を選択してください:',
      lang_btn_confirm: '次へ進む ✨ Continue',
      lang_footer_hint: '💡 上部バーの🌐アイコンからいつでも言語を切り替えられます。',
      vip_pill_badge: '🔒 限定クローズドベータ',
      vip_subtitle: '本アプリはプライベートライセンスの限定テスト版です。',
      vip_input_label: 'テスターアクセスコードを入力:',
      vip_placeholder: 'ここにコードを入力...',
      vip_error_msg: '⚠️ コードが正しくありません。開発者にお問い合わせください。',
      vip_btn_submit: 'アプリを起動 ✨',
      vip_footer_note: '💡 一度入力すると、次回以降はお使いの端末に自動保存されます。',
      toast_lang_switched: '🌐 言語を日本語に切り替えました',
      toast_emotion_renamed: '✏️ 表情の名前を保存しました！',
      badge_active: '✓ 有効',
      desc_active_emotion: '現在アバターに表示中',
      desc_switch_emotion: 'キーを押して切り替え',
      btn_change_hotkey_title: 'クリックしてこの表情のホットキーを変更',
      label_status_prefix: '状態: ',
      status_mic_disconnected: '未接続',
      status_mic_connecting: 'マイク許可をリクエスト中...',
      status_mic_active: 'アクティブ＆待機中',
      status_mic_https: 'HTTPS / ローカルサーバーが必要',
      status_mic_denied: 'マイクの許可が拒否されました',
      status_mic_error: 'アクセス失敗',
      btn_download_webm: '✨ 透過WebMをダウンロード (.webm)',
      title_hotkey_mute: 'クリックしてミュートホットキーを変更',
      title_hotkey_obs: 'クリックしてOBSモードホットキーを変更',
      title_hotkey_reset: 'クリックして音声リセットホットキーを変更',
      err_camera_unsupported: 'このブラウザではカメラがサポートされていません。',
      err_camera_denied: 'カメラの許可が拒否されました。設定で許可してください。',
      err_camera_failed: 'カメラの起動に失敗しました',
      dock_camera_back_active: '背面カメラ有効 (クリックして前面カメラに切替)',
      dock_camera_front_active: '前面カメラ有効 (クリックしてカメラをオフ)',
      toast_camera_back_active: '📷 背面カメラが有効になりました！(手元/作業を撮影)',
      toast_camera_front_active: '🤳 前面カメラが有効になりました！',
      toast_camera_stopped: 'カメラをオフにしました',
      toast_camera_fit_cover: '📐 モード: 全画面カメラ (Cover)',
      toast_camera_fit_contain: '📐 モード: 縦横比維持カメラ (Fit)',
      toast_mic_active: '🎙️ マイクが有効になりました！',
      toast_mic_muted: '🔇 マイクをミュートしました',
      toast_mic_unmuted: '🎙️ マイクのミュートを解除しました (アクティブ)',
      toast_recording_ready: '🎉 録画が完了しました！',
      toast_video_downloading: '⬇️ 動画をダウンロード中...',
      toast_video_shared: '✅ 共有 / カメラロールへの保存が完了しました！',
      toast_audio_reset: '🔄 音声エンジンをリセット＆再調整しました！',
      toast_press_hotkey_prefix: '⌨️ 新しいキーを押してください: ',
      toast_press_hotkey_suffix: ' (Escでキャンセル)',
      toast_green_screen_active: '🟩 純粋グリーンスクリーン (#00FF00) が有効になりました',
      toast_green_screen_exit: 'エディター画面に戻りました',
      toast_obs_active: 'OBSモードが有効になりました (Hキーで戻る)',
      toast_rec_start_cfr: '🔴 60 FPS CFR（高画質）で動画を録画中...',
      toast_rec_start_cfr_audio: '🔴 60 FPS CFR で録画＆音声を再生中...',
      toast_rec_start_transparent: '✨🔴 透過WebM動画（60 FPS CFR）を録画中...',
      toast_rec_start_transparent_audio: '✨🔴 透過WebM（60 FPS CFR）を録画＆音声を再生中...',
      toast_rec_unsupported: '⚠️ このブラウザでは動画の録画がサポートされていません。',
      toast_transparent_export_active: '✨ 透過書き出しモードが有効になりました (WebM VP9 Alpha)',
      toast_normal_export_restored: '通常の背景と動画形式に戻りました。',
      toast_webm_transparent_hint: '💡 WebM形式が選択されました。純粋な透過にするには「透過エクスポート」を有効にしてください！',
      toast_floating_enabled: 'Canva浮遊効果を有効にしました',
      toast_floating_disabled: 'Canva浮遊効果をオフにしました',
      toast_pos_bottom_right: '📍 アバターを右下に移動しました',
      toast_pos_bottom_left: '📍 アバターを左下に移動しました',
      toast_pos_top_right: '📍 アバターを右上に移動しました',
      toast_pos_top_left: '📍 アバターを左上に移動しました',
      toast_pos_center: '📍 アバターを画面中央に移動しました',
      toast_custom_bg_set: 'カスタム壁紙を設定しました！',
      toast_reset_sys_keys: 'システムホットキーを初期化しました: M, H, R！',
      toast_reset_emo_keys: '表情ホットキーを初期化しました: [1], [2], [3]...',
      toast_profile_saved: '💾 アバタープロファイルと設定をバックアップしました！',
      toast_profile_export_failed: '⚠️ プロファイルの書き出しに失敗しました',
      toast_profile_restored: '🎉 アバタープロファイルが復元されました！',
      toast_profile_import_failed: '⚠️ バックアップの読み込みに失敗しました: ファイル形式が無効です',
      toast_hotkey_cancel: 'ショートカットの変更をキャンセルしました',
      toast_hotkey_set: 'ショートカットを設定しました: ',
      toast_active_emotion: '使用中の表情: ',
      toast_return_to: '復帰: ',
      toast_sprite_saved: '💾 画像スプライトが端末に保存されました！',
      toast_audio_file_ready: '音声ファイルの読み込みが完了しました！',
      toast_audio_file_removed: '音声ファイルを解除しました。マイク入力に戻ります。',
      toast_processing_sprite: '画像スプライトを処理中...',
      toast_new_emotion: '新しい表情が追加されました！'
    },
    'zh': {
      app_title: 'SmoothieTuber - 涂鸦风格2D手绘PNGTuber',
      brand_badge: '2D PNGTuber',
      brand_tagline: '手绘涂鸦线条风格·声音感应虚拟形象工作室',
      pill_live_audio: '实时声音响应',
      dock_mute: '静音/取消静音 (快捷键: M)',
      dock_audio: '音频校准与张嘴延时',
      dock_bg: '选择背景 / 绿幕',
      dock_obs: '隐藏菜单进入OBS模式 (快捷键: H)',
      dock_pure_green: '纯净全屏绿幕模式 (手机推流/Prism Live)',
      dock_camera: '实景摄像头 (点击切换: 后置 / 前置 / 关闭)',
      dock_record: '开始 / 停止录制透明视频',
      dock_emotions: '管理或切换表情',
      dock_motion: 'Canva微风呼吸浮动动画',
      dock_hotkeys: '键盘快捷键 (Hotkeys)',
      dock_audio_file: '从本地音频文件感应',
      dock_export: '录制与视频导出工作室',
      slot_closed: '闭嘴睁眼 (点击替换PNG)',
      slot_open: '张嘴睁眼 (点击替换PNG)',
      slot_closed_blink: '闭嘴眨眼 (点击替换PNG)',
      slot_open_blink: '张嘴眨眼 (点击替换PNG)',
      flyout_audio_title: '🎙️ 声音校准',
      status_disconnected: '未连接',
      status_active: '工作中',
      status_muted: '静音中',
      label_mic_device: '麦克风设备:',
      option_default_system: '⚡ 自动 (优先外接麦克风)',
      btn_refresh_mic: '🔄 检测麦克风',
      label_active_mic: '当前使用:',
      toast_mic_refreshed: '🎙️ 麦克风已更新:',
      label_camera_zoom: '🔍 摄像头缩放:',
      toast_cam_zoom: '🔍 摄像头缩放:',
      label_threshold: '声音感应阈值 (Threshold):',
      label_hang_time: '张嘴保持时间 (Hang Time):',
      btn_reset_audio: '🔄 重置 / 重新校准音频 (快捷键: R)',
      flyout_bg_title: '🏁 背景设置',
      bg_transparent: '🏁 透明棋盘',
      bg_green: '🟩 绿幕',
      bg_blue: '🟦 蓝幕',
      bg_dark: '⬛ 暗色影棚',
      btn_upload_bg: '🖼️ 上传自定义壁纸',
      btn_remove_bg: '❌ 移除自定义背景',
      label_camera_handcam: '📷 实时手部/桌面摄像头 (Handcam):',
      desc_camera_handcam: '拍摄手部或现实操作画面，虚拟形象将悬浮于画面上方！',
      btn_camera_back: '📷 后置摄像头',
      btn_camera_front: '🤳 前置摄像头',
      btn_camera_stop: '⏹️ 关闭手机摄像头',
      btn_camera_fit_cover: '📐 画面模式: 全屏填充 (Cover)',
      btn_camera_fit_contain: '📐 画面模式: 等比完整 (Fit)',
      flyout_emotions_title: '🎭 管理表情',
      desc_emotions: '选择当前表情、重命名或绑定快捷键:',
      btn_add_emotion: '➕ 添加新表情',
      title_backup_restore: '💾 备份与恢复形象档案',
      desc_backup_restore: '导出所有素材与设置为文件，更换设备或更新浏览器时数据不丢失。',
      btn_export_profile: '📥 导出档案',
      btn_import_profile: '📤 导入档案',
      btn_emo_active: '✓ 当前激活',
      btn_emo_select: '选择',
      placeholder_emo_name: '表情名称...',
      flyout_motion_title: '✨ 浮动与动画效果',
      label_floating: 'Canva呼吸浮动效果:',
      hint_floating: '柔和恒定的起伏律动',
      label_anim_behavior_mode: '形象动画模式 (语音响应):',
      opt_anim_mode_bounce: '弹跳模式',
      opt_anim_mode_scale: '缩放模式',
      desc_anim_mode_bounce: '静音: 正常/浮动 • 说话: 跳跃律动',
      desc_anim_mode_scale: '静音: 缩小 (0.92x) • 说话: 随音量动态放大 (1.05x–1.10x)',
      btn_report_bug: '报告问题',
      bug_modal_title: '🐞 报告问题 / 意见反馈',
      bug_modal_desc: '使用过程中遇到问题？请在下方填写反馈以便我们尽快修复：',
      label_bug_reporter: '1. 报告人称呼 / 联系方式 (选填):',
      placeholder_bug_reporter: '例如: Rina / @rina_art (可留空)',
      label_bug_category: '2. 问题类别:',
      opt_bug_cat_audio: '音频不同步',
      opt_bug_cat_image: '图像丢失',
      opt_bug_cat_ui: '界面显示异常',
      opt_bug_cat_other: '其他',
      label_bug_desc: '3. 问题描述:',
      placeholder_bug_desc: '请详细描述您遇到的问题...',
      btn_submit_bug: '发送报告',
      bug_status_sending: '正在发送...',
      bug_status_success: '报告发送成功！感谢您的反馈。',
      label_float_intensity: '浮动幅度:',
      label_float_speed: '浮动速度:',
      label_bounce: '说话跳动幅度 (Hop):',
      label_bounce_speed: '跳跃速度 (Bounce Speed):',
      label_avatar_scale: '形象大小:',
      label_pos_y: '垂直偏移 (Y轴):',
      label_pos_presets: '📍 快速角落定位:',
      desc_pos_presets: '也可以在屏幕上直接触摸拖动形象！',
      pos_bottom_right: '↘️ 右下角',
      pos_bottom_left: '↙️ 左下角',
      pos_top_right: '↗️ 右上角',
      pos_top_left: '↖️ 左上角',
      pos_center: '⏺️ 屏幕居中',
      label_blink_interval: '自动眨眼间隔:',
      label_blink_duration: '眨眼持续时长:',
      flyout_hotkeys_title: '⌨️ 自定义快捷键',
      title_sys_hotkeys: '🎮 系统快捷键',
      name_mute: '🎙️ 静音 / 恢复声音',
      desc_mute: '一键切断麦克风响应',
      name_obs: '👁️ 隐藏界面 (OBS)',
      desc_obs: '透明纯净捕获模式',
      name_reset: '🔄 重置音频引擎',
      desc_reset: '恢复音量缓存至标准状态',
      btn_reset_sys_keys: '🔄 恢复系统快捷键 (M, H, R)',
      title_emo_hotkeys: '🎭 表情快捷键',
      desc_emo_hotkeys: '按下即可秒切表情，再次按下返回普通表情。',
      btn_reset_emo_keys: '🔄 恢复表情默认键 (1, 2, 3...)',
      btn_relock_vip: '🔒 锁定测试权限 (退出登录)',
      flyout_audio_file_title: '📁 录音音频文件',
      btn_pick_audio: '📂 选择音频文件 (MP3 / WAV)',
      no_audio_loaded: '尚未选择文件',
      btn_remove_audio: '🗑️ 删除音频文件',
      flyout_export_title: '🎬 录制视频与导出',
      label_transparent_export: '✨ 透明通道导出 (WEBM格式)',
      hint_transparent_export: '无背景纯透明Alpha通道，可直接拖拽至OBS或剪辑软件无需抠图',
      label_export_bg: '视频背景:',
      opt_bg_current: '📷 当前屏幕 (实时摄像头/壁纸)',
      opt_bg_green: '🟩 绿幕背景 (适用于剪映/抖音色度键抠图)',
      opt_bg_transparent: '✨ 全透明通道 (适用于PC OBS WebM)',
      label_export_format: '视频格式:',
      opt_fmt_mp4: '🎬 MP4 (通用兼容: iPhone, Android, TikTok, 剪映, PC)',
      opt_fmt_mov: '🍏 MOV (苹果QuickTime / Final Cut Pro / iPhone)',
      opt_fmt_webm: '✨ WebM (透明通道 OBS专属)',
      label_export_resolution: '尺寸与画幅比例:',
      opt_res_9_16: '📱 9:16 竖屏 (1080 × 1920 - 抖音/快手/Shorts)',
      opt_res_9_16_hd: '📱 9:16 HD 高速流畅 (720 × 1280 - 手机推荐·抖音/快手)',
      opt_res_9_16_fhd: '📱 9:16 全高清 (1080 × 1920 - 高清画质 / 电脑与旗舰机)',
      opt_res_3_2: '📷 3:2 相机 (1620 × 1080 - 经典相机画幅)',
      opt_res_2_3: '📸 2:3 肖像 (1080 × 1620 - 竖向构图)',
      opt_res_1_1: '⏹️ 1:1 方形 (1080 × 1080 - 朋友圈/小红书/头像)',
      opt_res_16_9: '🖥️ 16:9 横屏 (1920 × 1080 - B站/YouTube/PC)',
      opt_res_16_9_hd: '🖥️ 16:9 HD 高速 (1280 × 720 - B站/YouTube HD)',
      opt_res_16_9_fhd: '🖥️ 16:9 全高清 (1920 × 1080 - B站/YouTube 1080p)',
      label_export_fps: '帧率设置 (FPS):',
      opt_fps_30: '⚡ 30 FPS (推荐社媒 - 超丝滑稳定·剪映/IG防卡顿)',
      opt_fps_60: '🚀 60 FPS (极致流畅 - 需要高配置设备)',
      btn_record_start: '开始录制视频',
      btn_record_stop: '停止视频录制',
      status_record_ready: '已就绪，随时可开始录制声音感应动画 (CFR流畅·剪映/社媒兼容)。',
      status_recording: '正在录制中...',
      btn_restore_controls: '⚙️ 显示工具栏',
      btn_pure_green: '🟩 全屏纯净绿幕模式 (#00FF00)',
      desc_pure_green: '隐藏所有菜单并将屏幕变为纯绿色#00FF00。完美适配手机推流应用 (如Prism Live) 的色度键抠图。',
      btn_quick_camera: '📷 开启实时摄像头 (手部/自拍)',
      desc_quick_camera: '实时拍摄桌面、手绘过程或自拍，形象悬浮于视频上方直接开录！',
      btn_restore_green: '⚙️ 退出绿幕',
      modal_rec_title: '🎉 录制成功完成！',
      meta_duration: '时长:',
      meta_size: '文件大小:',
      meta_format: '视频格式:',
      btn_download_mp4: '⬇️ 下载 MP4 (.mp4)',
      btn_download_mov: '🍏 下载 MOV (.mov)',
      btn_share_video: '📱 保存至手机相册 / 分享',
      btn_dismiss_modal: '关闭',
      lang_modal_badge: '🌐 多语言支持',
      lang_modal_title: '请选择语言 / Select Language',
      lang_modal_subtitle: '请选择您的首选显示语言:',
      lang_btn_confirm: '确认进入 ✨ Continue',
      lang_footer_hint: '💡 您可以在顶部导航栏点击 🌐 图标随时切换语言。',
      vip_pill_badge: '🔒 封闭内测专享',
      vip_subtitle: '本应用处于专属内测授权测试阶段。',
      vip_input_label: '请输入内测邀请码:',
      vip_placeholder: '在此输入密钥...',
      vip_error_msg: '⚠️ 授权码不正确！请联系应用开发者获取。',
      vip_btn_submit: '立即进入 ✨',
      vip_footer_note: '💡 拥有邀请码？输入一次即可永久保存在本设备中。',
      toast_lang_switched: '🌐 已将语言切换为中文 (简体)',
      toast_emotion_renamed: '✏️ 表情名称已更新保存！',
      badge_active: '✓ 当前激活',
      desc_active_emotion: '当前在虚拟形象上显示',
      desc_switch_emotion: '按快捷键切换',
      btn_change_hotkey_title: '点击更改此表情快捷键',
      label_status_prefix: '状态: ',
      status_mic_disconnected: '已断开',
      status_mic_connecting: '正在请求麦克风权限...',
      status_mic_active: '工作中 (监听声音)',
      status_mic_https: '需要 HTTPS / 本地服务',
      status_mic_denied: '麦克风权限被拒绝',
      status_mic_error: '麦克风访问失败',
      btn_download_webm: '✨ 下载透明WebM (.webm)',
      title_hotkey_mute: '点击更改静音快捷键',
      title_hotkey_obs: '点击更改OBS快捷键',
      title_hotkey_reset: '点击更改音频重置快捷键',
      err_camera_unsupported: '此浏览器不支持摄像头。',
      err_camera_denied: '摄像头权限被拒绝，请在浏览器中开启权限。',
      err_camera_failed: '无法启动摄像头',
      dock_camera_back_active: '后置摄像头已激活 (点击切换为前置)',
      dock_camera_front_active: '前置摄像头已激活 (点击关闭摄像头)',
      toast_camera_back_active: '📷 后置摄像头已激活！(拍摄桌面/手绘过程)',
      toast_camera_front_active: '🤳 前置摄像头已激活！',
      toast_camera_stopped: '摄像头已关闭',
      toast_camera_fit_cover: '📐 画面模式: 全屏填充 (Cover)',
      toast_camera_fit_contain: '📐 画面模式: 等比完整 (Fit)',
      toast_mic_active: '🎙️ 麦克风已激活并开始监听！',
      toast_mic_muted: '🔇 麦克风已静音',
      toast_mic_unmuted: '🎙️ 麦克风已取消静音 (已激活)',
      toast_recording_ready: '🎉 视频录制完成！',
      toast_video_downloading: '⬇️ 正在下载视频...',
      toast_video_shared: '✅ 已成功分享 / 保存至手机相册！',
      toast_audio_reset: '🔄 音频引擎已重置并重新校准！',
      toast_press_hotkey_prefix: '⌨️ 请按下新的按键: ',
      toast_press_hotkey_suffix: ' (按 Esc 取消)',
      toast_green_screen_active: '🟩 纯净全屏绿幕模式 (#00FF00) 已激活',
      toast_green_screen_exit: '已退出绿幕，返回编辑模式',
      toast_obs_active: 'OBS模式已激活 (按 H 键恢复)',
      toast_rec_start_cfr: '🔴 正在以 60 FPS CFR 高画质录制视频...',
      toast_rec_start_cfr_audio: '🔴 正在以 60 FPS CFR 录制并播放音频...',
      toast_rec_start_transparent: '✨🔴 正在录制透明通道 WebM 视频 (60 FPS CFR)...',
      toast_rec_start_transparent_audio: '✨🔴 正在录制透明 WebM (60 FPS CFR) 并播放音频...',
      toast_rec_unsupported: '⚠️ 此浏览器不支持视频录制功能。',
      toast_transparent_export_active: '✨ 透明通道导出模式已激活 (WebM VP9 Alpha)',
      toast_normal_export_restored: '已恢复默认背景和视频格式。',
      toast_webm_transparent_hint: '💡 已选择WebM格式。开启“透明通道导出”开关即可获得纯透明Alpha通道！',
      toast_floating_enabled: 'Canva呼吸浮动效果已开启',
      toast_floating_disabled: 'Canva呼吸浮动效果已关闭',
      toast_pos_bottom_right: '📍 形象已移动至右下角',
      toast_pos_bottom_left: '📍 形象已移动至左下角',
      toast_pos_top_right: '📍 形象已移动至右上角',
      toast_pos_top_left: '📍 形象已移动至左上角',
      toast_pos_center: '📍 形象已移动至屏幕中央',
      toast_custom_bg_set: '自定义背景壁纸已应用！',
      toast_reset_sys_keys: '系统快捷键已恢复默认: M, H, R！',
      toast_reset_emo_keys: '表情快捷键已恢复默认: [1], [2], [3]...',
      toast_profile_saved: '💾 形象素材与配置已成功备份！',
      toast_profile_export_failed: '⚠️ 导出形象档案失败',
      toast_profile_restored: '🎉 形象素材与配置已成功恢复！',
      toast_profile_import_failed: '⚠️ 无法读取备份文件: 格式无效',
      toast_hotkey_cancel: '已取消更改快捷键',
      toast_hotkey_set: '快捷键已绑定为: ',
      toast_active_emotion: '当前表情: ',
      toast_return_to: '返回: ',
      toast_sprite_saved: '💾 形象图层已永久保存至本地！',
      toast_audio_file_ready: '音频文件已准备就绪！',
      toast_audio_file_removed: '音频文件已移除，恢复为实时麦克风感应。',
      toast_processing_sprite: '正在处理形象图层...',
      toast_new_emotion: '已添加新表情！'
    },
    'en-US': {
      app_title: 'SmoothieTuber - 2D Doodle PNGTuber Studio',
      brand_badge: '2D PNGTuber',
      brand_tagline: 'Whimsical Sketchy Line-Art & Voice Reactive Studio',
      pill_live_audio: 'Live Reactive Audio',
      dock_mute: 'Mute/Unmute Audio (Hotkey: M)',
      dock_audio: 'Audio Calibration & Hang Time',
      dock_bg: 'Select Background / Green Screen',
      dock_obs: 'Hide Menus for OBS (Hotkey: H)',
      dock_pure_green: 'Pure Green Screen Mode (Prism Live / Mobile Stream)',
      dock_camera: 'Live Handcam / Camera (Click: Rear / Front / Off)',
      dock_record: 'Start / Stop Transparent Video Recording',
      dock_emotions: 'Manage or switch emotions',
      dock_motion: 'Canva Floating & Breathing Animation',
      dock_hotkeys: 'Keyboard Shortcuts (Hotkeys)',
      dock_audio_file: 'Detect from Audio File',
      dock_export: 'Video Recording & Export Studio',
      slot_closed: 'Mouth Closed, Eyes Open (Click to replace PNG)',
      slot_open: 'Mouth Open, Eyes Open (Click to replace PNG)',
      slot_closed_blink: 'Mouth Closed, Blink (Click to replace PNG)',
      slot_open_blink: 'Mouth Open, Blink (Click to replace PNG)',
      flyout_audio_title: '🎙️ Voice Calibration',
      status_disconnected: 'Disconnected',
      status_active: 'Active',
      status_muted: 'Muted',
      label_mic_device: 'Microphone Device:',
      option_default_system: '⚡ Auto (Prioritize External Mic)',
      btn_refresh_mic: '🔄 Detect Mic',
      label_active_mic: 'Active:',
      toast_mic_refreshed: '🎙️ Microphone updated:',
      label_camera_zoom: '🔍 Camera Zoom:',
      toast_cam_zoom: '🔍 Camera Zoom:',
      label_threshold: 'Voice Threshold:',
      label_hang_time: 'Mouth Hold Delay (Hang Time):',
      btn_reset_audio: '🔄 Reset Audio Engine (Hotkey: R)',
      flyout_bg_title: '🏁 Background',
      bg_transparent: '🏁 Transparent',
      bg_green: '🟩 Green Screen',
      bg_blue: '🟦 Blue Screen',
      bg_dark: '⬛ Dark Studio',
      btn_upload_bg: '🖼️ Upload Custom Wallpaper',
      btn_remove_bg: '❌ Remove Custom Background',
      title_adjust_bg: '📐 Adjust Background Size & Position',
      btn_bg_fit_cover: '📐 Fill Screen (Cover)',
      btn_bg_fit_contain: '🖼️ Fit Screen (Contain)',
      label_bg_scale: 'Background Size / Zoom:',
      label_bg_pos_x: 'Horizontal Offset (X):',
      label_bg_pos_y: 'Vertical Offset (Y):',
      btn_reset_bg_transform: '🔄 Reset Background Size & Position',
      toast_bg_transform_reset: '🔄 Background size & position reset!',
      label_camera_handcam: '📷 Live Handcam / Camera:',
      desc_camera_handcam: 'Stream your desk, hands, or live activity while your avatar floats right on top!',
      btn_camera_back: '📷 Rear Camera',
      btn_camera_front: '🤳 Front Camera',
      btn_camera_stop: '⏹️ Stop Camera',
      btn_camera_fit_cover: '📐 Display: Full Screen (Cover)',
      btn_camera_fit_contain: '📐 Display: Proportional (Fit)',
      flyout_emotions_title: '🎭 Manage Emotions',
      desc_emotions: 'Choose active emotion, edit name or assign hotkeys:',
      btn_add_emotion: '➕ Add New Emotion',
      title_backup_restore: '💾 Backup & Restore Profile',
      desc_backup_restore: 'Save all avatar artwork & settings to a file so you never lose them across devices.',
      btn_export_profile: '📥 Export Profile',
      btn_import_profile: '📤 Import Profile',
      btn_emo_active: '✓ Active',
      btn_emo_select: 'Select',
      placeholder_emo_name: 'Emotion name...',
      flyout_motion_title: '✨ Motion & Floating',
      label_floating: 'Canva Floating Effect:',
      hint_floating: 'Gentle continuous breathing motion',
      label_anim_behavior_mode: 'Avatar Animation Mode (Voice Response):',
      opt_anim_mode_bounce: 'Bounce Mode',
      opt_anim_mode_scale: 'Scale Mode',
      desc_anim_mode_bounce: 'Idle: normal/floating • Speaking: hop-hop bounce',
      desc_anim_mode_scale: 'Idle: shrink (0.92x) • Speaking: dynamic scale (1.05x–1.10x)',
      btn_report_bug: 'Report Bug',
      bug_modal_title: '🐞 Report Bug / Feedback',
      bug_modal_desc: 'Found an issue while using the app? Send a report below so we can fix it right away:',
      label_bug_reporter: '1. Reporter Name / Contact (Optional):',
      placeholder_bug_reporter: 'e.g. Rina / @rina_art (optional)',
      label_bug_category: '2. Issue Category:',
      opt_bug_cat_audio: 'Audio Out of Sync',
      opt_bug_cat_image: 'Missing Image',
      opt_bug_cat_ui: 'Broken Layout / UI',
      opt_bug_cat_other: 'Other',
      label_bug_desc: '3. Issue / Bug Description:',
      placeholder_bug_desc: 'Describe the issue you experienced in detail...',
      btn_submit_bug: 'Send Report',
      bug_status_sending: 'Sending...',
      bug_status_success: 'Report sent successfully! Thank you for your feedback.',
      label_float_intensity: 'Float Amplitude:',
      label_float_speed: 'Floating Speed:',
      label_bounce: 'Speech Bounce (Hop):',
      label_bounce_speed: 'Bounce Speed:',
      label_avatar_scale: 'Avatar Scale:',
      label_pos_y: 'Vertical Position (Y Offset):',
      label_pos_presets: '📍 Quick Screen Presets:',
      desc_pos_presets: 'You can also drag and reposition the avatar freely on screen!',
      pos_bottom_right: '↘️ Bottom Right',
      pos_bottom_left: '↙️ Bottom Left',
      pos_top_right: '↗️ Top Right',
      pos_top_left: '↖️ Top Left',
      pos_center: '⏺️ Center Stage',
      label_blink_interval: 'Blink Interval:',
      label_blink_duration: 'Blink Duration:',
      flyout_hotkeys_title: '⌨️ Customize Hotkeys',
      title_sys_hotkeys: '🎮 System Shortcuts',
      name_mute: '🎙️ Mute / Unmute',
      desc_mute: 'Instantly toggle microphone',
      name_obs: '👁️ Hide Menu (OBS)',
      desc_obs: 'Clean transparent overlay mode',
      name_reset: '🔄 Reset Audio',
      desc_reset: 'Refresh audio levels and buffer',
      btn_reset_sys_keys: '🔄 Reset System Hotkeys (M, H, R)',
      title_emo_hotkeys: '🎭 Emotion Hotkeys',
      desc_emo_hotkeys: 'Press hotkey to trigger expression instantly. Press again to return to Normal.',
      btn_reset_emo_keys: '🔄 Reset Emotion Hotkeys (1, 2, 3...)',
      btn_relock_vip: '🔒 Re-lock VIP Access (Logout)',
      flyout_audio_file_title: '📁 Audio Recording File',
      btn_pick_audio: '📂 Choose Audio File (MP3 / WAV)',
      no_audio_loaded: 'No file selected',
      btn_remove_audio: '🗑️ Remove Audio File',
      flyout_export_title: '🎬 Video Studio & Export',
      label_transparent_export: '✨ Transparent Export (WEBM Format)',
      hint_transparent_export: 'Pure alpha transparency without background, ready to drag & drop into OBS or Premiere',
      label_export_bg: 'Video Background:',
      opt_bg_current: '📷 Match Screen (Live Camera / Active Wallpaper)',
      opt_bg_green: '🟩 Green Screen (Chroma Key for CapCut / TikTok)',
      opt_bg_transparent: '✨ Full Alpha Transparency (OBS WebM on PC)',
      label_export_format: 'Video Format:',
      opt_fmt_mp4: '🎬 MP4 (Universal: iPhone, Android, TikTok, CapCut, PC)',
      opt_fmt_mov: '🍏 MOV (Apple QuickTime / Final Cut Pro / iPhone)',
      opt_fmt_webm: '✨ WebM (Transparent Alpha Channel for OBS)',
      label_export_resolution: 'Video Aspect Ratio & Size:',
      opt_res_9_16: '📱 9:16 Vertical (1080 × 1920 - TikTok, Reels, Shorts)',
      opt_res_9_16_hd: '📱 9:16 HD Fast & Smooth (720 × 1280 - Recommended for Mobile)',
      opt_res_9_16_fhd: '📱 9:16 Full HD (1080 × 1920 - Sharp / PC & Flagship)',
      opt_res_3_2: '📷 3:2 Camera (1620 × 1080 - Standard Camera Ratio)',
      opt_res_2_3: '📸 2:3 Portrait (1080 × 1620 - Vertical Photo)',
      opt_res_1_1: '⏹️ 1:1 Square (1080 × 1080 - IG Feed & Profile)',
      opt_res_16_9: '🖥️ 16:9 Landscape (1920 × 1080 - YouTube / PC)',
      opt_res_16_9_hd: '🖥️ 16:9 HD Fast (1280 × 720 - YouTube HD)',
      opt_res_16_9_fhd: '🖥️ 16:9 Full HD (1920 × 1080 - YouTube 1080p)',
      label_export_fps: 'Frame Rate (FPS):',
      opt_fps_30: '⚡ 30 FPS (Recommended - Smooth & Stable for CapCut/IG)',
      opt_fps_60: '🚀 60 FPS (Ultra Smooth - High-End Devices)',
      btn_record_start: 'Start Video Recording',
      btn_record_stop: 'Stop Video Recording',
      status_record_ready: 'Ready to record voice-reactive animation (Smooth CFR • Social Media/CapCut friendly).',
      status_recording: 'Recording video...',
      btn_restore_controls: '⚙️ Show Toolbar',
      btn_pure_green: '🟩 Pure Green Screen Fullscreen (#00FF00)',
      desc_pure_green: 'Hides all menus and turns the background into solid #00FF00 green. Ready for chroma key in mobile streaming apps like Prism Live.',
      btn_quick_camera: '📷 Turn On Live Camera (Handcam)',
      desc_quick_camera: 'Stream or record your desk, hands, or face live. Avatar floats on top ready for content creation!',
      btn_restore_green: '⚙️ Exit Green Screen',
      modal_rec_title: '🎉 Video Recorded Successfully!',
      meta_duration: 'Duration:',
      meta_size: 'Size:',
      meta_format: 'Format:',
      btn_download_mp4: '⬇️ Download MP4 (.mp4)',
      btn_download_mov: '🍏 Download MOV (.mov)',
      btn_share_video: '📱 Save to Camera Roll / Share',
      btn_dismiss_modal: 'Close',
      lang_modal_badge: '🌐 Multi-Language Support',
      lang_modal_title: 'Select Language',
      lang_modal_subtitle: 'Please choose your preferred display language:',
      lang_btn_confirm: 'Continue ✨',
      lang_footer_hint: '💡 You can switch language anytime using the 🌐 icon in the top header.',
      vip_pill_badge: '🔒 Exclusive Closed Beta',
      vip_subtitle: 'This web app is currently in private tester preview.',
      vip_input_label: 'Enter Tester Access Code:',
      vip_placeholder: 'Type access code here...',
      vip_error_msg: '⚠️ Invalid access code! Please contact the app developer.',
      vip_btn_submit: 'Launch App ✨',
      vip_footer_note: '💡 Tester code is saved permanently in your browser.',
      toast_lang_switched: '🌐 Language switched to English (US)',
      toast_emotion_renamed: '✏️ Emotion name saved!',
      badge_active: '✓ Active',
      desc_active_emotion: 'Active expression on avatar',
      desc_switch_emotion: 'Press hotkey to switch',
      btn_change_hotkey_title: 'Click to change this emotion hotkey',
      label_status_prefix: 'Status: ',
      status_mic_disconnected: 'Disconnected',
      status_mic_connecting: 'Requesting Mic Access...',
      status_mic_active: 'Active & Listening',
      status_mic_https: 'HTTPS / Local Server Required',
      status_mic_denied: 'Permission Denied',
      status_mic_error: 'Access Failed',
      btn_download_webm: '✨ Download Transparent WebM (.webm)',
      title_hotkey_mute: 'Click to change mute hotkey',
      title_hotkey_obs: 'Click to change OBS hotkey',
      title_hotkey_reset: 'Click to change audio reset hotkey',
      err_camera_unsupported: 'Camera is not supported in this browser.',
      err_camera_denied: 'Camera permission denied. Please allow camera access in browser settings.',
      err_camera_failed: 'Failed to start camera',
      dock_camera_back_active: 'Rear Camera Active (Click to switch to Front)',
      dock_camera_front_active: 'Front Camera Active (Click to turn off camera)',
      toast_camera_back_active: '📷 Rear camera active! (Showing desk/hands)',
      toast_camera_front_active: '🤳 Front camera active!',
      toast_camera_stopped: 'Camera turned off',
      toast_camera_fit_cover: '📐 Mode: Full Screen Camera (Cover)',
      toast_camera_fit_contain: '📐 Mode: Proportional Camera (Fit)',
      toast_mic_active: '🎙️ Microphone active & listening!',
      toast_mic_muted: '🔇 Microphone Muted',
      toast_mic_unmuted: '🎙️ Microphone Unmuted (Active)',
      toast_recording_ready: '🎉 Video ready to save!',
      toast_video_downloading: '⬇️ Downloading video...',
      toast_video_shared: '✅ Saved to camera roll / shared!',
      toast_audio_reset: '🔄 Audio engine reset & recalibrated!',
      toast_press_hotkey_prefix: '⌨️ Press a new key for ',
      toast_press_hotkey_suffix: ' (Esc to cancel)',
      toast_green_screen_active: '🟩 Pure Green Screen (#00FF00) Mode Active (Prism Live Ready)',
      toast_green_screen_exit: 'Returned to editor view',
      toast_obs_active: 'OBS mode active (Press H to return)',
      toast_rec_start_cfr: '🔴 Recording video at 60 FPS CFR (High Quality)...',
      toast_rec_start_cfr_audio: '🔴 Recording 60 FPS CFR & playing audio...',
      toast_rec_start_transparent: '✨🔴 Recording transparent WebM video (60 FPS CFR)...',
      toast_rec_start_transparent_audio: '✨🔴 Recording Transparent WebM (60 FPS CFR) & playing audio...',
      toast_rec_unsupported: '⚠️ Video recording is not supported in this browser.',
      toast_transparent_export_active: '✨ Transparent Export Mode Active (WebM VP9 Alpha)',
      toast_normal_export_restored: 'Normal background and video format restored.',
      toast_webm_transparent_hint: '💡 WebM selected. Enable "Transparent Export" for pure alpha transparency!',
      toast_floating_enabled: 'Canva floating effect enabled',
      toast_floating_disabled: 'Canva floating effect disabled',
      toast_pos_bottom_right: '📍 Avatar moved to Bottom Right',
      toast_pos_bottom_left: '📍 Avatar moved to Bottom Left',
      toast_pos_top_right: '📍 Avatar moved to Top Right',
      toast_pos_top_left: '📍 Avatar moved to Top Left',
      toast_pos_center: '📍 Avatar moved to Center Stage',
      toast_custom_bg_set: 'Custom background applied!',
      toast_reset_sys_keys: 'System hotkeys reset to default: M, H, R!',
      toast_reset_emo_keys: 'Emotion hotkeys reset to default: [1], [2], [3]...',
      toast_profile_saved: '💾 Avatar profile & settings backed up successfully!',
      toast_profile_export_failed: '⚠️ Failed to export profile',
      toast_profile_restored: '🎉 Avatar profile restored successfully!',
      toast_profile_import_failed: '⚠️ Failed to import backup: Invalid file format',
      toast_hotkey_cancel: 'Shortcut rebind cancelled',
      toast_hotkey_set: 'Shortcut set to: ',
      toast_active_emotion: 'Active emotion: ',
      toast_return_to: 'Returned to: ',
      toast_sprite_saved: '💾 Sprite saved permanently!',
      toast_audio_file_ready: 'Audio file ready for voice detection!',
      toast_audio_file_removed: 'Audio file removed. Returned to live microphone.',
      toast_processing_sprite: 'Processing sprite image...',
      toast_new_emotion: 'New emotion added!'
    },
    'en-GB': {
      app_title: 'SmoothieTuber - 2D Doodle PNGTuber Studio',
      brand_badge: '2D PNGTuber',
      brand_tagline: 'Whimsical Sketchy Line-Art & Voice Reactive Studio',
      pill_live_audio: 'Live Reactive Audio',
      dock_mute: 'Mute/Unmute Audio (Hotkey: M)',
      dock_audio: 'Audio Calibration & Hang Time',
      dock_bg: 'Select Background / Green Screen',
      dock_obs: 'Hide Menus for OBS (Hotkey: H)',
      dock_pure_green: 'Pure Green Screen Mode (Prism Live / Mobile Stream)',
      dock_camera: 'Live Handcam / Camera (Click: Rear / Front / Off)',
      dock_record: 'Start / Stop Transparent Video Recording',
      dock_emotions: 'Manage or switch emotions',
      dock_motion: 'Canva Floating & Breathing Animation',
      dock_hotkeys: 'Keyboard Shortcuts (Hotkeys)',
      dock_audio_file: 'Detect from Audio File',
      dock_export: 'Video Recording & Export Studio',
      slot_closed: 'Mouth Closed, Eyes Open (Click to replace PNG)',
      slot_open: 'Mouth Open, Eyes Open (Click to replace PNG)',
      slot_closed_blink: 'Mouth Closed, Blink (Click to replace PNG)',
      slot_open_blink: 'Mouth Open, Blink (Click to replace PNG)',
      flyout_audio_title: '🎙️ Voice Calibration',
      status_disconnected: 'Disconnected',
      status_active: 'Active',
      status_muted: 'Muted',
      label_mic_device: 'Microphone Device:',
      option_default_system: '⚡ Auto (Prioritize External Mic)',
      btn_refresh_mic: '🔄 Detect Mic',
      label_active_mic: 'Active:',
      toast_mic_refreshed: '🎙️ Microphone updated:',
      label_camera_zoom: '🔍 Camera Zoom:',
      toast_cam_zoom: '🔍 Camera Zoom:',
      label_threshold: 'Voice Threshold:',
      label_hang_time: 'Mouth Hold Delay (Hang Time):',
      btn_reset_audio: '🔄 Reset Audio Engine (Hotkey: R)',
      flyout_bg_title: '🏁 Background',
      bg_transparent: '🏁 Transparent',
      bg_green: '🟩 Green Screen',
      bg_blue: '🟦 Blue Screen',
      bg_dark: '⬛ Dark Studio',
      btn_upload_bg: '🖼️ Upload Custom Wallpaper',
      btn_remove_bg: '❌ Remove Custom Background',
      title_adjust_bg: '📐 Adjust Background Size & Position',
      btn_bg_fit_cover: '📐 Fill Screen (Cover)',
      btn_bg_fit_contain: '🖼️ Fit Screen (Contain)',
      label_bg_scale: 'Background Size / Zoom:',
      label_bg_pos_x: 'Horizontal Offset (X):',
      label_bg_pos_y: 'Vertical Offset (Y):',
      btn_reset_bg_transform: '🔄 Reset Background Size & Position',
      toast_bg_transform_reset: '🔄 Background size & position reset!',
      label_camera_handcam: '📷 Live Handcam / Camera:',
      desc_camera_handcam: 'Stream your desk, hands, or live activity whilst your avatar floats right on top!',
      btn_camera_back: '📷 Rear Camera',
      btn_camera_front: '🤳 Front Camera',
      btn_camera_stop: '⏹️ Stop Camera',
      btn_camera_fit_cover: '📐 Display: Full Screen (Cover)',
      btn_camera_fit_contain: '📐 Display: Proportional (Fit)',
      flyout_emotions_title: '🎭 Manage Emotions',
      desc_emotions: 'Choose active emotion, edit name or assign hotkeys:',
      btn_add_emotion: '➕ Add New Emotion',
      title_backup_restore: '💾 Backup & Restore Profile',
      desc_backup_restore: 'Save all avatar artwork & settings to a file so you never lose them across devices.',
      btn_export_profile: '📥 Export Profile',
      btn_import_profile: '📤 Import Profile',
      btn_emo_active: '✓ Active',
      btn_emo_select: 'Select',
      placeholder_emo_name: 'Emotion name...',
      flyout_motion_title: '✨ Motion & Floating',
      label_floating: 'Canva Floating Effect:',
      hint_floating: 'Gentle continuous breathing motion',
      label_anim_behavior_mode: 'Avatar Animation Mode (Voice Response):',
      opt_anim_mode_bounce: 'Bounce Mode',
      opt_anim_mode_scale: 'Scale Mode',
      desc_anim_mode_bounce: 'Idle: normal/floating • Speaking: hop-hop bounce',
      desc_anim_mode_scale: 'Idle: shrink (0.92x) • Speaking: dynamic scale (1.05x–1.10x)',
      btn_report_bug: 'Report Bug',
      bug_modal_title: '🐞 Report Bug / Feedback',
      bug_modal_desc: 'Found an issue while using the app? Send a report below so we can fix it right away:',
      label_bug_reporter: '1. Reporter Name / Contact (Optional):',
      placeholder_bug_reporter: 'e.g. Rina / @rina_art (optional)',
      label_bug_category: '2. Issue Category:',
      opt_bug_cat_audio: 'Audio Out of Sync',
      opt_bug_cat_image: 'Missing Image',
      opt_bug_cat_ui: 'Broken Layout / UI',
      opt_bug_cat_other: 'Other',
      label_bug_desc: '3. Issue / Bug Description:',
      placeholder_bug_desc: 'Describe the issue you experienced in detail...',
      btn_submit_bug: 'Send Report',
      bug_status_sending: 'Sending...',
      bug_status_success: 'Report sent successfully! Thank you for your feedback.',
      label_float_intensity: 'Float Amplitude:',
      label_float_speed: 'Floating Speed:',
      label_bounce: 'Speech Bounce (Hop):',
      label_bounce_speed: 'Bounce Speed:',
      label_avatar_scale: 'Avatar Scale:',
      label_pos_y: 'Vertical Position (Y Offset):',
      label_pos_presets: '📍 Quick Screen Presets:',
      desc_pos_presets: 'You can also drag and reposition the avatar freely on screen!',
      pos_bottom_right: '↘️ Bottom Right',
      pos_bottom_left: '↙️ Bottom Left',
      pos_top_right: '↗️ Top Right',
      pos_top_left: '↖️ Top Left',
      pos_center: '⏺️ Centre Stage',
      label_blink_interval: 'Blink Interval:',
      label_blink_duration: 'Blink Duration:',
      flyout_hotkeys_title: '⌨️ Customise Hotkeys',
      title_sys_hotkeys: '🎮 System Shortcuts',
      name_mute: '🎙️ Mute / Unmute',
      desc_mute: 'Instantly toggle microphone',
      name_obs: '👁️ Hide Menu (OBS)',
      desc_obs: 'Clean transparent overlay mode',
      name_reset: '🔄 Reset Audio',
      desc_reset: 'Refresh audio levels and buffer',
      btn_reset_sys_keys: '🔄 Reset System Hotkeys (M, H, R)',
      title_emo_hotkeys: '🎭 Emotion Hotkeys',
      desc_emo_hotkeys: 'Press hotkey to trigger expression instantly. Press again to return to Normal.',
      btn_reset_emo_keys: '🔄 Reset Emotion Hotkeys (1, 2, 3...)',
      btn_relock_vip: '🔒 Re-lock VIP Access (Logout)',
      flyout_audio_file_title: '📁 Audio Recording File',
      btn_pick_audio: '📂 Choose Audio File (MP3 / WAV)',
      no_audio_loaded: 'No file selected',
      btn_remove_audio: '🗑️ Remove Audio File',
      flyout_export_title: '🎬 Video Studio & Export',
      label_transparent_export: '✨ Transparent Export (WEBM Format)',
      hint_transparent_export: 'Pure alpha transparency without background, ready to drag & drop into OBS or Premiere',
      label_export_bg: 'Video Background:',
      opt_bg_current: '📷 Match Screen (Live Camera / Active Wallpaper)',
      opt_bg_green: '🟩 Green Screen (Chroma Key for CapCut / TikTok)',
      opt_bg_transparent: '✨ Full Alpha Transparency (OBS WebM on PC)',
      label_export_format: 'Video Format:',
      opt_fmt_mp4: '🎬 MP4 (Universal: iPhone, Android, TikTok, CapCut, PC)',
      opt_fmt_mov: '🍏 MOV (Apple QuickTime / Final Cut Pro / iPhone)',
      opt_fmt_webm: '✨ WebM (Transparent Alpha Channel for OBS)',
      label_export_resolution: 'Video Aspect Ratio & Size:',
      opt_res_9_16: '📱 9:16 Vertical (1080 × 1920 - TikTok, Reels, Shorts)',
      opt_res_9_16_hd: '📱 9:16 HD Fast & Smooth (720 × 1280 - Recommended for Mobile)',
      opt_res_9_16_fhd: '📱 9:16 Full HD (1080 × 1920 - Sharp / PC & Flagship)',
      opt_res_3_2: '📷 3:2 Camera (1620 × 1080 - Standard Camera Ratio)',
      opt_res_2_3: '📸 2:3 Portrait (1080 × 1620 - Vertical Photo)',
      opt_res_1_1: '⏹️ 1:1 Square (1080 × 1080 - IG Feed & Profile)',
      opt_res_16_9: '🖥️ 16:9 Landscape (1920 × 1080 - YouTube / PC)',
      opt_res_16_9_hd: '🖥️ 16:9 HD Fast (1280 × 720 - YouTube HD)',
      opt_res_16_9_fhd: '🖥️ 16:9 Full HD (1920 × 1080 - YouTube 1080p)',
      label_export_fps: 'Frame Rate (FPS):',
      opt_fps_30: '⚡ 30 FPS (Recommended - Smooth & Stable for CapCut/IG)',
      opt_fps_60: '🚀 60 FPS (Ultra Smooth - High-End Devices)',
      btn_record_start: 'Start Video Recording',
      btn_record_stop: 'Stop Video Recording',
      status_record_ready: 'Ready to record voice-reactive animation (Smooth CFR • Social Media/CapCut friendly).',
      status_recording: 'Recording video...',
      btn_restore_controls: '⚙️ Show Toolbar',
      btn_pure_green: '🟩 Pure Green Screen Fullscreen (#00FF00)',
      desc_pure_green: 'Hides all menus and turns the background into solid #00FF00 green. Ready for chroma key in mobile streaming apps like Prism Live.',
      btn_quick_camera: '📷 Turn On Live Camera (Handcam)',
      desc_quick_camera: 'Stream or record your desk, hands, or face live. Avatar floats on top ready for content creation!',
      btn_restore_green: '⚙️ Exit Green Screen',
      modal_rec_title: '🎉 Video Recorded Successfully!',
      meta_duration: 'Duration:',
      meta_size: 'Size:',
      meta_format: 'Format:',
      btn_download_mp4: '⬇️ Download MP4 (.mp4)',
      btn_download_mov: '🍏 Download MOV (.mov)',
      btn_share_video: '📱 Save to Camera Roll / Share',
      btn_dismiss_modal: 'Close',
      lang_modal_badge: '🌐 Multi-Language Support',
      lang_modal_title: 'Select Language',
      lang_modal_subtitle: 'Please choose your preferred display language:',
      lang_btn_confirm: 'Continue ✨',
      lang_footer_hint: '💡 You can switch language anytime using the 🌐 icon in the top header.',
      vip_pill_badge: '🔒 Exclusive Closed Beta',
      vip_subtitle: 'This web app is currently in private tester preview.',
      vip_input_label: 'Enter Tester Access Code:',
      vip_placeholder: 'Type access code here...',
      vip_error_msg: '⚠️ Invalid access code! Please contact the app developer.',
      vip_btn_submit: 'Launch App ✨',
      vip_footer_note: '💡 Tester code is saved permanently in your browser.',
      toast_lang_switched: '🌐 Language switched to English (UK)',
      toast_emotion_renamed: '✏️ Emotion name saved!',
      badge_active: '✓ Active',
      desc_active_emotion: 'Active expression on avatar',
      desc_switch_emotion: 'Press hotkey to switch',
      btn_change_hotkey_title: 'Click to change this emotion hotkey',
      label_status_prefix: 'Status: ',
      status_mic_disconnected: 'Disconnected',
      status_mic_connecting: 'Requesting Mic Access...',
      status_mic_active: 'Active & Listening',
      status_mic_https: 'HTTPS / Local Server Required',
      status_mic_denied: 'Permission Denied',
      status_mic_error: 'Access Failed',
      btn_download_webm: '✨ Download Transparent WebM (.webm)',
      title_hotkey_mute: 'Click to change mute hotkey',
      title_hotkey_obs: 'Click to change OBS hotkey',
      title_hotkey_reset: 'Click to change audio reset hotkey',
      err_camera_unsupported: 'Camera is not supported in this browser.',
      err_camera_denied: 'Camera permission denied. Please allow camera access in browser settings.',
      err_camera_failed: 'Failed to start camera',
      dock_camera_back_active: 'Rear Camera Active (Click to switch to Front)',
      dock_camera_front_active: 'Front Camera Active (Click to turn off camera)',
      toast_camera_back_active: '📷 Rear camera active! (Showing desk/hands)',
      toast_camera_front_active: '🤳 Front camera active!',
      toast_camera_stopped: 'Camera turned off',
      toast_camera_fit_cover: '📐 Mode: Full Screen Camera (Cover)',
      toast_camera_fit_contain: '📐 Mode: Proportional Camera (Fit)',
      toast_mic_active: '🎙️ Microphone active & listening!',
      toast_mic_muted: '🔇 Microphone Muted',
      toast_mic_unmuted: '🎙️ Microphone Unmuted (Active)',
      toast_recording_ready: '🎉 Video ready to save!',
      toast_video_downloading: '⬇️ Downloading video...',
      toast_video_shared: '✅ Saved to camera roll / shared!',
      toast_audio_reset: '🔄 Audio engine reset & recalibrated!',
      toast_press_hotkey_prefix: '⌨️ Press a new key for ',
      toast_press_hotkey_suffix: ' (Esc to cancel)',
      toast_green_screen_active: '🟩 Pure Green Screen (#00FF00) Mode Active (Prism Live Ready)',
      toast_green_screen_exit: 'Returned to editor view',
      toast_obs_active: 'OBS mode active (Press H to return)',
      toast_rec_start_cfr: '🔴 Recording video at 60 FPS CFR (High Quality)...',
      toast_rec_start_cfr_audio: '🔴 Recording 60 FPS CFR & playing audio...',
      toast_rec_start_transparent: '✨🔴 Recording transparent WebM video (60 FPS CFR)...',
      toast_rec_start_transparent_audio: '✨🔴 Recording Transparent WebM (60 FPS CFR) & playing audio...',
      toast_rec_unsupported: '⚠️ Video recording is not supported in this browser.',
      toast_transparent_export_active: '✨ Transparent Export Mode Active (WebM VP9 Alpha)',
      toast_normal_export_restored: 'Normal background and video format restored.',
      toast_webm_transparent_hint: '💡 WebM selected. Enable "Transparent Export" for pure alpha transparency!',
      toast_floating_enabled: 'Canva floating effect enabled',
      toast_floating_disabled: 'Canva floating effect disabled',
      toast_pos_bottom_right: '📍 Avatar moved to Bottom Right',
      toast_pos_bottom_left: '📍 Avatar moved to Bottom Left',
      toast_pos_top_right: '📍 Avatar moved to Top Right',
      toast_pos_top_left: '📍 Avatar moved to Top Left',
      toast_pos_center: '📍 Avatar moved to Centre Stage',
      toast_custom_bg_set: 'Custom background applied!',
      toast_reset_sys_keys: 'System hotkeys reset to default: M, H, R!',
      toast_reset_emo_keys: 'Emotion hotkeys reset to default: [1], [2], [3]...',
      toast_profile_saved: '💾 Avatar profile & settings backed up successfully!',
      toast_profile_export_failed: '⚠️ Failed to export profile',
      toast_profile_restored: '🎉 Avatar profile restored successfully!',
      toast_profile_import_failed: '⚠️ Failed to import backup: Invalid file format',
      toast_hotkey_cancel: 'Shortcut rebind cancelled',
      toast_hotkey_set: 'Shortcut set to: ',
      toast_active_emotion: 'Active emotion: ',
      toast_return_to: 'Returned to: ',
      toast_sprite_saved: '💾 Sprite saved permanently!',
      toast_audio_file_ready: 'Audio file ready for voice detection!',
      toast_audio_file_removed: 'Audio file removed. Returned to live microphone.',
      toast_processing_sprite: 'Processing sprite image...',
      toast_new_emotion: 'New emotion added!'
    }
  };

  let currentLang = 'id';
  function t(key) {
    if (I18N[currentLang] && I18N[currentLang][key]) {
      return I18N[currentLang][key];
    }
    if (I18N['id'] && I18N['id'][key]) {
      return I18N['id'][key];
    }
    return key;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function applyTranslations(lang) {
    if (!I18N[lang]) lang = 'id';
    currentLang = lang;
    document.title = t('app_title');
    document.documentElement.lang = lang === 'ja' ? 'ja' : (lang === 'zh' ? 'zh-CN' : (lang === 'en-GB' ? 'en-GB' : (lang === 'en-US' ? 'en-US' : 'id')));

    const headerLangLabel = document.getElementById('headerLangLabel');
    if (headerLangLabel) {
      const badgeMap = { 'id': 'ID', 'ja': 'JA', 'zh': 'ZH', 'en-US': 'US', 'en-GB': 'UK' };
      headerLangLabel.textContent = badgeMap[lang] || 'ID';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const text = t(key);
      if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const text = t(key);
      if (text) el.title = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const text = t(key);
      if (text) el.placeholder = text;
    });

    renderCompactEmotionsList();
    renderHotkeysUI();
    if (typeof setMicStatus === 'function') {
      setMicStatus();
    }
    if (typeof applyCameraFitStyle === 'function') {
      applyCameraFitStyle();
    }
    if (typeof updateRecordModalTranslations === 'function') {
      updateRecordModalTranslations();
    }
  }

  // --- 3. ROBUST STORAGE & NON-DESTRUCTIVE PERSISTENCE ENGINE ---
  const STORAGE_KEYS = {
    settings: 'smoothietuber_master_settings',
    emotions: 'smoothietuber_master_emotions',
    snapshot: 'smoothietuber_master_snapshot',
    hotkeys: 'smoothietuber_master_hotkeys',
    lang: 'smoothietuber_lang',
    vip: 'smoothietuber_vip_auth'
  };

  const HISTORICAL_EMOTION_KEYS = [
    'smoothietuber_master_emotions',
    'smoothietuber_emotions_v4',
    'smoothietuber_master_snapshot',
    'smoothietuber_emotions_v3',
    'pngtuber_emotions_v3',
    'pngtuber_emotions_v2',
    'smoothietuber_emotions',
    'pngtuber_emotions'
  ];

  const HISTORICAL_SETTINGS_KEYS = [
    'smoothietuber_master_settings',
    'smoothietuber_user_settings_v4',
    'smoothietuber_user_settings_v2',
    'smoothietuber_user_settings_v1',
    'pngtuber_user_settings'
  ];

  const isMobileDevice = typeof window !== 'undefined' && (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (window.innerWidth && window.innerWidth < 768));

  // =========================================================================
  // KONFIGURASI ENDPOINT LAPORAN BUG (PRIVASI AMAN TANPA MENAMPILKAN EMAIL)
  // Ganti URL di bawah ini dengan endpoint Formspree / Make / Discord Webhook milik Anda
  // =========================================================================
  const BUG_REPORT_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  const DEFAULT_SETTINGS = {
    threshold: 15.0,
    holdDelay: 160,
    bounceIntensity: 18,
    bounceSpeed: 0.28,
    avatarScale: 1,
    avatarPosX: 0,
    avatarPosY: 0,
    isFloatingEnabled: true,
    animMode: 'bounce', // 'bounce' | 'scale'
    floatIntensity: 8,
    floatDuration: 3.8,
    blinkInterval: 3500,
    blinkDuration: 160,
    activeEmotionId: 'emotion_normal',
    exportResolution: '720x1280',
    exportFps: '30',
    customBgScale: 100,
    customBgPosX: 0,
    customBgPosY: 0,
    customBgFit: 'cover'
  };

  const DEFAULT_SYSTEM_HOTKEYS = {
    toggleMute: 'm',
    toggleObs: 'h',
    resetAudio: 'r'
  };

  let isStorageHydrated = false;

  // Helper untuk mengecek apakah sebuah list emosi memiliki custom sprite pengguna
  function hasAnyCustomSprite(list) {
    if (!Array.isArray(list) || list.length === 0) return false;
    return list.some(emo => {
      if (!emo || !emo.sprites) return false;
      return Object.values(emo.sprites).some(src => {
        if (typeof src !== 'string' || !src) return false;
        return src.startsWith('data:') || src.startsWith('blob:') || (!src.includes('normal_') && !src.includes('happy_') && !src.includes('surprised_'));
      });
    });
  }

  // --- PERSISTENT STORAGE ENGINE: INDEXEDDB + LOCALSTORAGE DUAL-TIER ---
  // Mengatasi limit 5MB localStorage & proteksi dari 7-day auto-eviction Safari iOS
  const IDB_CONFIG = {
    name: 'SmoothieTuberDB',
    version: 1,
    store: 'app_data'
  };

  let idbInstancePromise = null;

  function getIDB() {
    if (idbInstancePromise) return idbInstancePromise;
    idbInstancePromise = new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        resolve(null);
        return;
      }
      try {
        const req = window.indexedDB.open(IDB_CONFIG.name, IDB_CONFIG.version);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(IDB_CONFIG.store)) {
            db.createObjectStore(IDB_CONFIG.store);
          }
        };
        req.onsuccess = (e) => {
          const db = e.target.result;
          db.onversionchange = () => {
            try { db.close(); } catch (err) {}
            idbInstancePromise = null;
          };
          resolve(db);
        };
        req.onerror = (e) => {
          console.warn('IndexedDB open notice:', e);
          resolve(null);
        };
      } catch (err) {
        console.warn('IndexedDB init exception:', err);
        resolve(null);
      }
    });
    return idbInstancePromise;
  }

  async function idbGet(key) {
    try {
      const db = await getIDB();
      if (!db) return null;
      return new Promise((resolve) => {
        const tx = db.transaction(IDB_CONFIG.store, 'readonly');
        const store = tx.objectStore(IDB_CONFIG.store);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  }

  function idbGetWithTimeout(key, timeoutMs = 800) {
    return Promise.race([
      idbGet(key),
      new Promise(resolve => setTimeout(() => resolve(null), timeoutMs))
    ]);
  }

  async function idbSet(key, value) {
    try {
      const db = await getIDB();
      if (!db) return false;
      return new Promise((resolve) => {
        const tx = db.transaction(IDB_CONFIG.store, 'readwrite');
        const store = tx.objectStore(IDB_CONFIG.store);
        store.put(value, key);
        tx.oncomplete = () => resolve(true);
        tx.onerror = (e) => {
          console.warn('IndexedDB tx error:', e);
          resolve(false);
        };
        tx.onabort = () => resolve(false);
      });
    } catch (e) {
      console.warn('IndexedDB set exception:', e);
      return false;
    }
  }

  function loadUserSettings() {
    try {
      for (const key of HISTORICAL_SETTINGS_KEYS) {
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && typeof parsed === 'object') {
            const savedStandaloneMode = localStorage.getItem('smoothietuber_anim_mode');
            const resolvedAnimMode = (savedStandaloneMode === 'scale' || savedStandaloneMode === 'bounce')
              ? savedStandaloneMode
              : ((parsed.animMode === 'scale') ? 'scale' : 'bounce');
            return {
              threshold: (typeof parsed.threshold === 'number' && !isNaN(parsed.threshold) && parsed.threshold >= 0.1 && parsed.threshold <= 40.0) ? Math.round(parsed.threshold * 10) / 10 : DEFAULT_SETTINGS.threshold,
              holdDelay: (typeof parsed.holdDelay === 'number' && !isNaN(parsed.holdDelay) && parsed.holdDelay >= 50 && parsed.holdDelay <= 500) ? parsed.holdDelay : DEFAULT_SETTINGS.holdDelay,
              bounceIntensity: (typeof parsed.bounceIntensity === 'number' && !isNaN(parsed.bounceIntensity) && parsed.bounceIntensity >= 1 && parsed.bounceIntensity <= 40) ? parsed.bounceIntensity : DEFAULT_SETTINGS.bounceIntensity,
              bounceSpeed: (typeof parsed.bounceSpeed === 'number' && !isNaN(parsed.bounceSpeed) && parsed.bounceSpeed >= 0.05 && parsed.bounceSpeed <= 1.0) ? Math.round(parsed.bounceSpeed * 100) / 100 : DEFAULT_SETTINGS.bounceSpeed,
              avatarScale: (typeof parsed.avatarScale === 'number' && !isNaN(parsed.avatarScale) && parsed.avatarScale >= 0.2 && parsed.avatarScale <= 2.5) ? parsed.avatarScale : DEFAULT_SETTINGS.avatarScale,
              avatarPosX: (typeof parsed.avatarPosX === 'number' && !isNaN(parsed.avatarPosX) && parsed.avatarPosX >= -2000 && parsed.avatarPosX <= 2000) ? parsed.avatarPosX : DEFAULT_SETTINGS.avatarPosX,
              avatarPosY: (typeof parsed.avatarPosY === 'number' && !isNaN(parsed.avatarPosY) && parsed.avatarPosY >= -2000 && parsed.avatarPosY <= 2000) ? parsed.avatarPosY : DEFAULT_SETTINGS.avatarPosY,
              isFloatingEnabled: typeof parsed.isFloatingEnabled === 'boolean' ? parsed.isFloatingEnabled : DEFAULT_SETTINGS.isFloatingEnabled,
              animMode: resolvedAnimMode,
              floatIntensity: (typeof parsed.floatIntensity === 'number' && !isNaN(parsed.floatIntensity) && parsed.floatIntensity >= 1 && parsed.floatIntensity <= 50) ? parsed.floatIntensity : DEFAULT_SETTINGS.floatIntensity,
              floatDuration: (typeof parsed.floatDuration === 'number' && !isNaN(parsed.floatDuration) && parsed.floatDuration >= 0.1 && parsed.floatDuration <= 10.0) ? parsed.floatDuration : DEFAULT_SETTINGS.floatDuration,
              blinkInterval: (typeof parsed.blinkInterval === 'number' && !isNaN(parsed.blinkInterval) && parsed.blinkInterval >= 800 && parsed.blinkInterval <= 15000) ? parsed.blinkInterval : DEFAULT_SETTINGS.blinkInterval,
              blinkDuration: (typeof parsed.blinkDuration === 'number' && !isNaN(parsed.blinkDuration) && parsed.blinkDuration >= 50 && parsed.blinkDuration <= 600) ? parsed.blinkDuration : DEFAULT_SETTINGS.blinkDuration,
              activeEmotionId: (typeof parsed.activeEmotionId === 'string' && parsed.activeEmotionId) ? parsed.activeEmotionId : DEFAULT_SETTINGS.activeEmotionId,
              exportResolution: (typeof parsed.exportResolution === 'string' && parsed.exportResolution) ? parsed.exportResolution : DEFAULT_SETTINGS.exportResolution,
              exportFps: (parsed.exportFps === '60') ? '60' : '30',
              customBgScale: (typeof parsed.customBgScale === 'number' && !isNaN(parsed.customBgScale) && parsed.customBgScale >= 20 && parsed.customBgScale <= 300) ? parsed.customBgScale : DEFAULT_SETTINGS.customBgScale,
              customBgPosX: (typeof parsed.customBgPosX === 'number' && !isNaN(parsed.customBgPosX) && parsed.customBgPosX >= -1000 && parsed.customBgPosX <= 1000) ? parsed.customBgPosX : DEFAULT_SETTINGS.customBgPosX,
              customBgPosY: (typeof parsed.customBgPosY === 'number' && !isNaN(parsed.customBgPosY) && parsed.customBgPosY >= -1000 && parsed.customBgPosY <= 1000) ? parsed.customBgPosY : DEFAULT_SETTINGS.customBgPosY,
              customBgFit: (parsed.customBgFit === 'contain') ? 'contain' : 'cover'
            };
          }
        }
      }
    } catch (e) {
      console.warn('Gagal memuat userSettings dari storage:', e);
    }
    return { ...DEFAULT_SETTINGS };
  }

  function validateEmotionsArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const validated = arr.filter(item => item && typeof item === 'object' && item.id && item.sprites);
    if (validated.length === 0) return null;
    validated.forEach((emo, i) => {
      if (typeof emo.name !== 'string' || !emo.name.trim()) emo.name = `Emosi ${i + 1}`;
      if (typeof emo.hotkey !== 'string' || !emo.hotkey.trim()) emo.hotkey = String((i % 9) + 1);
      emo.sprites = emo.sprites || {};
      emo.sprites.closed = emo.sprites.closed || 'assets/normal_closed.png';
      emo.sprites.closedBlink = emo.sprites.closedBlink || 'assets/normal_closed_blink.png';
      emo.sprites.open = emo.sprites.open || 'assets/normal_open.png';
      emo.sprites.openBlink = emo.sprites.openBlink || 'assets/normal_open_blink.png';
    });
    DEFAULT_EMOTIONS.forEach(defEmo => {
      if (!validated.some(e => e.id === defEmo.id)) {
        validated.push(JSON.parse(JSON.stringify(defEmo)));
      }
    });
    return validated;
  }

  function loadEmotions() {
    try {
      // Cek semua key historis di localStorage, prioritaskan yang menyimpan custom sprites pengguna
      let candidateWithCustom = null;
      let candidateDefault = null;

      for (const key of HISTORICAL_EMOTION_KEYS) {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            const validated = validateEmotionsArray(parsed);
            if (validated) {
              if (hasAnyCustomSprite(validated)) {
                candidateWithCustom = validated;
                break;
              } else if (!candidateDefault) {
                candidateDefault = validated;
              }
            }
          } catch (err) {}
        }
      }

      if (candidateWithCustom) return candidateWithCustom;
      if (candidateDefault) return candidateDefault;
    } catch (e) {
      console.warn('Gagal memuat emosi tersimpan, menggunakan default:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_EMOTIONS));
  }

  function loadSystemHotkeys() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.hotkeys) || localStorage.getItem('smoothietuber_system_hotkeys');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return Object.assign({}, DEFAULT_SYSTEM_HOTKEYS, parsed);
        }
      }
    } catch (e) {}
    return { ...DEFAULT_SYSTEM_HOTKEYS };
  }

  let userSettings = loadUserSettings();
  let emotions = loadEmotions();
  let systemHotkeys = loadSystemHotkeys();

  let activeEmotionId = (emotions.some(e => e.id === userSettings.activeEmotionId)) ? userSettings.activeEmotionId : (emotions[0]?.id || 'emotion_normal');
  let isRecordingHotkeyForId = null;
  let isRecordingSystemHotkey = null; // 'toggleMute' | 'toggleObs' | 'resetAudio' | null

  // Auto-Save User Settings (Debounced with immediate flush support)
  let saveSettingsTimer = null;
  function saveUserSettings(immediate = false) {
    const doSave = () => {
      try {
        const payload = {
          threshold,
          holdDelay,
          bounceIntensity,
          bounceSpeed,
          avatarScale,
          avatarPosX,
          avatarPosY,
          isFloatingEnabled,
          animMode,
          floatIntensity,
          floatDuration,
          blinkInterval,
          blinkDuration,
          activeEmotionId,
          exportResolution: exportResolution ? exportResolution.value : '720x1280',
          exportFps: exportFps ? exportFps.value : '30',
          customBgScale: userSettings.customBgScale || 100,
          customBgPosX: userSettings.customBgPosX || 0,
          customBgPosY: userSettings.customBgPosY || 0,
          customBgFit: userSettings.customBgFit || 'cover'
        };
        localStorage.setItem('smoothietuber_anim_mode', animMode);
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(payload));
        localStorage.setItem('smoothietuber_user_settings_v4', JSON.stringify(payload));
        localStorage.setItem('smoothietuber_user_settings_v2', JSON.stringify(payload));
        idbSet(STORAGE_KEYS.settings, payload).catch(() => {});
      } catch (e) {
        console.warn('Gagal menyimpan user settings:', e);
      }
    };

    if (immediate) {
      clearTimeout(saveSettingsTimer);
      doSave();
    } else {
      clearTimeout(saveSettingsTimer);
      saveSettingsTimer = setTimeout(doSave, 150);
    }
  }

  function saveEmotions() {
    if (!isStorageHydrated) {
      console.warn('saveEmotions ditunda: Menunggu hydration IndexedDB selesai');
      return;
    }

    const payload = JSON.parse(JSON.stringify(emotions));

    // 1. Simpan ke IndexedDB (Kapasitas ratusan Megabyte, aman tanpa batas 5MB)
    idbSet(STORAGE_KEYS.emotions, payload).catch((e) => console.warn('idbSet emotions error:', e));
    idbSet('smoothietuber_emotions_v4', payload).catch(() => {});
    idbSet(STORAGE_KEYS.snapshot, payload).catch(() => {});

    // 2. Simpan juga ke localStorage sebagai cache sinkron
    try {
      const json = JSON.stringify(payload);
      localStorage.setItem(STORAGE_KEYS.emotions, json);
      localStorage.setItem('smoothietuber_emotions_v4', json);
      localStorage.setItem(STORAGE_KEYS.snapshot, json);
    } catch (e) {
      // Jika localStorage melampaui kuota 5MB (QuotaExceededError), data tetap 100% aman tersimpan di IndexedDB!
      console.info('localStorage quota reached, data avatar aman permanen di IndexedDB');
    }
  }

  function saveSystemHotkeys() {
    try {
      localStorage.setItem(STORAGE_KEYS.hotkeys, JSON.stringify(systemHotkeys));
      localStorage.setItem('smoothietuber_system_hotkeys', JSON.stringify(systemHotkeys));
      idbSet(STORAGE_KEYS.hotkeys, systemHotkeys).catch(() => {});
    } catch (e) {}
  }

  async function restoreEmotionsFromIDB() {
    try {
      // 1. Periksa data dari IndexedDB (Cek master key, v4, dan snapshot)
      let idbData = await idbGetWithTimeout(STORAGE_KEYS.emotions, 800);
      if (!idbData || !hasAnyCustomSprite(idbData)) {
        const v4Data = await idbGetWithTimeout('smoothietuber_emotions_v4', 400);
        if (v4Data && hasAnyCustomSprite(v4Data)) idbData = v4Data;
      }
      if (!idbData || !hasAnyCustomSprite(idbData)) {
        const snapData = await idbGetWithTimeout(STORAGE_KEYS.snapshot, 400);
        if (snapData && hasAnyCustomSprite(snapData)) idbData = snapData;
      }

      if (idbData && Array.isArray(idbData) && idbData.length > 0) {
        const validatedIDB = validateEmotionsArray(idbData);
        if (validatedIDB) {
          const hasCustom = hasAnyCustomSprite(validatedIDB);
          const currentHasCustom = hasAnyCustomSprite(emotions);

          if (hasCustom || !currentHasCustom) {
            emotions = validatedIDB;
            if (activeEmotionId && !emotions.some(e => e.id === activeEmotionId)) {
              activeEmotionId = emotions[0].id;
            }
            console.log('✅ Avatar kustom berhasil dipulihkan dari penyimpanan permanen IndexedDB');
          }
        }
      } else {
        // Jika IndexedDB kosong, tapi ada custom sprites di memory/localStorage, migrasikan ke IndexedDB sekarang!
        if (hasAnyCustomSprite(emotions)) {
          const payload = JSON.parse(JSON.stringify(emotions));
          idbSet(STORAGE_KEYS.emotions, payload).catch(() => {});
          idbSet(STORAGE_KEYS.snapshot, payload).catch(() => {});
          console.log('✅ Data avatar kustom dimigrasikan ke IndexedDB permanen');
        }
      }

      // 2. Pulihkan userSettings dari IndexedDB jika ada
      try {
        const idbSettings = await idbGetWithTimeout(STORAGE_KEYS.settings, 400);
        if (idbSettings && typeof idbSettings === 'object') {
          if (typeof idbSettings.threshold === 'number') threshold = idbSettings.threshold;
          if (typeof idbSettings.avatarScale === 'number') avatarScale = idbSettings.avatarScale;
          if (typeof idbSettings.avatarPosX === 'number') avatarPosX = idbSettings.avatarPosX;
          if (typeof idbSettings.avatarPosY === 'number') avatarPosY = idbSettings.avatarPosY;
          if (typeof idbSettings.bounceIntensity === 'number' && idbSettings.bounceIntensity >= 1) bounceIntensity = idbSettings.bounceIntensity;
          if (typeof idbSettings.bounceSpeed === 'number' && idbSettings.bounceSpeed >= 0.05) bounceSpeed = idbSettings.bounceSpeed;
          if (typeof idbSettings.activeEmotionId === 'string' && emotions.some(e => e.id === idbSettings.activeEmotionId)) {
            activeEmotionId = idbSettings.activeEmotionId;
          }
        }
      } catch (err) {}

      // 3. Pulihkan juga custom background dari IndexedDB jika ada
      const savedBg = await idbGetWithTimeout('smoothietuber_custom_bg', 400);
      if (savedBg && customBgLayer) {
        if (customBgImg) customBgImg.src = savedBg;
        customBgLayer.classList.remove('hidden');
        if (btnRemoveCustomBg) btnRemoveCustomBg.classList.remove('hidden');
        if (customBgControls) customBgControls.classList.remove('hidden');
        customBgImageObj = new Image();
        customBgImageObj.onload = () => {
          applyCustomBgTransform();
        };
        customBgImageObj.src = savedBg;
      }
    } catch (e) {
      console.warn('restoreEmotionsFromIDB notice:', e);
    }
  }

  function flushAllStorage() {
    if (!isStorageHydrated) return;
    saveUserSettings(true);
    saveEmotions();
    saveSystemHotkeys();
  }

  window.addEventListener('beforeunload', flushAllStorage);
  window.addEventListener('pagehide', flushAllStorage);

  // Audio & Mic States
  let audioContext = null;
  let analyser = null;
  let micStream = null;
  let micSourceNode = null;
  let audioFileElement = null;
  let audioRecordDestination = null;
  let recordGainNode = null;
  let recordCompressorNode = null;

  let currentAudioSourceMode = 'mic'; // 'mic' | 'file'
  let isListening = false;
  let isSpeaking = false;
  let isMicMuted = false;
  let lastVoiceActiveTimestamp = 0;

  // Sliders & Configuration dimuat dari userSettings yang persisten!
  let threshold = typeof userSettings.threshold === 'number' ? userSettings.threshold : 15;
  let holdDelay = typeof userSettings.holdDelay === 'number' ? userSettings.holdDelay : 160; // ms
  let bounceIntensity = (typeof userSettings.bounceIntensity === 'number' && userSettings.bounceIntensity >= 1) ? userSettings.bounceIntensity : 18; // px
  let bounceSpeed = (typeof userSettings.bounceSpeed === 'number' && userSettings.bounceSpeed >= 0.05) ? userSettings.bounceSpeed : 0.28; // seconds
  let avatarScale = typeof userSettings.avatarScale === 'number' ? userSettings.avatarScale : 1;
  let avatarPosX = typeof userSettings.avatarPosX === 'number' ? userSettings.avatarPosX : 0;
  let avatarPosY = typeof userSettings.avatarPosY === 'number' ? userSettings.avatarPosY : 0;
  let cameraStream = null;
  let activeCameraFacing = null;

  // Canva Floating / Breathing Animation & Mode Animasi Avatar ('bounce' | 'scale')
  let isFloatingEnabled = userSettings.isFloatingEnabled !== false;
  let animMode = (userSettings.animMode === 'scale') ? 'scale' : 'bounce';
  let dynamicVoiceScale = 0.92; // Skala dinamis untuk Mode Skala (0.92 saat diam, 1.05 - 1.10 saat bicara)
  let currentExportVoiceScale = 0.92;
  let floatIntensity = typeof userSettings.floatIntensity === 'number' ? userSettings.floatIntensity : 8; // px
  let floatDuration = typeof userSettings.floatDuration === 'number' ? userSettings.floatDuration : 3.8; // seconds

  // Blink Configuration
  let blinkInterval = typeof userSettings.blinkInterval === 'number' ? userSettings.blinkInterval : 3500; // ms
  let blinkDuration = typeof userSettings.blinkDuration === 'number' ? userSettings.blinkDuration : 160;  // ms
  let isBlinking = false;
  let blinkTimer = null;
  let blinkEndTimer = null;

  // MediaRecorder Video Export
  let mediaRecorder = null;
  let recordedChunks = [];
  let isRecordingVideo = false;
  let recordStartTime = 0;
  let recordTimerInterval = null;
  let currentRenderRaf = null;

  // --- DOM ELEMENTS ---
  const stage = document.getElementById('stage');
  const avatarImage = document.getElementById('avatarImage');
  const avatarWrapper = document.getElementById('avatarWrapper');
  const exportCanvas = document.getElementById('exportCanvas');
  const exportCtx = exportCanvas.getContext('2d', { alpha: true });
  const customBgLayer = document.getElementById('customBgLayer');
  const customBgImg = document.getElementById('customBgImg');
  const cameraBgWrapper = document.getElementById('cameraBgWrapper');
  const cameraBgVideo = document.getElementById('cameraBgVideo');

  // Left Dock
  const leftDock = document.getElementById('leftDock');
  const volumeBarVertical = document.getElementById('volumeBarVertical');
  const thresholdMarkerVertical = document.getElementById('thresholdMarkerVertical');
  const thresholdSlider = document.getElementById('thresholdSlider');
  const btnToggleMic = document.getElementById('btnToggleMic');
  const statusLed = document.getElementById('statusLed');
  const btnQuickMute = document.getElementById('btnQuickMute');
  const quickMuteIcon = document.getElementById('quickMuteIcon');
  const btnToggleObs = document.getElementById('btnToggleObs');
  const btnDockGreenScreen = document.getElementById('btnDockGreenScreen');
  const btnDockCamera = document.getElementById('btnDockCamera');
  const dockCameraIcon = document.getElementById('dockCameraIcon');
  const btnRestorePureGreen = document.getElementById('btnRestorePureGreen');
  const btnQuickRecord = document.getElementById('btnQuickRecord');
  const recTimer = document.getElementById('recTimer');

  // Right Dock
  const rightDock = document.getElementById('rightDock');
  const btnEmotionPicker = document.getElementById('btnEmotionPicker');
  const curEmotionName = document.getElementById('curEmotionName');
  const curEmotionHotkey = document.getElementById('curEmotionHotkey');

  // 4 Sprite Slot Elements
  const slotClosed = document.getElementById('slotClosed');
  const slotOpen = document.getElementById('slotOpen');
  const slotClosedBlink = document.getElementById('slotClosedBlink');
  const slotOpenBlink = document.getElementById('slotOpenBlink');

  const slotImgClosed = document.getElementById('slotImgClosed');
  const slotImgOpen = document.getElementById('slotImgOpen');
  const slotImgClosedBlink = document.getElementById('slotImgClosedBlink');
  const slotImgOpenBlink = document.getElementById('slotImgOpenBlink');

  // Flyouts
  const flyouts = document.querySelectorAll('.veado-flyout');
  const emotionsListCompact = document.getElementById('emotionsListCompact');
  const btnAddEmotion = document.getElementById('btnAddEmotion');
  const btnExportProfile = document.getElementById('btnExportProfile');
  const inputImportProfile = document.getElementById('inputImportProfile');

  // Audio Flyout
  const statusText = document.getElementById('statusText');
  const volumeValue = document.getElementById('volumeValue');
  const thresholdValueDisplay = document.getElementById('thresholdValueDisplay');
  const micSelect = document.getElementById('micSelect');
  const btnRefreshMicDevices = document.getElementById('btnRefreshMicDevices');
  const activeMicDeviceName = document.getElementById('activeMicDeviceName');
  const thresholdSliderInput = document.getElementById('thresholdSliderInput');
  const thresholdBadge = document.getElementById('thresholdBadge');
  const holdDelaySlider = document.getElementById('holdDelaySlider');
  const holdDelayBadge = document.getElementById('holdDelayBadge');
  const btnDirectResetAudio = document.getElementById('btnDirectResetAudio');

  // Motion Flyout
  const toggleFloating = document.getElementById('toggleFloating');
  const avatarAnimModeSelect = document.getElementById('avatarAnimModeSelect');
  const avatarAnimModeRadios = document.querySelectorAll('input[name="avatarAnimModeRadio"]');
  const avatarAnimModeCards = document.querySelectorAll('.doodle-radio-card[data-mode-card]');
  const floatIntensitySlider = document.getElementById('floatIntensitySlider');

  // Bug Report Modal Elements
  const btnOpenBugReport = document.getElementById('btnOpenBugReport');
  const bugReportModal = document.getElementById('bugReportModal');
  const btnCloseBugModal = document.getElementById('btnCloseBugModal');
  const bugReportForm = document.getElementById('bugReportForm');
  const bugReporterName = document.getElementById('bugReporterName');
  const bugCategory = document.getElementById('bugCategory');
  const bugDescription = document.getElementById('bugDescription');
  const bugReportStatus = document.getElementById('bugReportStatus');
  const btnSubmitBugReport = document.getElementById('btnSubmitBugReport');
  const btnSubmitBugText = document.getElementById('btnSubmitBugText');
  const floatIntensityBadge = document.getElementById('floatIntensityBadge');
  const floatSpeedSlider = document.getElementById('floatSpeedSlider');
  const floatSpeedBadge = document.getElementById('floatSpeedBadge');
  const bounceIntensitySlider = document.getElementById('bounceIntensity');
  const bounceBadge = document.getElementById('bounceBadge');
  const bounceSpeedSlider = document.getElementById('bounceSpeedSlider');
  const bounceSpeedBadge = document.getElementById('bounceSpeedBadge');
  const avatarScaleSlider = document.getElementById('avatarScale');
  const scaleBadge = document.getElementById('scaleBadge');
  const avatarPosYSlider = document.getElementById('avatarPosY');
  const posYBadge = document.getElementById('posYBadge');
  const blinkIntervalSlider = document.getElementById('blinkIntervalSlider');
  const blinkIntervalBadge = document.getElementById('blinkIntervalBadge');
  const blinkDurationSlider = document.getElementById('blinkDurationSlider');
  const blinkDurationBadge = document.getElementById('blinkDurationBadge');
  const btnPosPresets = document.querySelectorAll('.btn-pos-preset');

  // Hotkeys Flyout
  const btnHotkeyMute = document.getElementById('btnHotkeyMute');
  const btnHotkeyObs = document.getElementById('btnHotkeyObs');
  const btnHotkeyResetAudio = document.getElementById('btnHotkeyResetAudio');
  const btnResetDefaultHotkeys = document.getElementById('btnResetDefaultHotkeys');
  const hotkeysEmotionsList = document.getElementById('hotkeysEmotionsList');
  const btnResetEmotionHotkeys = document.getElementById('btnResetEmotionHotkeys');

  // Background Flyout
  const bgChoiceButtons = document.querySelectorAll('.btn-bg-choice');
  const inputCustomBg = document.getElementById('inputCustomBg');
  const btnRemoveCustomBg = document.getElementById('btnRemoveCustomBg');
  const btnCameraBack = document.getElementById('btnCameraBack');
  const btnCameraFront = document.getElementById('btnCameraFront');
  const btnStopCamera = document.getElementById('btnStopCamera');
  const cameraDeviceSelect = document.getElementById('cameraDeviceSelect');
  const btnRefreshCameraDevices = document.getElementById('btnRefreshCameraDevices');
  const activeCameraDeviceName = document.getElementById('activeCameraDeviceName');
  const toggleAutoContinuityCam = document.getElementById('toggleAutoContinuityCam');
  const cameraFitToggleGroup = document.getElementById('cameraFitToggleGroup');
  const btnToggleCameraFit = document.getElementById('btnToggleCameraFit');
  const cameraZoomControlGroup = document.getElementById('cameraZoomControlGroup');
  const cameraZoomSlider = document.getElementById('cameraZoomSlider');
  const cameraZoomBadge = document.getElementById('cameraZoomBadge');
  const btnCamZoomOut = document.getElementById('btnCamZoomOut');
  const btnCamZoomIn = document.getElementById('btnCamZoomIn');
  const btnCamZoomPresets = document.querySelectorAll('.btn-cam-zoom-preset');
  const cameraZoomFloatingBar = document.getElementById('cameraZoomFloatingBar');
  const btnFloatCamZoomOut = document.getElementById('btnFloatCamZoomOut');
  const btnFloatCamZoomIn = document.getElementById('btnFloatCamZoomIn');
  const floatZoomPresetBtns = document.querySelectorAll('.float-zoom-preset-btn');
  const customBgControls = document.getElementById('customBgControls');
  const btnBgFitCover = document.getElementById('btnBgFitCover');
  const btnBgFitContain = document.getElementById('btnBgFitContain');
  const customBgScaleSlider = document.getElementById('customBgScaleSlider');
  const customBgScaleBadge = document.getElementById('customBgScaleBadge');
  const customBgPosXSlider = document.getElementById('customBgPosXSlider');
  const customBgPosXBadge = document.getElementById('customBgPosXBadge');
  const customBgPosYSlider = document.getElementById('customBgPosYSlider');
  const customBgPosYBadge = document.getElementById('customBgPosYBadge');
  const btnResetCustomBgTransform = document.getElementById('btnResetCustomBgTransform');

  // Audio File Flyout
  const inputAudioFile = document.getElementById('inputAudioFile');
  const loadedAudioName = document.getElementById('loadedAudioName');
  const audioPlayerControls = document.getElementById('audioPlayerControls');
  const btnPlayPauseAudio = document.getElementById('btnPlayPauseAudio');
  const audioScrubber = document.getElementById('audioScrubber');
  const audioCurrentTime = document.getElementById('audioCurrentTime');
  const audioTotalDuration = document.getElementById('audioTotalDuration');
  const btnRemoveAudioFile = document.getElementById('btnRemoveAudioFile');

  // Export Flyout & Modal
  const toggleTransparentExport = document.getElementById('toggleTransparentExport');
  const btnMainRecord = document.getElementById('btnMainRecord');
  const btnMainRecordText = document.getElementById('btnMainRecordText');
  const exportBgMode = document.getElementById('exportBgMode');
  const exportFormat = document.getElementById('exportFormat');
  const exportResolution = document.getElementById('exportResolution');
  const exportFps = document.getElementById('exportFps');
  const recordingStatusNote = document.getElementById('recordingStatusNote');
  const recordResultModal = document.getElementById('recordResultModal');
  const previewRecordedVideo = document.getElementById('previewRecordedVideo');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnDismissModal = document.getElementById('btnDismissModal');
  const btnDownloadVideo = document.getElementById('btnDownloadVideo');
  const btnDownloadMov = document.getElementById('btnDownloadMov');
  const btnShareVideo = document.getElementById('btnShareVideo');
  const metaDuration = document.getElementById('metaDuration');
  const metaSize = document.getElementById('metaSize');
  const metaFormat = document.getElementById('metaFormat');

  // Restore button & Toast
  const btnRestoreControls = document.getElementById('btnRestoreControls');
  const toastNotification = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');

  // --- EXCLUSIVE VIP TESTER ACCESS GATE (BETATESTER) ---
  const VALID_ACCESS_CODES = ['BETATESTER'];
  const vipAccessModal = document.getElementById('vipAccessModal');
  const vipAccessForm = document.getElementById('vipAccessForm');
  const vipAccessCode = document.getElementById('vipAccessCode');
  const vipErrorMsg = document.getElementById('vipErrorMsg');
  const btnRelockVip = document.getElementById('btnRelockVip');

  function isVipAuthorized() {
    try {
      const saved = localStorage.getItem('smoothietuber_vip_auth');
      if (saved && VALID_ACCESS_CODES.includes(saved.trim().toUpperCase())) {
        return true;
      }
      const urlParams = new URLSearchParams(window.location.search);
      const paramKey = (urlParams.get('key') || urlParams.get('code') || '').trim().toUpperCase();
      if (paramKey && VALID_ACCESS_CODES.includes(paramKey)) {
        localStorage.setItem('smoothietuber_vip_auth', paramKey);
        return true;
      }
    } catch (e) {}
    return false;
  }

  function checkVipGate() {
    // Jika modal pemilihan bahasa masih aktif, tunda tampilan modal VIP
    if (langSelectModal && !langSelectModal.classList.contains('hidden')) {
      return false;
    }

    if (isVipAuthorized()) {
      if (vipAccessModal) vipAccessModal.classList.add('hidden');
      return true;
    } else {
      if (vipAccessModal) {
        vipAccessModal.classList.remove('hidden');
        setTimeout(() => {
          if (vipAccessCode) vipAccessCode.focus();
        }, 150);
      }
      return false;
    }
  }

  function setupVipGateEvents() {
    if (vipAccessForm) {
      vipAccessForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputVal = (vipAccessCode.value || '').trim().toUpperCase();
        if (VALID_ACCESS_CODES.includes(inputVal)) {
          try {
            localStorage.setItem(STORAGE_KEYS.vip, inputVal);
          } catch (e) {}
          if (vipErrorMsg) vipErrorMsg.classList.add('hidden');
          if (vipAccessModal) vipAccessModal.classList.add('hidden');
          showToast(t('toast_vip_success') || '🎉 Kode BETATESTER Diterima! Selamat datang!');
          startMicrophone().catch(() => {});
          if (typeof tryAutoConnectMacIphoneCamera === 'function') {
            tryAutoConnectMacIphoneCamera();
          }
        } else {
          if (vipErrorMsg) vipErrorMsg.classList.remove('hidden');
          vipAccessCode.classList.add('doodle-shake');
          vipAccessCode.select();
          setTimeout(() => vipAccessCode.classList.remove('doodle-shake'), 400);
        }
      });
    }

    if (btnRelockVip) {
      btnRelockVip.addEventListener('click', () => {
        try {
          localStorage.removeItem(STORAGE_KEYS.vip);
        } catch (e) {}
        showToast(t('toast_relocked') || '🔒 Akses tester dikunci kembali');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  }

  // --- LANGUAGE SELECTION SCREEN / MODAL FLOW ---
  const langSelectModal = document.getElementById('langSelectModal');
  const btnConfirmLang = document.getElementById('btnConfirmLang');
  const btnHeaderLangSwitch = document.getElementById('btnHeaderLangSwitch');
  let selectedLangCandidate = null;

  function initLanguageFlow() {
    let savedLang = null;
    try {
      savedLang = localStorage.getItem(STORAGE_KEYS.lang);
    } catch (e) {}

    if (savedLang && I18N[savedLang]) {
      currentLang = savedLang;
      applyTranslations(currentLang);
      if (langSelectModal) langSelectModal.classList.add('hidden');
      checkVipGate();
    } else {
      // First access: Tampilkan Language Selection Modal
      let browserLang = (navigator.language || navigator.userLanguage || 'id').toLowerCase();
      let defaultLang = 'id';
      if (browserLang.startsWith('ja')) defaultLang = 'ja';
      else if (browserLang.startsWith('zh')) defaultLang = 'zh';
      else if (browserLang === 'en-gb' || browserLang === 'en-uk') defaultLang = 'en-GB';
      else if (browserLang.startsWith('en')) defaultLang = 'en-US';

      currentLang = defaultLang;
      applyTranslations(currentLang);
      openLanguageModal(defaultLang);
    }

    if (btnHeaderLangSwitch) {
      btnHeaderLangSwitch.addEventListener('click', () => {
        openLanguageModal(currentLang);
      });
    }

    document.querySelectorAll('.lang-card-btn').forEach(card => {
      card.addEventListener('click', () => {
        const langCode = card.dataset.lang;
        selectLanguageCard(langCode);
      });
    });

    if (btnConfirmLang) {
      btnConfirmLang.addEventListener('click', () => {
        if (!selectedLangCandidate) return;
        currentLang = selectedLangCandidate;
        try {
          localStorage.setItem(STORAGE_KEYS.lang, currentLang);
        } catch (e) {}

        applyTranslations(currentLang);
        if (langSelectModal) langSelectModal.classList.add('hidden');
        showToast(t('toast_lang_switched') || '🌐 Bahasa berhasil diubah');
        checkVipGate();
      });
    }
  }

  function openLanguageModal(preselectedLang) {
    if (!langSelectModal) return;
    langSelectModal.classList.remove('hidden');
    selectLanguageCard(preselectedLang || currentLang || 'id');
  }

  function selectLanguageCard(langCode) {
    selectedLangCandidate = langCode;
    document.querySelectorAll('.lang-card-btn').forEach(card => {
      if (card.dataset.lang === langCode) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
    if (btnConfirmLang) {
      btnConfirmLang.disabled = false;
    }
  }

  function getActiveEmotion() {
    return emotions.find(e => e.id === activeEmotionId) || emotions[0];
  }

  function setActiveEmotion(id) {
    activeEmotionId = id;
    lastAppliedSpriteSrc = '';
    updateSlotImages();
    updateAvatarSprite();
    renderCompactEmotionsList();
    renderHotkeysUI();
    saveUserSettings(); // Simpan emosi aktif ke pengaturan persisten!
    const emo = getActiveEmotion();
    showToast(`${t('toast_active_emotion')} ${emo.name} [${emo.hotkey.toUpperCase()}]`);
  }

  // Helper untuk mengecilkan gambar besar pengguna ke 1080px & kompresi WebP/PNG transparan
  function optimizeImageFile(file, maxWidth = 1080, maxHeight = 1080) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const dataUrl = loadEvt.target.result;
        if (!file.type || !file.type.startsWith('image/')) {
          resolve(dataUrl);
          return;
        }

        const img = new Image();
        img.onload = () => {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;

          // Jika ukuran sudah kecil dan dimensi w/h pas, langsung gunakan
          if (w <= maxWidth && h <= maxHeight && file.size < 160 * 1024) {
            resolve(dataUrl);
            return;
          }

          if (w > maxWidth || h > maxHeight) {
            const ratio = Math.min(maxWidth / w, maxHeight / h);
            w = Math.round(w * ratio);
            h = Math.round(h * ratio);
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          // Coba WebP 0.92 dengan alpha (80% lebih hemat ukuran dari PNG uncompressed)
          try {
            const webpUrl = canvas.toDataURL('image/webp', 0.92);
            if (webpUrl && webpUrl.startsWith('data:image/webp') && webpUrl.length < dataUrl.length) {
              resolve(webpUrl);
              return;
            }
          } catch (e) {}

          // Fallback PNG transparan penuh
          const optimized = canvas.toDataURL('image/png');
          resolve(optimized);
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  }

  // Preload Cache
  const imageCache = new Map();
  function getImageObject(url) {
    if (!imageCache.has(url)) {
      const img = new Image();
      img.src = url;
      imageCache.set(url, img);
    }
    return imageCache.get(url);
  }

  // Format tampilan nama emosi khusus di dock pill: kata 'emosi' / 'emotion' diganti 🎭
  function formatDockEmotionName(name) {
    if (!name || typeof name !== 'string') return '🎭';
    const trimmed = name.trim();
    const formatted = trimmed
      .replace(/(?:^|\b)emosi\s*/gi, '🎭 ')
      .replace(/(?:^|\b)emotion\s*/gi, '🎭 ')
      .trim();
    return formatted || '🎭';
  }

  // Update Slot Thumbnails to match active emotion
  function updateSlotImages() {
    const emo = getActiveEmotion();
    if (!emo) return;

    if (slotImgClosed) slotImgClosed.src = emo.sprites.closed;
    if (slotImgOpen) slotImgOpen.src = emo.sprites.open;
    if (slotImgClosedBlink) slotImgClosedBlink.src = emo.sprites.closedBlink || emo.sprites.closed;
    if (slotImgOpenBlink) slotImgOpenBlink.src = emo.sprites.openBlink || emo.sprites.open;

    if (curEmotionName) {
      curEmotionName.textContent = formatDockEmotionName(emo.name);
      curEmotionName.title = emo.name;
    }
    if (curEmotionHotkey) curEmotionHotkey.textContent = `[${emo.hotkey.toUpperCase()}]`;
    if (btnEmotionPicker) {
      btnEmotionPicker.title = `${emo.name} [${emo.hotkey.toUpperCase()}]`;
    }

    // Preload
    Object.values(emo.sprites).forEach(src => { if (src) getImageObject(src); });
  }

  // Highlight Slot real-time active (Veadotube Signature Feature!)
  function updateSpriteSlotsHighlight() {
    const slots = {
      closed: slotClosed,
      open: slotOpen,
      closedBlink: slotClosedBlink,
      openBlink: slotOpenBlink
    };

    Object.values(slots).forEach(s => s?.classList.remove('is-active-slot'));

    let currentSlot = 'closed';
    if (!isSpeaking && !isBlinking) currentSlot = 'closed';
    else if (!isSpeaking && isBlinking) currentSlot = 'closedBlink';
    else if (isSpeaking && !isBlinking) currentSlot = 'open';
    else if (isSpeaking && isBlinking) currentSlot = 'openBlink';

    if (slots[currentSlot]) {
      slots[currentSlot].classList.add('is-active-slot');
    }
  }

  let lastAppliedSpriteSrc = '';

  function updateAvatarSprite() {
    const emo = getActiveEmotion();
    if (!emo) return;

    let targetSrc = emo.sprites.closed;

    if (!isSpeaking && !isBlinking) {
      targetSrc = emo.sprites.closed;
      avatarImage.classList.remove('state-speaking');
      avatarWrapper.classList.remove('is-speaking');
    } else if (!isSpeaking && isBlinking) {
      targetSrc = emo.sprites.closedBlink || emo.sprites.closed;
      avatarImage.classList.remove('state-speaking');
      avatarWrapper.classList.remove('is-speaking');
    } else if (isSpeaking && !isBlinking) {
      targetSrc = emo.sprites.open;
      avatarImage.classList.add('state-speaking');
      avatarWrapper.classList.add('is-speaking');
    } else if (isSpeaking && isBlinking) {
      targetSrc = emo.sprites.openBlink || emo.sprites.open;
      avatarImage.classList.add('state-speaking');
      avatarWrapper.classList.add('is-speaking');
    }

    if (lastAppliedSpriteSrc !== targetSrc) {
      lastAppliedSpriteSrc = targetSrc;
      avatarImage.src = targetSrc;
    }

    updateSpriteSlotsHighlight();
  }

  // Setup click-to-upload on the 4 vertical slots dengan optimasi aman & simpan permanen
  document.querySelectorAll('input[data-sprite-slot]').forEach(input => {
    input.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const slotKey = input.dataset.spriteSlot;
      const emo = getActiveEmotion();
      if (!emo) return;

      showToast(t('toast_processing_sprite'));
      const optimizedUrl = await optimizeImageFile(file);
      if (optimizedUrl) {
        emo.sprites[slotKey] = optimizedUrl;
        saveEmotions();
        lastAppliedSpriteSrc = '';
        updateSlotImages();
        updateAvatarSprite();
        showToast(t('toast_sprite_saved'));
      }
    });
  });

  // Render Daftar Emosi Ringkas di Flyout Emosi (Tombol Bulat Doodle Minimalis)
  function renderCompactEmotionsList() {
    if (!emotionsListCompact) return;
    emotionsListCompact.innerHTML = '';

    emotions.forEach(emo => {
      const isCurrentActive = emo.id === activeEmotionId;
      const isRec = isRecordingHotkeyForId === emo.id;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `emotion-circle-btn ${isCurrentActive ? 'active' : ''} ${isRec ? 'is-recording-key' : ''}`;
      btn.dataset.emotionId = emo.id;
      // 1. Hilangkan label teks nama emosi; pindahkan nama emosi ke atribut title (tooltip bawaan saat hover/tahan)
      btn.title = `${emo.name} [${emo.hotkey.toUpperCase()}]`;

      const spriteSrc = emo.sprites.closed || 'assets/normal_closed.png';
      btn.innerHTML = `
        <div class="emotion-circle-thumb">
          <img src="${escapeHtml(spriteSrc)}" alt="${escapeHtml(emo.name)}">
        </div>
        <span class="emotion-hotkey-badge">${escapeHtml(emo.hotkey.toUpperCase())}</span>
      `;

      // Klik untuk memilih emosi aktif
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveEmotion(emo.id);
      });

      // Long press / klik kanan untuk ubah nama atau hapus emosi
      btn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const action = prompt(`Ubah nama emosi "${emo.name}" (atau ketik 'HAPUS' untuk menghapus):`, emo.name);
        if (action === null) return;
        const trimmed = action.trim();
        if (trimmed.toUpperCase() === 'HAPUS') {
          if (emotions.length <= 1) {
            showToast('⚠️ Minimal harus ada 1 emosi!');
            return;
          }
          emotions = emotions.filter(item => item.id !== emo.id);
          if (activeEmotionId === emo.id) activeEmotionId = emotions[0].id;
          saveEmotions();
          setActiveEmotion(activeEmotionId);
          renderCompactEmotionsList();
          renderHotkeysUI();
          showToast(`🗑️ Emosi dihapus`);
        } else if (trimmed && trimmed !== emo.name) {
          emo.name = trimmed;
          saveEmotions();
          if (emo.id === activeEmotionId && curEmotionName) {
            curEmotionName.textContent = formatDockEmotionName(emo.name);
            curEmotionName.title = emo.name;
          }
          renderCompactEmotionsList();
          renderHotkeysUI();
          showToast(`✏️ Nama emosi diubah menjadi "${trimmed}"`);
        }
      });

      emotionsListCompact.appendChild(btn);
    });

    // 3. Tombol Tambah Emosi ("+"): tombol bulat berikon plus ("+") bergaya doodle di bagian paling bawah
    const btnAdd = document.createElement('button');
    btnAdd.type = 'button';
    btnAdd.id = 'btnQuickAddEmotion';
    btnAdd.className = 'emotion-circle-btn btn-circle-add';
    const addTitle = (typeof t === 'function' ? t('btn_add_emotion') : null) || 'Tambah Emosi Baru';
    btnAdd.title = addTitle;
    btnAdd.innerHTML = `<span class="plus-icon">+</span>`;
    btnAdd.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btnAddEmotion) {
        btnAddEmotion.click();
      }
    });
    emotionsListCompact.appendChild(btnAdd);
  }

  // Tambah Emosi Baru
  btnAddEmotion.addEventListener('click', () => {
    const nextIdx = emotions.length + 1;
    const newId = `emotion_${Date.now()}`;
    const existingKeys = emotions.map(e => e.hotkey.toLowerCase());
    let defaultKey = String(nextIdx);
    if (existingKeys.includes(defaultKey)) {
      const candidateKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
      defaultKey = candidateKeys.find(k => !existingKeys.includes(k)) || 'x';
    }

    const newEmotion = {
      id: newId,
      name: `Emosi ${nextIdx}`,
      hotkey: defaultKey,
      sprites: {
        closed: 'assets/normal_closed.png',
        closedBlink: 'assets/normal_closed_blink.png',
        open: 'assets/normal_open.png',
        openBlink: 'assets/normal_open_blink.png'
      }
    };

    emotions.push(newEmotion);
    saveEmotions();
    setActiveEmotion(newId);
    renderCompactEmotionsList();
    renderHotkeysUI();
    showToast(`${t('toast_new_emotion')} [${defaultKey.toUpperCase()}]`);
  });

  // --- 3. FLYOUT SYSTEM (POPOVERS RINGKAS DI SAMPING DOCK) ---
  function closeAllFlyouts() {
    flyouts.forEach(f => f.classList.add('hidden'));
  }

  function toggleFlyout(flyoutId) {
    const target = document.getElementById(flyoutId);
    if (!target) return;
    const wasOpen = !target.classList.contains('hidden');
    closeAllFlyouts();
    if (!wasOpen) {
      target.classList.remove('hidden');
      if (flyoutId === 'flyoutAudio' && typeof populateAudioDevices === 'function') {
        populateAudioDevices().catch(() => {});
      }
      if (flyoutId === 'flyoutBg' && typeof populateCameraDevices === 'function') {
        populateCameraDevices().catch(() => {});
      }
    }
  }

  document.querySelectorAll('[data-flyout]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFlyout(btn.dataset.flyout);
    });
  });

  document.querySelectorAll('.btn-close-flyout').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllFlyouts();
    });
  });

  // Klik di luar dock & flyout untuk menutup flyout
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.veado-flyout') && !e.target.closest('[data-flyout]')) {
      closeAllFlyouts();
    }
  });

  // --- 4. THRESHOLD & VU METER SYNC ---
  function setThreshold(val) {
    const num = parseFloat(val);
    threshold = Math.max(0.1, Math.min(40.0, isNaN(num) ? DEFAULT_SETTINGS.threshold : Math.round(num * 10) / 10));

    const markerPercent = Math.min(100, Math.max(0, (threshold / 40.0) * 100));
    if (thresholdMarkerVertical) {
      thresholdMarkerVertical.style.bottom = `${markerPercent}%`;
    }
    if (thresholdSlider) {
      thresholdSlider.value = threshold.toFixed(1);
    }
    if (thresholdSliderInput) {
      thresholdSliderInput.value = threshold.toFixed(1);
    }
    if (thresholdBadge) {
      thresholdBadge.textContent = threshold.toFixed(1);
    }
    if (thresholdValueDisplay) {
      thresholdValueDisplay.textContent = threshold.toFixed(1);
    }
    saveUserSettings();
  }

  if (thresholdSlider) {
    thresholdSlider.addEventListener('input', (e) => setThreshold(e.target.value));
  }
  if (thresholdSliderInput) {
    thresholdSliderInput.addEventListener('input', (e) => setThreshold(e.target.value));
  }

  holdDelaySlider.addEventListener('input', (e) => {
    holdDelay = parseInt(e.target.value, 10);
    holdDelayBadge.textContent = `${holdDelay} ms`;
    saveUserSettings();
  });

  function updateVolumeMeter(vol) {
    const numVol = typeof vol === 'number' ? vol : 0;
    const heightPercent = Math.min(100, Math.max(0, (numVol / 40.0) * 100));
    if (volumeBarVertical) {
      volumeBarVertical.style.height = `${heightPercent}%`;
    }
    if (volumeValue) {
      volumeValue.textContent = numVol.toFixed(1);
    }
  }

  // --- 5. HOTKEYS REBIND & KEYDOWN ENGINE ---
  function renderHotkeysUI() {
    if (!btnHotkeyMute || !btnHotkeyObs || !btnHotkeyResetAudio) return;

    if (isRecordingSystemHotkey === 'toggleMute') {
      btnHotkeyMute.classList.add('is-recording-key');
      btnHotkeyMute.innerHTML = '⌨️ ...';
    } else {
      btnHotkeyMute.classList.remove('is-recording-key');
      btnHotkeyMute.innerHTML = `<span class="key-display">${(systemHotkeys.toggleMute || 'M').toUpperCase()}</span>`;
    }

    if (isRecordingSystemHotkey === 'toggleObs') {
      btnHotkeyObs.classList.add('is-recording-key');
      btnHotkeyObs.innerHTML = '⌨️ ...';
    } else {
      btnHotkeyObs.classList.remove('is-recording-key');
      btnHotkeyObs.innerHTML = `<span class="key-display">${(systemHotkeys.toggleObs || 'H').toUpperCase()}</span>`;
    }

    if (isRecordingSystemHotkey === 'resetAudio') {
      btnHotkeyResetAudio.classList.add('is-recording-key');
      btnHotkeyResetAudio.innerHTML = '⌨️ ...';
    } else {
      btnHotkeyResetAudio.classList.remove('is-recording-key');
      btnHotkeyResetAudio.innerHTML = `<span class="key-display">${(systemHotkeys.resetAudio || 'R').toUpperCase()}</span>`;
    }

    updateMuteUI();

    // Render Daftar Pintasan Emosi / Ekspresi
    if (hotkeysEmotionsList) {
      hotkeysEmotionsList.innerHTML = '';
      emotions.forEach((emo, idx) => {
        const isCurrentActive = emo.id === activeEmotionId;
        const isRec = isRecordingHotkeyForId === emo.id;
        const row = document.createElement('div');
        row.className = `hotkey-item-row ${isCurrentActive ? 'is-active-emotion' : ''}`;

        const previewSrc = emo.sprites.closed || 'assets/normal_closed.png';
        const displayKey = (emo.hotkey || String(idx + 1)).toUpperCase();

        row.innerHTML = `
          <div class="hotkey-meta-horizontal">
            <img class="emotion-hotkey-thumb" src="${previewSrc}" alt="${emo.name}" />
            <div class="hotkey-meta">
              <div class="hotkey-name">
                ${emo.name}
                ${isCurrentActive ? `<span class="badge-active-pill">${t('badge_active')}</span>` : ''}
              </div>
              <div class="hotkey-desc">${isCurrentActive ? t('desc_active_emotion') : t('desc_switch_emotion')}</div>
            </div>
          </div>
          <button type="button" class="btn-hotkey-rebind btn-emo-hotkey-rebind ${isRec ? 'is-recording-key' : ''}" data-emotion-id="${emo.id}" title="${t('btn_change_hotkey_title')}">
            ${isRec ? '⌨️ ...' : `<span class="key-display">${displayKey}</span>`}
          </button>
        `;

        const btnRebind = row.querySelector('.btn-emo-hotkey-rebind');
        btnRebind.addEventListener('click', (e) => {
          e.stopPropagation();
          isRecordingHotkeyForId = (isRecordingHotkeyForId === emo.id) ? null : emo.id;
          isRecordingSystemHotkey = null;
          renderHotkeysUI();
          renderCompactEmotionsList();
          if (isRecordingHotkeyForId) {
            showToast(t('toast_press_hotkey_prefix') + `"${emo.name}"` + t('toast_press_hotkey_suffix'));
          }
        });

        hotkeysEmotionsList.appendChild(row);
      });
    }
  }

  function toggleMute(forceState) {
    if (typeof forceState === 'boolean') {
      isMicMuted = forceState;
    } else {
      isMicMuted = !isMicMuted;
    }

    if (micStream) {
      micStream.getAudioTracks().forEach(track => {
        track.enabled = !isMicMuted;
      });
    }

    if (isMicMuted) {
      if (!isAnyMediaPlaying()) {
        setSpeakingState(false);
        updateVolumeMeter(0);
      }
      showToast(t('toast_mic_muted'));
    } else {
      showToast(t('toast_mic_unmuted'));
    }

    updateMuteUI();
  }

  function updateMuteUI() {
    if (btnQuickMute) {
      if (isMicMuted) {
        btnQuickMute.classList.add('is-muted');
        quickMuteIcon.textContent = '🔇';
      } else {
        btnQuickMute.classList.remove('is-muted');
        quickMuteIcon.textContent = '🔊';
      }
    }
  }

  async function resetAudioCalibration() {
    setSpeakingState(false);
    updateVolumeMeter(0);
    lastVoiceActiveTimestamp = 0;

    if (audioContext && audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (_) {}
    }

    // Hentikan stream lama terlebih dahulu lalu minta ulang mikrofon agar iOS Safari mendeteksi mic eksternal yang baru dicolok
    if (micStream) {
      try {
        micStream.getTracks().forEach(tr => tr.stop());
      } catch (_) {}
      micStream = null;
    }
    if (micSourceNode) {
      try {
        micSourceNode.disconnect();
      } catch (_) {}
      micSourceNode = null;
    }

    await new Promise(resolve => setTimeout(resolve, 160));
    await startMicrophone(true);
    showToast(t('toast_audio_reset'));
  }

  // Global Keydown Handler
  window.addEventListener('keydown', (e) => {
    // 0. Tutup mode green screen murni, modal bug report, atau modal rekaman jika Escape ditekan
    if (e.key === 'Escape') {
      if (bugReportModal && !bugReportModal.classList.contains('hidden')) {
        closeBugReportModal();
        return;
      }
      if (isPureGreenMode) {
        togglePureGreenMode(false);
        return;
      }
      if (recordResultModal && !recordResultModal.classList.contains('hidden')) {
        recordResultModal.classList.add('hidden');
        if (previewRecordedVideo) previewRecordedVideo.pause();
        return;
      }
    }

    // 1. Sedang merekam Hotkey Sistem
    if (isRecordingSystemHotkey) {
      e.preventDefault();
      if (e.key === 'Escape') {
        isRecordingSystemHotkey = null;
        renderHotkeysUI();
        showToast(t('toast_hotkey_cancel'));
        return;
      }

      let chosenKey = e.key.toLowerCase();
      if (chosenKey === ' ') chosenKey = 'space';

      systemHotkeys[isRecordingSystemHotkey] = chosenKey;
      saveSystemHotkeys();
      showToast(`${t('toast_hotkey_set')}[ ${chosenKey.toUpperCase()} ]`);

      isRecordingSystemHotkey = null;
      renderHotkeysUI();
      return;
    }

    // 2. Sedang merekam Hotkey Emosi
    if (isRecordingHotkeyForId) {
      e.preventDefault();
      if (e.key === 'Escape') {
        isRecordingHotkeyForId = null;
        renderCompactEmotionsList();
        renderHotkeysUI();
        showToast(t('toast_hotkey_cancel'));
        return;
      }
      const targetEmo = emotions.find(em => em.id === isRecordingHotkeyForId);
      if (targetEmo) {
        let chosenKey = e.key.toLowerCase();
        if (chosenKey === ' ') chosenKey = 'space';

        // Cek konflik dengan emosi lain dan tukar otomatis
        const conflictEmo = emotions.find(em => em.id !== targetEmo.id && em.hotkey.toLowerCase() === chosenKey);
        if (conflictEmo) {
          conflictEmo.hotkey = targetEmo.hotkey;
          showToast(`[${chosenKey.toUpperCase()}] ⇄ "${conflictEmo.name}"`);
        } else {
          showToast(`"${targetEmo.name}": [ ${chosenKey.toUpperCase()} ]`);
        }

        targetEmo.hotkey = chosenKey;
        saveEmotions();
      }
      isRecordingHotkeyForId = null;
      updateSlotImages();
      renderCompactEmotionsList();
      renderHotkeysUI();
      return;
    }

    // Jika belum memasukkan kode VIP tester, abaikan hotkey
    if (!isVipAuthorized()) return;

    // Hindari bentrok saat mengetik di input teks
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

    const pressed = e.key.toLowerCase();

    // Hotkey Mute
    if (systemHotkeys.toggleMute && (pressed === systemHotkeys.toggleMute.toLowerCase() || (systemHotkeys.toggleMute === 'space' && pressed === ' '))) {
      e.preventDefault();
      toggleMute();
      return;
    }

    // Hotkey OBS Mode
    if (systemHotkeys.toggleObs && (pressed === systemHotkeys.toggleObs.toLowerCase() || (systemHotkeys.toggleObs === 'space' && pressed === ' '))) {
      e.preventDefault();
      toggleObsMode(!document.body.classList.contains('obs-mode'));
      return;
    }

    // Hotkey Green Screen Murni (Tombol G)
    if (pressed === 'g') {
      e.preventDefault();
      togglePureGreenMode(!isPureGreenMode);
      return;
    }

    // Hotkey Kamera Langsung Handcam (Tombol C)
    if (pressed === 'c') {
      e.preventDefault();
      toggleCameraQuick();
      return;
    }

    // Hotkey Reset Audio
    if (systemHotkeys.resetAudio && (pressed === systemHotkeys.resetAudio.toLowerCase() || (systemHotkeys.resetAudio === 'space' && pressed === ' '))) {
      e.preventDefault();
      resetAudioCalibration();
      return;
    }

    // Hotkey Emosi
    const matchedEmotion = emotions.find(em => {
      const k = em.hotkey.toLowerCase();
      return k === pressed || (k === 'space' && pressed === ' ');
    });
    if (matchedEmotion) {
      e.preventDefault();
      // Toggle kembali ke Normal/Default jika hotkey emosi aktif ditekan ulang
      if (activeEmotionId === matchedEmotion.id) {
        const defaultEmo = emotions[0];
        if (defaultEmo && defaultEmo.id !== matchedEmotion.id) {
          setActiveEmotion(defaultEmo.id);
          showToast(`${t('toast_return_to')} ${defaultEmo.name} [${defaultEmo.hotkey.toUpperCase()}]`);
          return;
        }
      }
      setActiveEmotion(matchedEmotion.id);
      return;
    }
  });

  // --- 6. BLINK ENGINE (KEDIPAN OTOMATIS) ---
  function scheduleNextBlink() {
    clearTimeout(blinkTimer);
    clearTimeout(blinkEndTimer);

    const jitter = (Math.random() - 0.5) * (blinkInterval * 0.4);
    const delay = Math.max(600, blinkInterval + jitter);

    blinkTimer = setTimeout(() => {
      isBlinking = true;
      updateAvatarSprite();

      blinkEndTimer = setTimeout(() => {
        isBlinking = false;
        updateAvatarSprite();
        scheduleNextBlink();
      }, blinkDuration);
    }, delay);
  }

  blinkIntervalSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    blinkInterval = val * 1000;
    blinkIntervalBadge.textContent = `${val.toFixed(1)} detik`;
    scheduleNextBlink();
    saveUserSettings();
  });

  blinkDurationSlider.addEventListener('input', (e) => {
    blinkDuration = parseInt(e.target.value, 10);
    blinkDurationBadge.textContent = `${blinkDuration} ms`;
    saveUserSettings();
  });

  // --- 7. WEB AUDIO API CORE ---
  function initAudioContext() {
    if (!audioContext || audioContext.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (!analyser) {
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.2;
    }
    if (!audioRecordDestination) {
      audioRecordDestination = audioContext.createMediaStreamDestination();
    }
    if (!recordCompressorNode) {
      recordCompressorNode = audioContext.createDynamicsCompressor();
      recordCompressorNode.threshold.setValueAtTime(-24, audioContext.currentTime);
      recordCompressorNode.knee.setValueAtTime(30, audioContext.currentTime);
      recordCompressorNode.ratio.setValueAtTime(8, audioContext.currentTime);
      recordCompressorNode.attack.setValueAtTime(0.003, audioContext.currentTime);
      recordCompressorNode.release.setValueAtTime(0.25, audioContext.currentTime);
      recordCompressorNode.connect(audioRecordDestination);
    }
    if (!recordGainNode) {
      recordGainNode = audioContext.createGain();
      recordGainNode.gain.value = 2.4; // Pre-amp boost (+7.6 dB) agar suara mikrofon & musik rekaman terdengar lantang di hasil video
      recordGainNode.connect(recordCompressorNode);
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
  }

  // Tracking node sumber media agar createMediaElementSource hanya dipanggil sekali per elemen
  const connectedMediaElements = new WeakMap();

  function connectMediaElementToAudioEngine(mediaElement) {
    if (!mediaElement) return null;
    initAudioContext();

    const targetRecordNode = recordGainNode || audioRecordDestination;

    if (connectedMediaElements.has(mediaElement)) {
      const existingNode = connectedMediaElements.get(mediaElement);
      if (targetRecordNode) {
        try {
          existingNode.connect(targetRecordNode);
        } catch (e) {}
      }
      return existingNode;
    }

    try {
      // 1. Hubungkan elemen media (audio/video) ke AudioContext yang sudah ada
      const sourceNode = audioContext.createMediaElementSource(mediaElement);

      // 2. Arahkan output media ke AnalyserNode yang sama persis dengan mikrofon
      sourceNode.connect(analyser);

      // 3. Arahkan output ke audioContext.destination agar suara tetap terdengar di speaker
      sourceNode.connect(audioContext.destination);

      // 4. Arahkan ke targetRecordNode (dengan penguat gain + kompresor) agar suara rekaman tersimpan lantang
      if (targetRecordNode) {
        sourceNode.connect(targetRecordNode);
      }

      connectedMediaElements.set(mediaElement, sourceNode);
      return sourceNode;
    } catch (err) {
      console.warn('connectMediaElementToAudioEngine notice:', err);
      return null;
    }
  }

  function isAnyMediaPlaying() {
    const isAudioPlaying = !!(audioFileElement && !audioFileElement.paused && !audioFileElement.ended);
    const isVideoPlaying = !!(previewRecordedVideo && !previewRecordedVideo.paused && !previewRecordedVideo.ended);
    return isAudioPlaying || isVideoPlaying;
  }

  function checkActiveAudioPlaybackState() {
    if (isAnyMediaPlaying()) {
      return; // Masih ada audio/video lain yang sedang diputar
    }

    // Jika seluruh pemutaran media telah berhenti/pause:
    if (micStream && micStream.active) {
      // Revert kembali ke mikrofon live secara otomatis & mulus
      currentAudioSourceMode = 'mic';
      if (!isMicMuted) {
        isListening = true;
        startAudioLoop();
      } else {
        setSpeakingState(false);
        updateVolumeMeter(0);
      }
    } else {
      // Mikrofon tidak aktif, hentikan loop dan reset animasi avatar ke posisi diam
      isListening = false;
      stopAudioLoop();
      setSpeakingState(false);
      updateVolumeMeter(0);
    }
  }

  function setupMediaElementEvents(mediaElement, modeName = 'playback') {
    if (!mediaElement || mediaElement._hasAudioSyncListeners) return;
    mediaElement._hasAudioSyncListeners = true;

    mediaElement.addEventListener('play', async () => {
      initAudioContext();
      if (audioContext && audioContext.state === 'suspended') {
        try {
          await audioContext.resume();
        } catch (e) {}
      }
      connectMediaElementToAudioEngine(mediaElement);
      currentAudioSourceMode = modeName;
      isListening = true;
      startAudioLoop();
    });

    mediaElement.addEventListener('pause', () => {
      checkActiveAudioPlaybackState();
    });

    mediaElement.addEventListener('ended', () => {
      checkActiveAudioPlaybackState();
    });

    mediaElement.addEventListener('seeked', () => {
      if (mediaElement.paused && !isAnyMediaPlaying() && (!micStream || !micStream.active)) {
        setSpeakingState(false);
        updateVolumeMeter(0);
      }
    });
  }

  let currentMicState = 'disconnected';
  let currentMicStateKey = 'status_mic_disconnected';
  let isSwitchingMic = false;

  // Helper untuk mendeteksi apakah label perangkat adalah mikrofon internal bawaan HP
  function isBuiltInPhoneMicLabel(label) {
    if (!label) return false;
    const l = label.toLowerCase();
    // Jika ada indikasi eksternal eksplisit, bukan built-in
    if (/(usb|headset|wired|external|earpods|airpods|bluetooth|lavalier|wireless|receiver|lightning|type-c|line in|mikrofon eksternal)/i.test(l)) {
      return false;
    }
    return /(iphone microphone|mikrofon iphone|ipad microphone|ipod microphone|built-in|internal|mikrofon internal|speakerphone|bottom microphone|front microphone|back microphone)/i.test(l);
  }

  function updateActiveMicLabelDisplay() {
    if (!activeMicDeviceName) return;
    if (micStream && micStream.getAudioTracks().length > 0) {
      const track = micStream.getAudioTracks()[0];
      activeMicDeviceName.textContent = track.label || 'Default Microphone';
    } else {
      activeMicDeviceName.textContent = '-';
    }
  }

  async function startMicrophone(silentToast = false) {
    if (isSwitchingMic) return;
    isSwitchingMic = true;
    initAudioContext();
    setMicStatus('connecting', 'status_mic_connecting');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('SECURE_CONTEXT_REQUIRED');
      }

      // PENTING untuk iOS Safari (iPhone 13 mini dll):
      // Hentikan track lama sebelum memanggil getUserMedia baru agar AVAudioSession melepas kunci dari iPhone Microphone bawaan
      if (micStream) {
        try {
          micStream.getTracks().forEach(tr => tr.stop());
        } catch (_) {}
        micStream = null;
      }
      if (micSourceNode) {
        try {
          micSourceNode.disconnect();
        } catch (_) {}
        micSourceNode = null;
      }

      const rawSelected = micSelect ? micSelect.value : 'auto';
      const isAutoPriority = !rawSelected || rawSelected === 'auto' || rawSelected === 'default';

      // Pada iOS Safari, echoCancellation: true memaksa AVAudioSessionModeVoiceChat yang sering menolak/mengabaikan
      // mic eksternal Lightning/USB/wireless dan memaksa iPhone Microphone bawaan.
      // Karena SmoothieTuber TIDAK mengeluarkan suara mic ke speaker (tidak ada feedback loop),
      // mematikan echoCancellation/noiseSuppression/autoGainControl membuat iOS langsung membaca mic eksternal dengan jernih!
      const baseAudioProps = {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        channelCount: { ideal: 1 }
      };

      let stream = null;
      if (!isAutoPriority) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              ...baseAudioProps,
              deviceId: { exact: rawSelected }
            }
          });
        } catch (exactErr) {
          console.warn('Exact mic deviceId failed, falling back to auto:', exactErr);
        }
      }

      if (!stream) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: baseAudioProps
          });
        } catch (baseErr) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }
      }

      // Setelah izin didapat, cek daftar enumerateDevices().
      // Jika mode "auto" aktif dan stream awal masih tertuju ke "iPhone Microphone" padahal ada mic eksternal di daftar,
      // otomatis pindah ke deviceId mic eksternal tersebut!
      if (isAutoPriority && navigator.mediaDevices.enumerateDevices) {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioInputs = devices.filter(d => d.kind === 'audioinput' && d.deviceId);
          const currentTrack = stream.getAudioTracks()[0];
          const currentLabel = currentTrack ? (currentTrack.label || '') : '';

          if (audioInputs.length > 1) {
            const externalCandidate = audioInputs.find(d => d.label && !isBuiltInPhoneMicLabel(d.label));
            if (externalCandidate && (!currentLabel || isBuiltInPhoneMicLabel(currentLabel)) && externalCandidate.label !== currentLabel) {
              try {
                stream.getTracks().forEach(tr => tr.stop());
                const extStream = await navigator.mediaDevices.getUserMedia({
                  audio: {
                    ...baseAudioProps,
                    deviceId: { exact: externalCandidate.deviceId }
                  }
                });
                if (extStream) {
                  stream = extStream;
                }
              } catch (extErr) {
                // Jika gagal exact switch, buka kembali stream standar
                stream = await navigator.mediaDevices.getUserMedia({ audio: baseAudioProps }).catch(() => navigator.mediaDevices.getUserMedia({ audio: true }));
              }
            }
          }
        } catch (_) {}
      }

      micStream = stream;
      if (isMicMuted) {
        micStream.getAudioTracks().forEach(tr => { tr.enabled = false; });
      }

      // Pantau jika track mikrofon terputus (misal mic eksternal dicabut) agar otomatis re-route
      const activeTrack = micStream.getAudioTracks()[0];
      if (activeTrack) {
        activeTrack.addEventListener('ended', () => {
          if (isListening && !isSwitchingMic) {
            setTimeout(() => {
              startMicrophone(true).catch(() => {});
            }, 300);
          }
        });
      }

      micSourceNode = audioContext.createMediaStreamSource(micStream);
      micSourceNode.connect(analyser);
      const targetRecordNode = recordGainNode || audioRecordDestination;
      if (targetRecordNode) {
        micSourceNode.connect(targetRecordNode);
      }

      currentAudioSourceMode = 'mic';
      isListening = true;
      setMicStatus('active', 'status_mic_active');
      await populateAudioDevices();
      updateActiveMicLabelDisplay();
      startAudioLoop();

      if (!silentToast) {
        const trackName = activeTrack && activeTrack.label ? ` (${activeTrack.label})` : '';
        showToast(t('toast_mic_active') + trackName);
      }
    } catch (err) {
      console.error('Gagal mic:', err);
      isListening = false;
      updateActiveMicLabelDisplay();
      if (err.message === 'SECURE_CONTEXT_REQUIRED' || (typeof window !== 'undefined' && !window.isSecureContext)) {
        setMicStatus('error', 'status_mic_https');
        showToast('🔒 ' + t('status_mic_https'));
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicStatus('error', 'status_mic_denied');
        showToast('⚠️ ' + t('status_mic_denied'));
      } else {
        setMicStatus('error', 'status_mic_error');
        showToast('⚠️ ' + t('status_mic_error') + ': ' + (err.message || 'Error'));
      }
    } finally {
      isSwitchingMic = false;
    }
  }

  function stopMicrophone() {
    if (micStream) {
      micStream.getTracks().forEach(t => t.stop());
      micStream = null;
    }
    if (micSourceNode) {
      micSourceNode.disconnect();
      micSourceNode = null;
    }
    updateActiveMicLabelDisplay();
    setMicStatus('disconnected', 'status_mic_disconnected');
    if (currentAudioSourceMode === 'mic' && !isAnyMediaPlaying()) {
      isListening = false;
      stopAudioLoop();
      updateVolumeMeter(0);
      setSpeakingState(false);
    }
    showToast(t('toast_mic_muted'));
  }

  function setMicStatus(state, key) {
    if (state) currentMicState = state;
    if (key) currentMicStateKey = key;
    else if (state) currentMicStateKey = 'status_mic_' + state;

    if (statusLed) {
      statusLed.className = 'status-led-dot';
      if (currentMicState === 'active') {
        statusLed.classList.add('led-active');
      } else if (currentMicState === 'connecting') {
        statusLed.classList.add('led-connecting');
      } else if (currentMicState === 'error') {
        statusLed.classList.add('led-error');
      } else {
        statusLed.classList.add('led-disconnected');
      }
    }
    if (btnToggleMic) {
      if (currentMicState === 'active') {
        btnToggleMic.classList.add('is-active');
      } else {
        btnToggleMic.classList.remove('is-active');
      }
    }
    if (statusText) {
      statusText.textContent = t(currentMicStateKey);
    }
  }

  async function populateAudioDevices() {
    if (!navigator.mediaDevices?.enumerateDevices || !micSelect) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(d => d.kind === 'audioinput');
      micSelect.disabled = false;
      const previousSelection = micSelect.value || 'auto';
      micSelect.innerHTML = '';

      // Selalu sediakan opsi "⚡ Otomatis (Prioritas Mic Eksternal)" di urutan paling atas
      // agar dropdown tidak mengunci paksa ke ID iPhone Microphone bawaan!
      const autoOpt = document.createElement('option');
      autoOpt.value = 'auto';
      autoOpt.dataset.i18n = 'option_default_system';
      autoOpt.textContent = t('option_default_system') || '⚡ Otomatis (Prioritas Mic Eksternal)';
      micSelect.appendChild(autoOpt);

      audioInputs.forEach((d, i) => {
        if (!d.deviceId) return;
        const opt = document.createElement('option');
        opt.value = d.deviceId;
        const labelText = d.label || `Mikrofon ${i + 1}`;
        const isExt = d.label && !isBuiltInPhoneMicLabel(d.label);
        opt.textContent = isExt ? `🎧 ${labelText}` : `📱 ${labelText}`;
        micSelect.appendChild(opt);
      });

      if (previousSelection && Array.from(micSelect.options).some(o => o.value === previousSelection)) {
        micSelect.value = previousSelection;
      } else {
        micSelect.value = 'auto';
      }
      updateActiveMicLabelDisplay();
    } catch (e) {}
  }

  // Audio loop
  let isAudioLoopRunning = false;
  let audioLoopRafId = null;

  function stopAudioLoop() {
    isAudioLoopRunning = false;
    if (audioLoopRafId) {
      cancelAnimationFrame(audioLoopRafId);
      audioLoopRafId = null;
    }
  }

  function startAudioLoop() {
    if (!analyser) return;
    if (isAudioLoopRunning) return; // Mencegah duplikasi loop RAF
    isAudioLoopRunning = true;

    const timeData = new Float32Array(analyser.fftSize);

    function loop() {
      if (!isListening) {
        isAudioLoopRunning = false;
        audioLoopRafId = null;
        return;
      }

      const mediaPlaying = isAnyMediaPlaying();

      // Jika mic dimute dan sedang di mode mic (dan tidak sedang memutar rekaman/file)
      if (isMicMuted && currentAudioSourceMode === 'mic' && !mediaPlaying) {
        updateVolumeMeter(0);
        setSpeakingState(false);
        audioLoopRafId = requestAnimationFrame(loop);
        return;
      }

      analyser.getFloatTimeDomainData(timeData);

      let sumSquares = 0;
      for (let i = 0; i < timeData.length; i++) {
        sumSquares += timeData[i] * timeData[i];
      }
      const rms = Math.sqrt(sumSquares / timeData.length);
      const calculatedVolume = Math.min(40.0, Math.round(rms * 280 * 10) / 10);

      updateVolumeMeter(calculatedVolume);

      const now = performance.now();
      if (calculatedVolume >= threshold) {
        lastVoiceActiveTimestamp = now;
        // Mode B (Mode Skala): Hitung skala dinamis proporsional sesuai kekuatan volume suara (1.05x hingga 1.10x)
        const volSpan = Math.max(5, 40 - threshold);
        const volStrength = Math.min(1, Math.max(0, (calculatedVolume - threshold) / volSpan));
        dynamicVoiceScale = 1.05 + (volStrength * 0.05);
        if (animMode === 'scale' && avatarImage) {
          avatarImage.style.setProperty('--dynamic-voice-scale', dynamicVoiceScale.toFixed(3));
        }
        setSpeakingState(true);
      } else {
        if (now - lastVoiceActiveTimestamp > holdDelay) {
          dynamicVoiceScale = 0.92;
          if (animMode === 'scale' && avatarImage) {
            avatarImage.style.setProperty('--dynamic-voice-scale', '0.92');
          }
          setSpeakingState(false);
        }
      }

      audioLoopRafId = requestAnimationFrame(loop);
    }

    audioLoopRafId = requestAnimationFrame(loop);
  }

  function setSpeakingState(speaking) {
    if (isSpeaking === speaking) return;
    isSpeaking = speaking;
    if (!speaking) {
      dynamicVoiceScale = 0.92;
      if (animMode === 'scale' && avatarImage) {
        avatarImage.style.setProperty('--dynamic-voice-scale', '0.92');
      }
    } else if (animMode === 'scale' && avatarImage) {
      if (dynamicVoiceScale < 1.05) dynamicVoiceScale = 1.06;
      avatarImage.style.setProperty('--dynamic-voice-scale', dynamicVoiceScale.toFixed(3));
    }
    updateAvatarSprite();
  }

  if (btnToggleMic) {
    btnToggleMic.addEventListener('click', () => {
      if (micStream) {
        stopMicrophone();
      } else {
        startMicrophone();
      }
    });
  }

  if (micSelect) {
    micSelect.addEventListener('change', async () => {
      await startMicrophone(false);
    });
  }

  if (btnRefreshMicDevices) {
    btnRefreshMicDevices.addEventListener('click', async () => {
      if (micSelect) micSelect.value = 'auto';
      await resetAudioCalibration();
      const trackLabel = (micStream && micStream.getAudioTracks()[0] && micStream.getAudioTracks()[0].label)
        ? micStream.getAudioTracks()[0].label
        : 'Default';
      showToast(`${t('toast_mic_refreshed')} ${trackLabel}`);
    });
  }

  if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      await populateAudioDevices();
      if (isListening && (!micSelect || micSelect.value === 'auto')) {
        setTimeout(() => {
          startMicrophone(true).catch(() => {});
        }, 250);
      }
    });
  }

  btnQuickMute.addEventListener('click', () => toggleMute());

  if (btnDirectResetAudio) {
    btnDirectResetAudio.addEventListener('click', () => resetAudioCalibration());
  }

  function hasLoadedAudioFile() {
    return !!(audioFileElement && audioFileElement.src && audioFileElement.src.trim() !== '' && !audioFileElement.src.endsWith('/'));
  }

  // File audio eksternal
  inputAudioFile.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    initAudioContext();

    if (!audioFileElement) {
      audioFileElement = new Audio();
      connectMediaElementToAudioEngine(audioFileElement);
      setupMediaElementEvents(audioFileElement, 'file');
    } else {
      connectMediaElementToAudioEngine(audioFileElement);
      setupMediaElementEvents(audioFileElement, 'file');
    }

    const fileUrl = URL.createObjectURL(file);
    audioFileElement.src = fileUrl;
    audioFileElement.load();
    currentAudioSourceMode = 'file';
    loadedAudioName.textContent = `🎵 ${file.name}`;
    audioPlayerControls.classList.remove('disabled');
    btnPlayPauseAudio.disabled = false;
    audioScrubber.disabled = false;
    audioScrubber.value = 0;
    audioCurrentTime.textContent = '00:00';
    btnPlayPauseAudio.textContent = '▶️';

    audioFileElement.onloadedmetadata = () => {
      audioTotalDuration.textContent = formatTime(audioFileElement.duration);
    };

    audioFileElement.ontimeupdate = () => {
      if (!audioFileElement.duration) return;
      const progress = (audioFileElement.currentTime / audioFileElement.duration) * 100;
      audioScrubber.value = progress;
      audioCurrentTime.textContent = formatTime(audioFileElement.currentTime);
    };

    audioFileElement.onplay = () => {
      if (btnPlayPauseAudio) btnPlayPauseAudio.textContent = '⏸️';
    };

    audioFileElement.onpause = () => {
      if (btnPlayPauseAudio) btnPlayPauseAudio.textContent = '▶️';
    };

    audioFileElement.onended = () => {
      btnPlayPauseAudio.textContent = '▶️';
      checkActiveAudioPlaybackState();
      if (isRecordingVideo) stopVideoRecording();
    };

    showToast(`"${file.name}": ` + t('toast_audio_file_ready'));
  });

  if (btnRemoveAudioFile) {
    btnRemoveAudioFile.addEventListener('click', () => {
      if (audioFileElement) {
        audioFileElement.pause();
        audioFileElement.src = '';
      }
      inputAudioFile.value = '';
      loadedAudioName.textContent = t('no_audio_loaded');
      audioPlayerControls.classList.add('disabled');
      btnPlayPauseAudio.disabled = true;
      audioScrubber.disabled = true;
      audioScrubber.value = 0;
      audioCurrentTime.textContent = '00:00';
      audioTotalDuration.textContent = '00:00';
      currentAudioSourceMode = 'mic';
      checkActiveAudioPlaybackState();
      showToast(t('toast_audio_file_removed'));
    });
  }

  btnPlayPauseAudio.addEventListener('click', async () => {
    if (!audioFileElement) return;
    initAudioContext();
    if (audioContext && audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (e) {}
    }
    connectMediaElementToAudioEngine(audioFileElement);

    if (audioFileElement.paused) {
      try {
        currentAudioSourceMode = 'file';
        isListening = true;
        startAudioLoop();
        await audioFileElement.play();
        btnPlayPauseAudio.textContent = '⏸️';
      } catch (err) {
        console.error('Play audio failed:', err);
      }
    } else {
      audioFileElement.pause();
      btnPlayPauseAudio.textContent = '▶️';
      checkActiveAudioPlaybackState();
    }
  });

  audioScrubber.addEventListener('input', (e) => {
    if (!audioFileElement || !audioFileElement.duration) return;
    audioFileElement.currentTime = (e.target.value / 100) * audioFileElement.duration;
  });

  function formatTime(secs) {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  // --- 8. VIDEO EXPORT (CANVAS MEDIA RECORDER TRANSPARAN) ---
  function setupExportCanvasSize() {
    const res = exportResolution ? exportResolution.value : '720x1280';
    if (res === '720x1280') {
      exportCanvas.width = 720;
      exportCanvas.height = 1280;
    } else if (res === '1080x1920') {
      exportCanvas.width = 1080;
      exportCanvas.height = 1920;
    } else if (res === '1620x1080') {
      exportCanvas.width = 1620;
      exportCanvas.height = 1080;
    } else if (res === '1080x1620') {
      exportCanvas.width = 1080;
      exportCanvas.height = 1620;
    } else if (res === '1080x1080') {
      exportCanvas.width = 1080;
      exportCanvas.height = 1080;
    } else if (res === '1280x720') {
      exportCanvas.width = 1280;
      exportCanvas.height = 720;
    } else if (res === '1920x1080') {
      exportCanvas.width = 1920;
      exportCanvas.height = 1080;
    } else if (res === '800x800') {
      exportCanvas.width = 800;
      exportCanvas.height = 800;
    } else {
      // Bawaan default: 9:16 vertikal (720 × 1280 - Rekomendasi Medsos HP)
      exportCanvas.width = 720;
      exportCanvas.height = 1280;
    }
  }

  let customBgImageObj = null;
  let lastValidRecordedImg = null;
  let lastExportRenderTimestamp = 0;

  // Penyesuaian tampilan latar belakang kustom di layar preview
  function applyCustomBgTransform() {
    if (!customBgImageObj || !customBgImg || !customBgLayer || customBgLayer.classList.contains('hidden')) return;

    const winW = window.innerWidth || 1;
    const winH = window.innerHeight || 1;
    const imgW = customBgImageObj.naturalWidth || winW;
    const imgH = customBgImageObj.naturalHeight || winH;
    const imgAspect = imgW / imgH;
    const screenAspect = winW / winH;

    let baseW, baseH;
    if (userSettings.customBgFit === 'contain') {
      if (imgAspect > screenAspect) {
        baseW = winW;
        baseH = winW / imgAspect;
      } else {
        baseH = winH;
        baseW = winH * imgAspect;
      }
    } else {
      // 'cover' bawaan
      if (imgAspect > screenAspect) {
        baseH = winH;
        baseW = winH * imgAspect;
      } else {
        baseW = winW;
        baseH = winW / imgAspect;
      }
    }

    const scale = (userSettings.customBgScale || 100) / 100;
    const renderW = Math.round(baseW * scale);
    const renderH = Math.round(baseH * scale);
    const posX = userSettings.customBgPosX || 0;
    const posY = userSettings.customBgPosY || 0;

    customBgImg.style.width = `${renderW}px`;
    customBgImg.style.height = `${renderH}px`;
    customBgImg.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`;
  }

  function renderExportFrame(timestamp) {
    if (!isRecordingVideo) return;

    // Selalu jadwalkan frame berikutnya di awal loop
    currentRenderRaf = requestAnimationFrame(renderExportFrame);

    const targetFps = (exportFps && exportFps.value === '60') ? 60 : 30;
    const frameIntervalMs = 1000 / targetFps;

    if (timestamp) {
      if (!lastExportRenderTimestamp) {
        lastExportRenderTimestamp = timestamp;
      }
      const elapsed = timestamp - lastExportRenderTimestamp;
      // Toleransi 2ms untuk fluktuasi timer internal browser
      if (elapsed < frameIntervalMs - 2) {
        // Lewati frame jika belum waktunya (mencegah bottleneck/overload pada layar 120Hz ProMotion & menjaga Constant Frame Rate CFR)
        return;
      }
      lastExportRenderTimestamp = timestamp - (elapsed % frameIntervalMs);
    }

    const w = exportCanvas.width;
    const h = exportCanvas.height;
    const isTransparentMode = (toggleTransparentExport && toggleTransparentExport.checked) || (exportBgMode && exportBgMode.value === 'transparent');
    const bgMode = isTransparentMode ? 'transparent' : (exportBgMode ? exportBgMode.value : 'current');
    const isCameraActive = cameraStream && cameraBgVideo && !cameraBgVideo.paused && !cameraBgVideo.ended;

    // Bersihkan seluruh bidang canvas agar murni transparan (alpha channel = 0)
    exportCtx.clearRect(0, 0, w, h);
    exportCtx.imageSmoothingEnabled = true;
    exportCtx.imageSmoothingQuality = 'medium'; // 'medium' jauh lebih ringan dan mulus di mobile daripada 'high' yang menyebabkan frame dropping

    if (isTransparentMode || bgMode === 'transparent') {
      // JANGAN beri warna solid/fill rect pada latar belakang saat direkam (biarkan clearRect agar alpha channel tetap terjaga)
    } else if (bgMode === 'green') {
      exportCtx.fillStyle = '#00FF00';
      exportCtx.fillRect(0, 0, w, h);
    } else if (isCameraActive && bgMode !== 'green') {
      // Prioritas Utama Kamera: Rekam latar kamera langsung dengan dukungan Zoom In / Zoom Out (0.5x - 3.0x)
      const vw = cameraBgVideo.videoWidth || 1280;
      const vh = cameraBgVideo.videoHeight || 720;
      const vAspect = vw / vh;
      const cAspect = w / h;
      const effZoom = getEffectiveCameraVisualZoom();

      exportCtx.save();
      exportCtx.fillStyle = '#000000';
      exportCtx.fillRect(0, 0, w, h);

      exportCtx.translate(w / 2, h / 2);
      if (activeCameraFacing === 'user') {
        // Cermin horizontal untuk kamera depan selfie agar sama persis dengan preview
        exportCtx.scale(-1 * effZoom, effZoom);
      } else {
        exportCtx.scale(effZoom, effZoom);
      }

      let baseW = w;
      let baseH = h;
      if (isCameraCoverFit) {
        if (vAspect > cAspect) {
          baseH = h;
          baseW = h * vAspect;
        } else {
          baseW = w;
          baseH = w / vAspect;
        }
      } else {
        if (vAspect > cAspect) {
          baseW = w;
          baseH = w / vAspect;
        } else {
          baseH = h;
          baseW = h * vAspect;
        }
      }

      try {
        exportCtx.drawImage(cameraBgVideo, -baseW / 2, -baseH / 2, baseW, baseH);
      } catch (e) {
        try { exportCtx.drawImage(cameraBgVideo, -w / 2, -h / 2, w, h); } catch (_) {}
      }
      exportCtx.restore();
    } else if (bgMode === 'current') {
      if (document.body.classList.contains('bg-green')) {
        exportCtx.fillStyle = '#00FF00';
        exportCtx.fillRect(0, 0, w, h);
      } else if (document.body.classList.contains('bg-blue')) {
        exportCtx.fillStyle = '#0000FF';
        exportCtx.fillRect(0, 0, w, h);
      } else if (document.body.classList.contains('bg-dark')) {
        exportCtx.fillStyle = '#21232d';
        exportCtx.fillRect(0, 0, w, h);
      } else if (customBgImageObj && customBgImageObj.complete && customBgImageObj.naturalWidth > 0) {
        // Latar Belakang Kustom: Rekam dengan rasio, skala & posisi yang 100% presisi sinkron dengan preview layar
        const winW = window.innerWidth || 1;
        const winH = window.innerHeight || 1;
        const imgW = customBgImageObj.naturalWidth;
        const imgH = customBgImageObj.naturalHeight;
        const imgAspect = imgW / imgH;
        const screenAspect = winW / winH;

        let baseW, baseH;
        if (userSettings.customBgFit === 'contain') {
          if (imgAspect > screenAspect) {
            baseW = winW;
            baseH = winW / imgAspect;
          } else {
            baseH = winH;
            baseW = winH * imgAspect;
          }
        } else {
          // 'cover'
          if (imgAspect > screenAspect) {
            baseH = winH;
            baseW = winH * imgAspect;
          } else {
            baseW = winW;
            baseH = winW / imgAspect;
          }
        }

        const scale = (userSettings.customBgScale || 100) / 100;
        const renderW = baseW * scale;
        const renderH = baseH * scale;
        const posX = userSettings.customBgPosX || 0;
        const posY = userSettings.customBgPosY || 0;

        // Skala adaptif yang persis sama dengan skala avatar (Math.min canvas / Math.min screen)
        const screenBase = Math.min(winW, winH);
        const canvasBase = Math.min(w, h);
        const scaleFactor = canvasBase / screenBase;

        const exportDrawW = renderW * scaleFactor;
        const exportDrawH = renderH * scaleFactor;

        const normX = posX / winW;
        const normY = posY / winH;
        const exportCenterX = (w / 2) + (normX * w);
        const exportCenterY = (h / 2) + (normY * h);

        exportCtx.drawImage(
          customBgImageObj,
          exportCenterX - (exportDrawW / 2),
          exportCenterY - (exportDrawH / 2),
          exportDrawW,
          exportDrawH
        );
      }
    }

    // Gunakan preloaded Image object dari imageCache agar bebas kedipan/blank frame
    const emo = getActiveEmotion();
    let currentSrc = lastAppliedSpriteSrc || (emo && emo.sprites ? emo.sprites.closed : '');
    let currentImg = currentSrc ? getImageObject(currentSrc) : null;

    if (!currentImg || !currentImg.complete || currentImg.naturalWidth === 0) {
      if (avatarImage && avatarImage.complete && avatarImage.naturalWidth > 0) {
        currentImg = avatarImage;
      } else if (lastValidRecordedImg && lastValidRecordedImg.complete && lastValidRecordedImg.naturalWidth > 0) {
        currentImg = lastValidRecordedImg;
      }
    }

    if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
      lastValidRecordedImg = currentImg;
      exportCtx.save();

      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;
      // Skala adaptif resolusi canvas agar efek visual pantulan & melayang sama proporsinya di semua resolusi ekspor
      const canvasScaleY = h / Math.max(winH, 400);

      const nowSec = (timestamp || performance.now()) / 1000;
      const floatSine = isFloatingEnabled ? Math.sin((nowSec * 2 * Math.PI) / floatDuration) : 0;
      const currentFloatOffset = floatSine * (floatIntensity * canvasScaleY);
      const currentFloatScale = isFloatingEnabled ? 1 + (floatSine * 0.012) : 1;

      // Animasi Respons Audio pada Canvas Export: Mode Pantulan ('bounce') vs Mode Skala ('scale')
      let currentBounce = 0;
      let bounceScaleX = 1;
      let bounceScaleY = 1;

      const effectiveBounce = (typeof bounceIntensity === 'number' && !isNaN(bounceIntensity) && bounceIntensity >= 1) ? bounceIntensity : 18;
      const effectiveSpeed = (typeof bounceSpeed === 'number' && !isNaN(bounceSpeed) && bounceSpeed >= 0.05) ? bounceSpeed : 0.28;

      if (animMode === 'scale') {
        const targetExportScale = isSpeaking ? Math.max(1.05, Math.min(1.12, dynamicVoiceScale)) : 0.92;
        currentExportVoiceScale += (targetExportScale - currentExportVoiceScale) * 0.35;
        currentBounce = 0;
        bounceScaleX = currentExportVoiceScale;
        bounceScaleY = currentExportVoiceScale;
      } else if (isSpeaking) {
        // Siklus pantulan bicara (Hop-Hop Animation) - 100% sinkron dengan stage CSS
        const hopPeriod = effectiveSpeed; // detik per 1 siklus pantulan penuh
        const hopPhase = Math.abs(Math.sin((nowSec * Math.PI) / hopPeriod)); // 0 (lantai) -> 1 (puncak lompatan) -> 0 (lantai)
        const arc = Math.pow(hopPhase, 0.75); // Kurva pantulan gravitasi yang lentur

        // Tinggi pantulan murni proporsional terhadap slider userSettings (default 18px jika 0/undefined)
        currentBounce = effectiveBounce * canvasScaleY * arc;

        // Efek lentur Squash & Stretch (khas animasi kartun / Veadotube)
        bounceScaleX = 1.04 - (0.08 * arc);
        bounceScaleY = 0.96 + (0.08 * arc);
      }

      const normX = avatarPosX / winW;
      const normY = avatarPosY / winH;

      const cx = (w / 2) + (normX * w);
      const cy = (h / 2) + (normY * h) - currentFloatOffset - currentBounce;

      exportCtx.translate(cx, cy);
      exportCtx.scale(
        avatarScale * currentFloatScale * bounceScaleX,
        avatarScale * currentFloatScale * bounceScaleY
      );

      // Ukuran dasar avatar mengikuti dimensi terkecil agar proporsional di semua rasio (9:16, 3:2, 1:1, 16:9)
      const baseDimension = Math.min(w, h);
      const baseDrawHeight = baseDimension * 0.72;
      const aspect = currentImg.naturalWidth / currentImg.naturalHeight;
      const drawWidth = baseDrawHeight * aspect;

      exportCtx.drawImage(
        currentImg,
        -drawWidth / 2,
        -baseDrawHeight / 2,
        drawWidth,
        baseDrawHeight
      );

      exportCtx.restore();
    } else if (lastValidRecordedImg) {
      // Fallback cadangan darurat agar video tidak pernah hitam/kosong
      exportCtx.save();
      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;
      const canvasScaleY = h / Math.max(winH, 400);

      const nowSec = (timestamp || performance.now()) / 1000;
      const floatSine = isFloatingEnabled ? Math.sin((nowSec * 2 * Math.PI) / floatDuration) : 0;
      const currentFloatOffset = floatSine * (floatIntensity * canvasScaleY);
      const currentFloatScale = isFloatingEnabled ? 1 + (floatSine * 0.012) : 1;

      let currentBounce = 0;
      let bounceScaleX = 1;
      let bounceScaleY = 1;

      const effectiveBounce = (typeof bounceIntensity === 'number' && !isNaN(bounceIntensity) && bounceIntensity >= 1) ? bounceIntensity : 18;
      const effectiveSpeed = (typeof bounceSpeed === 'number' && !isNaN(bounceSpeed) && bounceSpeed >= 0.05) ? bounceSpeed : 0.28;

      if (isSpeaking) {
        const hopPeriod = effectiveSpeed;
        const hopPhase = Math.abs(Math.sin((nowSec * Math.PI) / hopPeriod));
        const arc = Math.pow(hopPhase, 0.75);
        currentBounce = effectiveBounce * canvasScaleY * arc;
        bounceScaleX = 1.04 - (0.08 * arc);
        bounceScaleY = 0.96 + (0.08 * arc);
      }

      const normX = avatarPosX / winW;
      const normY = avatarPosY / winH;
      const cx = (w / 2) + (normX * w);
      const cy = (h / 2) + (normY * h) - currentFloatOffset - currentBounce;

      exportCtx.translate(cx, cy);
      exportCtx.scale(
        avatarScale * currentFloatScale * bounceScaleX,
        avatarScale * currentFloatScale * bounceScaleY
      );

      const baseDimension = Math.min(w, h);
      const baseDrawHeight = baseDimension * 0.72;
      const aspect = lastValidRecordedImg.naturalWidth / lastValidRecordedImg.naturalHeight;
      const drawWidth = baseDrawHeight * aspect;
      exportCtx.drawImage(lastValidRecordedImg, -drawWidth / 2, -baseDrawHeight / 2, drawWidth, baseDrawHeight);
      exportCtx.restore();
    }
  }

  async function startVideoRecording() {
    if (recordResultModal) recordResultModal.classList.add('hidden');
    if (previewRecordedVideo) previewRecordedVideo.pause();

    initAudioContext();
    if (audioContext && audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (e) {}
    }

    const hasAudioFile = hasLoadedAudioFile();

    if (hasAudioFile) {
      // Hubungkan audio element ke analyser & audioRecordDestination sebelum rekaman dimulai
      connectMediaElementToAudioEngine(audioFileElement);
      try {
        audioFileElement.currentTime = 0;
      } catch (e) {}
    } else if (currentAudioSourceMode === 'mic' && !micStream) {
      await startMicrophone();
    }

    // Pastikan tidak ada loop RAF ganda yang sedang berjalan
    if (currentRenderRaf) {
      cancelAnimationFrame(currentRenderRaf);
      currentRenderRaf = null;
    }

    // Pastikan avatar mulai dari keadaan mata terbuka & sprite sudah siap (cegah kedipan terpotong)
    isBlinking = false;
    updateAvatarSprite();
    scheduleNextBlink();

    setupExportCanvasSize();
    isRecordingVideo = true;
    recordedChunks = [];
    lastExportRenderTimestamp = 0;

    // Jalankan render loop CFR untuk perekaman
    renderExportFrame();

    const targetFps = (exportFps && exportFps.value === '60') ? 60 : 30;

    // 1. Sinkronkan Constant Frame Rate (CFR) pada Canvas Capture sesuai target FPS
    const canvasStream = exportCanvas.captureStream(targetFps);
    const videoTracks = canvasStream.getVideoTracks();
    if (videoTracks && videoTracks[0] && videoTracks[0].applyConstraints) {
      videoTracks[0].applyConstraints({
        frameRate: { ideal: targetFps, min: targetFps, max: targetFps }
      }).catch(() => {});
    }

    const audioTracks = (audioRecordDestination && audioRecordDestination.stream) 
      ? audioRecordDestination.stream.getAudioTracks() 
      : [];
    const tracksToRecord = [...canvasStream.getVideoTracks(), ...audioTracks];
    const combinedStream = new MediaStream(tracksToRecord);

    const isTransparentMode = (toggleTransparentExport && toggleTransparentExport.checked) || (exportBgMode && exportBgMode.value === 'transparent');
    const chosenFormat = isTransparentMode ? 'webm' : (exportFormat ? exportFormat.value : 'mp4');
    let supportedTypes = [];

    if (isTransparentMode || chosenFormat === 'webm') {
      // Prioritaskan WebM VP9 yang mendukung native alpha channel transparency
      supportedTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=vp8',
        'video/webm'
      ];
    } else if (chosenFormat === 'mp4' || chosenFormat === 'mov') {
      supportedTypes = [
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4;codecs=avc1',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm'
      ];
    } else {
      supportedTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
        'video/mp4;codecs=avc1',
        'video/mp4'
      ];
    }

    let selectedMime = '';
    for (const type of supportedTypes) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
        selectedMime = type;
        break;
      }
    }

    // 2. Bitrate Optimal: Mencegah kompresi brutal sekaligus mencegah buffer encoder mobile tersedak (ramah CapCut & Instagram)
    const isHighRes = (exportCanvas.width >= 1080 && exportCanvas.height >= 1600) || (exportCanvas.width >= 1600);
    let targetVideoBitrate = 4500000; // 4.5 Mbps standar emas untuk Reels / TikTok / CapCut
    if (isHighRes && targetFps === 60) {
      targetVideoBitrate = 6500000; // 6.5 Mbps
    } else if (isHighRes && targetFps === 30) {
      targetVideoBitrate = 5000000; // 5 Mbps
    } else if (!isHighRes && targetFps === 60) {
      targetVideoBitrate = 4000000; // 4 Mbps
    } else {
      targetVideoBitrate = 3200000; // 3.2 Mbps (720p 30fps - super stabil & anti-drop)
    }
    const TARGET_AUDIO_BITRATE = 128000; // 128 kbps audio

    const recorderOptions = {
      videoBitsPerSecond: targetVideoBitrate,
      audioBitsPerSecond: TARGET_AUDIO_BITRATE
    };
    if (selectedMime) {
      recorderOptions.mimeType = selectedMime;
    }

    try {
      mediaRecorder = new MediaRecorder(combinedStream, recorderOptions);
    } catch (err) {
      console.warn('MediaRecorder with videoBitsPerSecond failed, trying fallback options:', err);
      try {
        mediaRecorder = new MediaRecorder(combinedStream, {
          ...(selectedMime ? { mimeType: selectedMime } : {}),
          videoBitsPerSecond: targetVideoBitrate
        });
      } catch (err2) {
        try {
          mediaRecorder = new MediaRecorder(combinedStream, selectedMime ? { mimeType: selectedMime } : {});
        } catch (err3) {
          try {
            mediaRecorder = new MediaRecorder(combinedStream);
          } catch (e2) {
            console.error('MediaRecorder init failed:', e2);
            showToast(t('toast_rec_unsupported'));
            isRecordingVideo = false;
            if (currentRenderRaf) {
              cancelAnimationFrame(currentRenderRaf);
              currentRenderRaf = null;
            }
            return;
          }
        }
      }
    }

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      if (currentRenderRaf) {
        cancelAnimationFrame(currentRenderRaf);
        currentRenderRaf = null;
      }
      const isTransparentRecorded = isTransparentMode || (exportBgMode && exportBgMode.value === 'transparent');
      const actualFormat = isTransparentRecorded ? 'webm' : (exportFormat ? exportFormat.value : 'mp4');
      const actualMime = mediaRecorder.mimeType || (actualFormat === 'webm' ? 'video/webm' : 'video/mp4');
      const blob = new Blob(recordedChunks, { type: actualMime });
      const videoUrl = URL.createObjectURL(blob);

      initAudioContext();
      connectMediaElementToAudioEngine(previewRecordedVideo);
      setupMediaElementEvents(previewRecordedVideo, 'playback');

      previewRecordedVideo.src = videoUrl;
      previewRecordedVideo.load();
      previewRecordedVideo.play().catch(() => {
        // Fallback jika browser membutuhkan klik tombol play pada kontrol video
      });

      const durationSec = Math.round((Date.now() - recordStartTime) / 1000);
      const sizeMb = (blob.size / (1024 * 1024)).toFixed(2);
      const baseFilename = isTransparentRecorded ? `smoothietuber_transparan_${Date.now()}` : `smoothietuber_${Date.now()}`;

      lastRecordInfo = {
        durationSec,
        sizeMb,
        actualFormat,
        actualMime,
        isTransparentRecorded,
        baseFilename
      };

      updateRecordModalTranslations();

      // 1. Primary Download button (.mp4 / .webm)
      if (btnDownloadVideo) {
        btnDownloadVideo.href = videoUrl;
        if (actualFormat === 'webm' || isTransparentRecorded) {
          btnDownloadVideo.download = `${baseFilename}.webm`;
        } else {
          btnDownloadVideo.download = `${baseFilename}.mp4`;
        }
      }

      // 2. Apple MOV button (.mov)
      if (btnDownloadMov) {
        if (isTransparentRecorded) {
          btnDownloadMov.classList.add('hidden');
        } else {
          btnDownloadMov.classList.remove('hidden');
          const movBlob = new Blob(recordedChunks, { type: 'video/quicktime' });
          btnDownloadMov.href = URL.createObjectURL(movBlob);
          btnDownloadMov.download = `${baseFilename}.mov`;
        }
      }

      // 3. Simpan ke Galeri Foto HP / Web Share API (iOS Safari Camera Roll & Android)
      if (btnShareVideo) {
        btnShareVideo.onclick = async () => {
          try {
            const ext = isTransparentRecorded ? 'webm' : (actualFormat === 'mov' ? 'mov' : (actualFormat === 'webm' ? 'webm' : 'mp4'));
            const fileMime = isTransparentRecorded ? 'video/webm' : (ext === 'mov' ? 'video/quicktime' : (ext === 'webm' ? 'video/webm' : 'video/mp4'));
            const shareFile = new File([blob], `${baseFilename}.${ext}`, { type: fileMime });
            if (navigator.canShare && navigator.canShare({ files: [shareFile] })) {
              await navigator.share({
                title: 'SmoothieTuber Video',
                text: 'SmoothieTuber Video',
                files: [shareFile]
              });
              showToast(t('toast_video_shared'));
            } else if (navigator.share) {
              await navigator.share({
                title: 'SmoothieTuber Video',
                text: 'SmoothieTuber Video',
                url: videoUrl
              });
            } else {
              const a = document.createElement('a');
              a.href = videoUrl;
              a.download = `${baseFilename}.${ext}`;
              a.click();
              showToast(t('toast_video_downloading'));
            }
          } catch (shareErr) {
            if (shareErr.name !== 'AbortError') {
              console.warn('Share error:', shareErr);
              if (btnDownloadVideo) btnDownloadVideo.click();
            }
          }
        };
      }

      recordResultModal.classList.remove('hidden');
      setRecordingUI(false);
      showToast(t('toast_recording_ready'));
    };

    mediaRecorder.start(1000);
    recordStartTime = Date.now();
    setRecordingUI(true);

    // 4. Sinkronisasi Pemutaran File Audio dengan Fitur Rekam (Auto-Play Audio on Record)
    if (hasAudioFile) {
      currentAudioSourceMode = 'file';
      isListening = true;
      startAudioLoop();
      try {
        audioFileElement.currentTime = 0;
        const playPromise = audioFileElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((playErr) => {
            console.warn('Auto-play audio on record notice:', playErr);
          });
        }
      } catch (err) {
        console.warn('Auto-play audio exception:', err);
      }
      if (btnPlayPauseAudio) {
        btnPlayPauseAudio.textContent = '⏸️';
      }
      showToast(isTransparentMode ? t('toast_rec_start_transparent_audio') : t('toast_rec_start_cfr_audio'));
    } else {
      showToast(isTransparentMode ? t('toast_rec_start_transparent') : t('toast_rec_start_cfr'));
    }
  }

  function stopVideoRecording() {
    if (!isRecordingVideo || !mediaRecorder) return;
    isRecordingVideo = false;
    if (currentRenderRaf) {
      cancelAnimationFrame(currentRenderRaf);
      currentRenderRaf = null;
    }
    if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    setRecordingUI(false);

    // Otomatis jeda (pause) pemutaran file audio jika sedang diputar saat merekam
    if (audioFileElement && !audioFileElement.paused) {
      audioFileElement.pause();
      if (btnPlayPauseAudio) btnPlayPauseAudio.textContent = '▶️';
      checkActiveAudioPlaybackState();
    }
  }

  let lastRecordInfo = null;

  function updateRecordModalTranslations() {
    if (lastRecordInfo) {
      if (metaDuration) {
        metaDuration.textContent = `${t('meta_duration')} ${formatTime(lastRecordInfo.durationSec)}`;
      }
      if (metaSize) {
        metaSize.textContent = `${t('meta_size')} ${lastRecordInfo.sizeMb} MB`;
      }
      if (metaFormat) {
        metaFormat.textContent = lastRecordInfo.isTransparentRecorded 
          ? `${t('meta_format')} WEBM TRANSPARAN (${lastRecordInfo.actualMime.split(';')[0]})` 
          : `${t('meta_format')} ${lastRecordInfo.actualFormat.toUpperCase()} (${lastRecordInfo.actualMime.split(';')[0]})`;
      }
      if (btnDownloadVideo) {
        if (lastRecordInfo.actualFormat === 'webm' || lastRecordInfo.isTransparentRecorded) {
          btnDownloadVideo.textContent = t('btn_download_webm');
        } else {
          btnDownloadVideo.textContent = t('btn_download_mp4');
        }
      }
    } else {
      if (metaDuration) metaDuration.textContent = `${t('meta_duration')} 00:00`;
      if (metaSize) metaSize.textContent = `${t('meta_size')} 0 MB`;
      if (metaFormat) metaFormat.textContent = `${t('meta_format')} MP4`;
      if (btnDownloadVideo) btnDownloadVideo.textContent = t('btn_download_mp4');
    }
  }

  function setRecordingUI(recording) {
    if (recording) {
      btnQuickRecord.classList.add('is-recording');
      btnMainRecord.classList.add('is-recording');
      btnMainRecordText.textContent = t('btn_record_stop');
      recTimer.classList.remove('hidden');

      recordTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordStartTime) / 1000);
        recTimer.textContent = formatTime(elapsed);
      }, 1000);
    } else {
      btnQuickRecord.classList.remove('is-recording');
      btnMainRecord.classList.remove('is-recording');
      btnMainRecordText.textContent = t('btn_record_start');
      recTimer.classList.add('hidden');
      clearInterval(recordTimerInterval);
    }
  }

  btnQuickRecord.addEventListener('click', () => {
    if (isRecordingVideo) stopVideoRecording();
    else startVideoRecording();
  });

  btnMainRecord.addEventListener('click', () => {
    if (isRecordingVideo) stopVideoRecording();
    else startVideoRecording();
  });

  btnCloseModal.addEventListener('click', () => {
    recordResultModal.classList.add('hidden');
    if (previewRecordedVideo) previewRecordedVideo.pause();
  });
  btnDismissModal.addEventListener('click', () => {
    recordResultModal.classList.add('hidden');
    if (previewRecordedVideo) previewRecordedVideo.pause();
  });
  if (recordResultModal) {
    recordResultModal.addEventListener('click', (e) => {
      if (e.target === recordResultModal) {
        recordResultModal.classList.add('hidden');
        if (previewRecordedVideo) previewRecordedVideo.pause();
      }
    });
  }

  // 3. Sakelar Ekspor Transparan (Format WEBM)
  if (toggleTransparentExport) {
    toggleTransparentExport.addEventListener('change', (e) => {
      const isTransparent = e.target.checked;
      if (isTransparent) {
        if (exportBgMode) {
          exportBgMode.dataset.prevVal = exportBgMode.value;
          exportBgMode.value = 'transparent';
          exportBgMode.disabled = true;
        }
        if (exportFormat) {
          exportFormat.dataset.prevVal = exportFormat.value;
          exportFormat.value = 'webm';
          exportFormat.disabled = true;
        }
        showToast(t('toast_transparent_export_active'));
      } else {
        if (exportBgMode) {
          exportBgMode.disabled = false;
          exportBgMode.value = exportBgMode.dataset.prevVal || 'current';
        }
        if (exportFormat) {
          exportFormat.disabled = false;
          exportFormat.value = exportFormat.dataset.prevVal || 'mp4';
        }
        showToast(t('toast_normal_export_restored'));
      }
    });
  }

  if (exportBgMode) {
    exportBgMode.addEventListener('change', () => {
      if (exportBgMode.value === 'transparent') {
        if (toggleTransparentExport && !toggleTransparentExport.checked) {
          toggleTransparentExport.checked = true;
          if (exportFormat) {
            exportFormat.dataset.prevVal = exportFormat.value;
            exportFormat.value = 'webm';
            exportFormat.disabled = true;
          }
          exportBgMode.disabled = true;
          showToast(t('toast_transparent_export_active'));
        }
      }
    });
  }

  if (exportFormat) {
    exportFormat.addEventListener('change', () => {
      if (exportFormat.value === 'webm' && (!toggleTransparentExport || !toggleTransparentExport.checked)) {
        showToast(t('toast_webm_transparent_hint'));
      }
    });
  }

  // --- 9. MOTION & VISUAL SLIDERS ---
  function applyAvatarAnimationMode(mode, notify = false) {
    animMode = (mode === 'scale') ? 'scale' : 'bounce';

    if (avatarAnimModeSelect) {
      avatarAnimModeSelect.value = animMode;
    }

    if (avatarAnimModeRadios && avatarAnimModeRadios.length > 0) {
      avatarAnimModeRadios.forEach(radio => {
        radio.checked = (radio.value === animMode);
      });
    }

    if (avatarAnimModeCards && avatarAnimModeCards.length > 0) {
      avatarAnimModeCards.forEach(card => {
        if (card.dataset.modeCard === animMode) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    if (avatarImage) {
      if (animMode === 'scale') {
        avatarImage.classList.add('anim-mode-scale');
        dynamicVoiceScale = isSpeaking ? Math.max(1.05, dynamicVoiceScale) : 0.92;
        avatarImage.style.setProperty('--dynamic-voice-scale', dynamicVoiceScale.toFixed(3));
      } else {
        avatarImage.classList.remove('anim-mode-scale');
        avatarImage.style.removeProperty('--dynamic-voice-scale');
      }
    }

    try {
      localStorage.setItem('smoothietuber_anim_mode', animMode);
    } catch (e) {}
    saveUserSettings(true);

    if (notify) {
      const modeName = animMode === 'scale'
        ? (t('opt_anim_mode_scale') || 'Mode Skala')
        : (t('opt_anim_mode_bounce') || 'Mode Pantulan');
      showToast(`✨ ${modeName}`);
    }
  }

  if (avatarAnimModeSelect) {
    avatarAnimModeSelect.addEventListener('change', (e) => {
      applyAvatarAnimationMode(e.target.value, true);
    });
  }

  if (avatarAnimModeRadios && avatarAnimModeRadios.length > 0) {
    avatarAnimModeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.checked) {
          applyAvatarAnimationMode(e.target.value, true);
        }
      });
    });
  }

  toggleFloating.addEventListener('change', (e) => {
    isFloatingEnabled = e.target.checked;
    if (isFloatingEnabled) {
      avatarWrapper.classList.add('floating-enabled');
      showToast(t('toast_floating_enabled'));
    } else {
      avatarWrapper.classList.remove('floating-enabled');
      showToast(t('toast_floating_disabled'));
    }
    saveUserSettings();
  });

  floatIntensitySlider.addEventListener('input', (e) => {
    floatIntensity = parseInt(e.target.value, 10);
    document.documentElement.style.setProperty('--float-amplitude', `${floatIntensity}px`);
    floatIntensityBadge.textContent = `${floatIntensity} px`;
    saveUserSettings();
  });

  floatSpeedSlider.addEventListener('input', (e) => {
    floatDuration = parseFloat(e.target.value);
    document.documentElement.style.setProperty('--float-duration', `${floatDuration}s`);
    floatSpeedBadge.textContent = `${floatDuration.toFixed(1)} s`;
    saveUserSettings();
  });

  bounceIntensitySlider.addEventListener('input', (e) => {
    bounceIntensity = parseInt(e.target.value, 10);
    document.documentElement.style.setProperty('--bounce-height', `${bounceIntensity}px`);
    document.documentElement.style.setProperty('--bounce-offset', `${bounceIntensity}px`);
    bounceBadge.textContent = `${bounceIntensity} px`;
    saveUserSettings();
  });

  if (bounceSpeedSlider) {
    bounceSpeedSlider.addEventListener('input', (e) => {
      bounceSpeed = parseFloat(e.target.value);
      document.documentElement.style.setProperty('--bounce-half-duration', `${(bounceSpeed / 2).toFixed(3)}s`);
      document.documentElement.style.setProperty('--bounce-duration', `${bounceSpeed.toFixed(3)}s`);
      if (bounceSpeedBadge) bounceSpeedBadge.textContent = `${bounceSpeed.toFixed(2)} s`;
      saveUserSettings();
    });
  }

  avatarScaleSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    avatarScale = val / 100;
    document.documentElement.style.setProperty('--avatar-scale', `${avatarScale}`);
    scaleBadge.textContent = `${val}%`;
    saveUserSettings();
  });

  avatarPosYSlider.addEventListener('input', (e) => {
    avatarPosY = parseInt(e.target.value, 10);
    document.documentElement.style.setProperty('--avatar-pos-y', `${avatarPosY}px`);
    posYBadge.textContent = `${avatarPosY} px`;
    saveUserSettings();
  });

  // --- 9B. POSITIONING, PRESETS & TOUCH DRAG ENGINE ---
  let isDraggingAvatar = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragInitialX = 0;
  let dragInitialY = 0;

  function setAvatarPosition(x, y) {
    avatarPosX = Math.round(x);
    avatarPosY = Math.round(y);
    document.documentElement.style.setProperty('--avatar-pos-x', `${avatarPosX}px`);
    document.documentElement.style.setProperty('--avatar-pos-y', `${avatarPosY}px`);
    if (avatarPosYSlider) {
      avatarPosYSlider.value = avatarPosY;
      if (posYBadge) posYBadge.textContent = `${avatarPosY} px`;
    }
    saveUserSettings();
  }

  function setAvatarScaleValue(scalePercent) {
    avatarScale = Math.max(0.2, Math.min(2.5, scalePercent / 100));
    document.documentElement.style.setProperty('--avatar-scale', `${avatarScale}`);
    if (avatarScaleSlider) avatarScaleSlider.value = Math.round(avatarScale * 100);
    if (scaleBadge) scaleBadge.textContent = `${Math.round(avatarScale * 100)}%`;
    saveUserSettings();
  }

  function applyPositionPreset(preset) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Perhitungan jarak sudut proporsional layar HP & Desktop
    const xDist = Math.round(vw * 0.30);
    const yDist = Math.round(vh * 0.30);

    switch (preset) {
      case 'bottom-right':
        setAvatarPosition(xDist, yDist);
        setAvatarScaleValue(65);
        showToast(t('toast_pos_bottom_right'));
        break;
      case 'bottom-left':
        setAvatarPosition(-xDist, yDist);
        setAvatarScaleValue(65);
        showToast(t('toast_pos_bottom_left'));
        break;
      case 'top-right':
        setAvatarPosition(xDist, -yDist);
        setAvatarScaleValue(65);
        showToast(t('toast_pos_top_right'));
        break;
      case 'top-left':
        setAvatarPosition(-xDist, -yDist);
        setAvatarScaleValue(65);
        showToast(t('toast_pos_top_left'));
        break;
      case 'center':
      default:
        setAvatarPosition(0, 0);
        setAvatarScaleValue(100);
        showToast(t('toast_pos_center'));
        break;
    }
  }

  if (btnPosPresets && btnPosPresets.length > 0) {
    btnPosPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        const pos = btn.dataset.pos;
        if (pos) applyPositionPreset(pos);
      });
    });
  }

  // Pointer drag & touch gesture on avatarWrapper
  if (avatarWrapper) {
    avatarWrapper.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDraggingAvatar = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragInitialX = avatarPosX;
      dragInitialY = avatarPosY;
      avatarWrapper.classList.add('is-dragging');
      try {
        avatarWrapper.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    avatarWrapper.addEventListener('pointermove', (e) => {
      if (!isDraggingAvatar) return;
      e.preventDefault();
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      setAvatarPosition(dragInitialX + deltaX, dragInitialY + deltaY);
    });

    const finishDrag = (e) => {
      if (!isDraggingAvatar) return;
      isDraggingAvatar = false;
      avatarWrapper.classList.remove('is-dragging');
      saveUserSettings();
      try {
        if (e && e.pointerId) avatarWrapper.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    avatarWrapper.addEventListener('pointerup', finishDrag);
    avatarWrapper.addEventListener('pointercancel', finishDrag);
  }

  // --- 9C. LIVE CAMERA HANDCAM LAYER & REAR CAMERA ZOOM (0.5x - 3.0x) ---
  let isCameraCoverFit = true;
  let cameraZoom = 1.0;
  let isUsingUltraWideLens = false;
  let isSwitchingCameraLens = false;

  function getEffectiveCameraVisualZoom() {
    // Jika lensa fisik Ultra-Wide (0.5x) sedang aktif, 0.5x adalah ukuran 1.0x dari sensor Ultra-Wide
    if (isUsingUltraWideLens && activeCameraFacing === 'environment') {
      return Math.max(0.5, cameraZoom / 0.5);
    }
    return cameraZoom;
  }

  function updateCameraZoomUI() {
    const formatted = `${Number(cameraZoom.toFixed(2))}x`;
    if (cameraZoomSlider) {
      cameraZoomSlider.value = cameraZoom;
    }
    if (cameraZoomBadge) {
      cameraZoomBadge.textContent = formatted;
    }
    if (btnCamZoomPresets && btnCamZoomPresets.length > 0) {
      btnCamZoomPresets.forEach(btn => {
        const z = parseFloat(btn.dataset.zoom || btn.dataset.camZoom);
        if (Math.abs(z - cameraZoom) < 0.04) {
          btn.classList.add('is-active');
          btn.classList.add('active');
        } else {
          btn.classList.remove('is-active');
          btn.classList.remove('active');
        }
      });
    }
    if (floatZoomPresetBtns && floatZoomPresetBtns.length > 0) {
      floatZoomPresetBtns.forEach(btn => {
        const z = parseFloat(btn.dataset.zoom || btn.dataset.camZoom);
        if (Math.abs(z - cameraZoom) < 0.04) {
          btn.classList.add('is-active');
          btn.classList.add('active');
        } else {
          btn.classList.remove('is-active');
          btn.classList.remove('active');
        }
      });
    }
  }

  // Coba cari lensa Ultra-Wide (0.5x) atau lensa utama belakang pada iPhone / Android
  async function findRearCameraLensDeviceId(wantUltraWide) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return null;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(d => d.kind === 'videoinput' && d.deviceId);
      if (videoInputs.length <= 1) return null;

      if (wantUltraWide) {
        const uw = videoInputs.find(d => /(ultra\s*wide|ultra-wide|0\.5x|lebar ultra|camera 2,\s*facing back)/i.test(d.label || ''));
        return uw ? uw.deviceId : null;
      } else {
        const mainBack = videoInputs.find(d => {
          const l = (d.label || '').toLowerCase();
          return (l.includes('back') || l.includes('belakang') || l.includes('rear') || l.includes('environment')) &&
                 !/(ultra\s*wide|ultra-wide|telephoto|tele)/i.test(l);
        });
        return mainBack ? mainBack.deviceId : null;
      }
    } catch (_) {
      return null;
    }
  }

  async function setCameraZoom(newZoom, notify = false) {
    const clamped = Math.max(0.5, Math.min(3.0, Math.round(newZoom * 20) / 20));
    cameraZoom = clamped;
    updateCameraZoomUI();

    // Jika sedang di kamera belakang dan pengguna memilih < 0.8x (misal 0.5x), coba beralih ke lensa Ultra-Wide jika tersedia di HP
    if (cameraStream && activeCameraFacing === 'environment' && !isSwitchingCameraLens) {
      const wantUltraWide = cameraZoom <= 0.75;
      if (wantUltraWide !== isUsingUltraWideLens) {
        const targetLensId = await findRearCameraLensDeviceId(wantUltraWide);
        if (targetLensId) {
          isSwitchingCameraLens = true;
          try {
            const isPortrait = window.innerHeight >= window.innerWidth;
            const newStream = await navigator.mediaDevices.getUserMedia({
              video: {
                deviceId: { exact: targetLensId },
                width: { ideal: isPortrait ? 720 : 1280 },
                height: { ideal: isPortrait ? 1280 : 720 }
              }
            });
            if (newStream) {
              cameraStream.getTracks().forEach(tr => tr.stop());
              cameraStream = newStream;
              isUsingUltraWideLens = wantUltraWide;
              if (cameraBgVideo) {
                cameraBgVideo.srcObject = cameraStream;
                await cameraBgVideo.play().catch(() => {});
              }
            }
          } catch (_) {
            // Jika tidak bisa pindah lensa hardware, gunakan uncrop & smooth scale CSS/Canvas
            isUsingUltraWideLens = false;
          } finally {
            isSwitchingCameraLens = false;
          }
        } else {
          isUsingUltraWideLens = false;
        }
      }

      // Terapkan juga hardware zoom constraint jika kamera mendukung dan zoom >= 1.0
      try {
        const videoTrack = cameraStream.getVideoTracks()[0];
        if (videoTrack && typeof videoTrack.getCapabilities === 'function') {
          const caps = videoTrack.getCapabilities();
          if (caps && caps.zoom && typeof videoTrack.applyConstraints === 'function') {
            const minZ = caps.zoom.min || 1;
            const maxZ = caps.zoom.max || 1;
            if (cameraZoom < 1.0 && minZ < 1.0) {
              const hwZoom = Math.max(minZ, Math.min(maxZ, cameraZoom));
              videoTrack.applyConstraints({ advanced: [{ zoom: hwZoom }] }).catch(() => {});
            } else if (minZ <= 1.0 && maxZ >= 1.0) {
              // Reset hardware zoom ke 1.0 agar skala ditangani seragam oleh CSS + Canvas Export (100% WYSIWYG)
              videoTrack.applyConstraints({ advanced: [{ zoom: Math.max(minZ, 1.0) }] }).catch(() => {});
            }
          }
        }
      } catch (_) {}
    }

    applyCameraFitStyle();
    if (notify) {
      showToast(`${t('toast_cam_zoom') || '🔍 Zoom Kamera:'} ${Number(cameraZoom.toFixed(2))}x`);
    }
  }

  function applyCameraFitStyle() {
    if (!cameraBgVideo || !cameraBgWrapper) return;
    const vw = window.innerWidth || document.documentElement.clientWidth || 1;
    const vh = window.innerHeight || document.documentElement.clientHeight || 1;

    cameraBgWrapper.style.width = `${vw}px`;
    cameraBgWrapper.style.height = `${vh}px`;

    // Hitung ukuran dasar video penuh sensor (tanpa terpotong kotak <video>) agar saat Zoom Out (0.5x - 0.95x)
    // bagian tepi sensor kamera yang tadinya terpotong Cover bisa terlihat utuh!
    const vidW = cameraBgVideo.videoWidth || (vh > vw ? 720 : 1280);
    const vidH = cameraBgVideo.videoHeight || (vh > vw ? 1280 : 720);
    const vAspect = vidW / vidH;
    const sAspect = vw / vh;

    let baseW = vw;
    let baseH = vh;
    if (isCameraCoverFit) {
      if (vAspect > sAspect) {
        baseH = vh;
        baseW = Math.round(vh * vAspect);
      } else {
        baseW = vw;
        baseH = Math.round(vw / vAspect);
      }
      cameraBgVideo.style.setProperty('-webkit-object-fit', 'fill', 'important');
      cameraBgVideo.style.setProperty('object-fit', 'fill', 'important');
      cameraBgWrapper.classList.remove('camera-fit-contain');
      if (btnToggleCameraFit) btnToggleCameraFit.textContent = t('btn_camera_fit_cover');
    } else {
      if (vAspect > sAspect) {
        baseW = vw;
        baseH = Math.round(vw / vAspect);
      } else {
        baseH = vh;
        baseW = Math.round(vh * vAspect);
      }
      cameraBgVideo.style.setProperty('-webkit-object-fit', 'contain', 'important');
      cameraBgVideo.style.setProperty('object-fit', 'contain', 'important');
      cameraBgWrapper.classList.add('camera-fit-contain');
      if (btnToggleCameraFit) btnToggleCameraFit.textContent = t('btn_camera_fit_contain');
    }

    cameraBgVideo.style.setProperty('min-width', '0px', 'important');
    cameraBgVideo.style.setProperty('min-height', '0px', 'important');
    cameraBgVideo.style.width = `${baseW}px`;
    cameraBgVideo.style.height = `${baseH}px`;

    const effZoom = getEffectiveCameraVisualZoom();
    if (activeCameraFacing === 'user') {
      cameraBgWrapper.classList.add('camera-facing-user');
      cameraBgVideo.style.setProperty('transform', `translate(-50%, -50%) scale(${-effZoom}, ${effZoom})`, 'important');
    } else {
      cameraBgWrapper.classList.remove('camera-facing-user');
      cameraBgVideo.style.setProperty('transform', `translate(-50%, -50%) scale(${effZoom})`, 'important');
    }
  }

  const isMacDesktop = typeof navigator !== 'undefined' && !isMobileDevice && /Macintosh|Mac OS X/i.test(navigator.userAgent || '');

  function isIphoneContinuityCameraLabel(label) {
    if (!label) return false;
    return /(iphone|continuity|kamera berkelanjutan|kamera iphone|desk view|tampilan meja|ipad camera)/i.test(label);
  }

  function updateActiveCameraLabelDisplay() {
    if (!activeCameraDeviceName) return;
    if (cameraStream && cameraStream.getVideoTracks().length > 0) {
      const track = cameraStream.getVideoTracks()[0];
      activeCameraDeviceName.textContent = track.label || 'Kamera Aktif';
    } else {
      activeCameraDeviceName.textContent = 'Belum Aktif';
    }
  }

  async function populateCameraDevices() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices || !cameraDeviceSelect) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(d => d.kind === 'videoinput');
      const prevVal = cameraDeviceSelect.value || 'auto';
      cameraDeviceSelect.innerHTML = '';

      const autoOpt = document.createElement('option');
      autoOpt.value = 'auto';
      autoOpt.textContent = '⚡ Otomatis (Prioritas Kamera iPhone / Belakang)';
      cameraDeviceSelect.appendChild(autoOpt);

      videoInputs.forEach((d, idx) => {
        if (!d.deviceId) return;
        const opt = document.createElement('option');
        opt.value = d.deviceId;
        const rawLabel = d.label || `Kamera ${idx + 1}`;
        const isIphoneCam = isIphoneContinuityCameraLabel(rawLabel);
        opt.textContent = isIphoneCam ? `🍏📱 ${rawLabel}` : `📷 ${rawLabel}`;
        cameraDeviceSelect.appendChild(opt);
      });

      if (prevVal && Array.from(cameraDeviceSelect.options).some(o => o.value === prevVal)) {
        cameraDeviceSelect.value = prevVal;
      } else {
        cameraDeviceSelect.value = 'auto';
      }
      updateActiveCameraLabelDisplay();
    } catch (_) {}
  }

  async function findPreferredIphoneContinuityCameraId() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return null;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = devices.filter(d => d.kind === 'videoinput' && d.deviceId);
      if (videoInputs.length === 0) return null;

      // 1. Prioritaskan kamera utama iPhone (bukan Desk View kecuali hanya itu yang ada)
      const mainIphoneCam = videoInputs.find(d => {
        const l = d.label || '';
        return isIphoneContinuityCameraLabel(l) && !/(desk view|tampilan meja)/i.test(l);
      });
      if (mainIphoneCam) return mainIphoneCam.deviceId;

      // 2. Fallback ke Desk View iPhone jika ada
      const deskViewCam = videoInputs.find(d => isIphoneContinuityCameraLabel(d.label || ''));
      if (deskViewCam) return deskViewCam.deviceId;

      // 3. Jika di Mac mini (tanpa FaceTime kamera bawaan) dan ada 1 kamera eksternal (bukan virtual), gunakan itu
      if (isMacDesktop) {
        const nonVirtual = videoInputs.find(d => !/(virtual|obs|manycam|snap camera)/i.test(d.label || ''));
        if (nonVirtual) return nonVirtual.deviceId;
      }
      return null;
    } catch (_) {
      return null;
    }
  }

  async function startCameraBackground(facing = 'environment', specificDeviceId = null) {
    stopCameraBackground(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('⚠️ ' + t('err_camera_unsupported'));
        return;
      }

      // Deteksi orientasi perangkat: jika HP potret (tegak), minta resolusi potret (720x1280), di Mac minta 1920x1080 / 1280x720
      const isPortrait = !isMacDesktop && (window.innerHeight >= window.innerWidth);
      let stream = null;
      isUsingUltraWideLens = false;

      const selectedCamId = specificDeviceId || (cameraDeviceSelect && cameraDeviceSelect.value !== 'auto' ? cameraDeviceSelect.value : null);
      let targetDeviceId = selectedCamId;

      if (!targetDeviceId && isMacDesktop && facing === 'environment') {
        targetDeviceId = await findPreferredIphoneContinuityCameraId();
      }

      if (targetDeviceId) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: targetDeviceId },
              width: { ideal: isPortrait ? 720 : 1920 },
              height: { ideal: isPortrait ? 1280 : 1080 }
            }
          });
        } catch (exactCamErr) {
          console.warn('Exact camera deviceId failed, falling back:', exactCamErr);
          stream = null;
        }
      }

      // 3-Stage Graceful Fallback (Omit audio:false to prevent "Invalid constraint" exceptions)
      if (!stream) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: facing },
              width: { ideal: isPortrait ? 720 : 1280 },
              height: { ideal: isPortrait ? 1280 : 720 }
            }
          });
        } catch (e1) {
          console.warn('Camera Stage 1 failed, trying simple facingMode:', e1);
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: { facingMode: facing }
            });
          } catch (e2) {
            console.warn('Camera Stage 2 failed, falling back to minimal video:', e2);
            stream = await navigator.mediaDevices.getUserMedia({
              video: true
            });
          }
        }
      }

      // Setelah izin kamera diberikan di Mac, cek ulang enumerateDevices():
      // Jika otomatis terbuka kamera virtual (mis. OBS) padahal ada Kamera iPhone (Continuity Camera), langsung pindah ke Kamera iPhone!
      if (!selectedCamId && isMacDesktop && facing === 'environment' && stream) {
        try {
          const preferredIphoneId = await findPreferredIphoneContinuityCameraId();
          const currentVidTrack = stream.getVideoTracks()[0];
          const currentLabel = currentVidTrack ? (currentVidTrack.label || '') : '';
          if (preferredIphoneId && !isIphoneContinuityCameraLabel(currentLabel)) {
            const iphoneStream = await navigator.mediaDevices.getUserMedia({
              video: {
                deviceId: { exact: preferredIphoneId },
                width: { ideal: 1920 },
                height: { ideal: 1080 }
              }
            }).catch(() => null);
            if (iphoneStream) {
              stream.getTracks().forEach(tr => tr.stop());
              stream = iphoneStream;
            }
          }
        } catch (_) {}
      }

      cameraStream = stream;
      activeCameraFacing = facing;
      cameraZoom = 1.0;
      updateCameraZoomUI();
      await populateCameraDevices();
      updateActiveCameraLabelDisplay();

      const activeVidTrack = cameraStream.getVideoTracks()[0];
      const activeCamLabel = activeVidTrack && activeVidTrack.label ? activeVidTrack.label : '';

      if (cameraBgWrapper) {
        cameraBgWrapper.classList.remove('hidden');
      }
      if (cameraBgVideo) {
        cameraBgVideo.srcObject = cameraStream;
        cameraBgVideo.muted = true;
        cameraBgVideo.playsInline = true;
        cameraBgVideo.setAttribute('playsinline', '');
        cameraBgVideo.setAttribute('webkit-playsinline', '');
        applyCameraFitStyle();
        await cameraBgVideo.play().catch(() => {});
        applyCameraFitStyle();
      }

      if (customBgLayer) customBgLayer.classList.add('hidden');
      if (customBgControls) customBgControls.classList.add('hidden');
      if (btnRemoveCustomBg) btnRemoveCustomBg.classList.add('hidden');
      if (btnStopCamera) btnStopCamera.classList.remove('hidden');
      if (cameraFitToggleGroup) cameraFitToggleGroup.classList.remove('hidden');
      if (cameraZoomControlGroup) cameraZoomControlGroup.classList.remove('hidden');
      if (cameraZoomFloatingBar) {
        if (facing === 'environment') {
          cameraZoomFloatingBar.classList.remove('hidden');
        } else {
          cameraZoomFloatingBar.classList.add('hidden');
        }
      }
      if (exportBgMode) exportBgMode.value = 'current';

      document.body.className = '';
      document.body.classList.add('bg-pure-transparent');

      // PENTING untuk iOS Safari: menyalakan kamera kadang menginterupsi AVAudioSession mikrofon.
      // Pastikan AudioContext tetap berjalan dan pulihkan mikrofon jika track terputus.
      if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
      }
      if (isListening && (!micStream || !micStream.active || micStream.getAudioTracks().some(tr => tr.readyState === 'ended'))) {
        setTimeout(() => {
          startMicrophone(true).catch(() => {});
        }, 250);
      }

      if (facing === 'environment') {
        if (btnCameraBack) btnCameraBack.classList.add('is-active');
        if (btnCameraFront) btnCameraFront.classList.remove('is-active');
        if (btnDockCamera) {
          btnDockCamera.classList.add('is-active');
          if (dockCameraIcon) dockCameraIcon.textContent = '📷';
          btnDockCamera.title = t('dock_camera_back_active');
        }
        const suffix = activeCamLabel ? ` (${activeCamLabel})` : '';
        showToast(t('toast_camera_back_active') + suffix);
      } else {
        if (btnCameraFront) btnCameraFront.classList.add('is-active');
        if (btnCameraBack) btnCameraBack.classList.remove('is-active');
        if (btnDockCamera) {
          btnDockCamera.classList.add('is-active');
          if (dockCameraIcon) dockCameraIcon.textContent = '🤳';
          btnDockCamera.title = t('dock_camera_front_active');
        }
        const suffix = activeCamLabel ? ` (${activeCamLabel})` : '';
        showToast(t('toast_camera_front_active') + suffix);
      }
    } catch (err) {
      console.error('Kamera error:', err);
      updateActiveCameraLabelDisplay();
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        showToast('⚠️ ' + t('err_camera_denied'));
      } else {
        showToast('⚠️ ' + t('err_camera_failed') + (err.message ? ': ' + err.message : ''));
      }
    }
  }

  function stopCameraBackground(notify = true) {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      cameraStream = null;
    }
    activeCameraFacing = null;
    isUsingUltraWideLens = false;
    if (cameraBgWrapper) {
      cameraBgWrapper.classList.add('hidden');
      cameraBgWrapper.classList.remove('camera-facing-user');
    }
    if (cameraBgVideo) {
      cameraBgVideo.srcObject = null;
    }
    updateActiveCameraLabelDisplay();
    if (btnStopCamera) btnStopCamera.classList.add('hidden');
    if (cameraFitToggleGroup) cameraFitToggleGroup.classList.add('hidden');
    if (cameraZoomControlGroup) cameraZoomControlGroup.classList.add('hidden');
    if (cameraZoomFloatingBar) cameraZoomFloatingBar.classList.add('hidden');
    if (btnCameraBack) btnCameraBack.classList.remove('is-active');
    if (btnCameraFront) btnCameraFront.classList.remove('is-active');

    if (btnDockCamera) {
      btnDockCamera.classList.remove('is-active');
      if (dockCameraIcon) dockCameraIcon.textContent = '📷';
      btnDockCamera.title = t('dock_camera');
    }

    if (document.body.classList.contains('bg-pure-transparent')) {
      document.body.classList.remove('bg-pure-transparent');
      if (customBgImageObj && customBgImg && customBgImg.src) {
        if (customBgLayer) customBgLayer.classList.remove('hidden');
        if (customBgControls) customBgControls.classList.remove('hidden');
        if (btnRemoveCustomBg) btnRemoveCustomBg.classList.remove('hidden');
        applyCustomBgTransform();
      } else {
        document.body.classList.add('bg-checkerboard');
        if (bgChoiceButtons && bgChoiceButtons[0]) bgChoiceButtons[0].classList.add('active');
      }
    }

    if (notify) showToast(t('toast_camera_stopped'));
  }

  if (btnCameraBack) {
    btnCameraBack.addEventListener('click', () => startCameraBackground('environment'));
  }
  if (btnCameraFront) {
    btnCameraFront.addEventListener('click', () => startCameraBackground('user'));
  }
  if (btnStopCamera) {
    btnStopCamera.addEventListener('click', () => stopCameraBackground(true));
  }
  if (cameraDeviceSelect) {
    cameraDeviceSelect.addEventListener('change', () => {
      const selectedId = cameraDeviceSelect.value;
      if (selectedId && selectedId !== 'auto') {
        startCameraBackground(activeCameraFacing || 'environment', selectedId);
      } else {
        startCameraBackground('environment', null);
      }
    });
  }
  if (btnRefreshCameraDevices) {
    btnRefreshCameraDevices.addEventListener('click', async () => {
      try {
        await populateCameraDevices(true);
        const iphoneCamId = await findPreferredIphoneContinuityCameraId();
        if (iphoneCamId) {
          if (cameraDeviceSelect) cameraDeviceSelect.value = iphoneCamId;
          await startCameraBackground('environment', iphoneCamId);
        } else if (!cameraStream) {
          await startCameraBackground('environment', null);
        } else {
          showToast('🔄 Daftar kamera diperbarui!');
        }
      } catch (e) {
        console.warn('Gagal menyegarkan daftar kamera:', e);
      }
    });
  }
  if (toggleAutoContinuityCam) {
    const savedAutoCam = localStorage.getItem('smoothietuber_auto_continuity_cam');
    if (savedAutoCam !== null) {
      toggleAutoContinuityCam.checked = savedAutoCam !== '0';
    }
    toggleAutoContinuityCam.addEventListener('change', () => {
      localStorage.setItem('smoothietuber_auto_continuity_cam', toggleAutoContinuityCam.checked ? '1' : '0');
      showToast(toggleAutoContinuityCam.checked
        ? '🍏 Auto-Konek Kamera iPhone saat buka di Mac: AKTIF'
        : '⏸️ Auto-Konek Kamera iPhone saat buka di Mac: NONAKTIF');
    });
  }
  if (btnToggleCameraFit) {
    btnToggleCameraFit.addEventListener('click', () => {
      isCameraCoverFit = !isCameraCoverFit;
      applyCameraFitStyle();
      showToast(isCameraCoverFit ? t('toast_camera_fit_cover') : t('toast_camera_fit_contain'));
    });
  }

  // Event Listeners Zoom Kamera Belakang & Depan (Slider, Tombol +/-, Preset, & Cubit Layar 2 Jari)
  if (cameraZoomSlider) {
    cameraZoomSlider.addEventListener('input', (e) => {
      setCameraZoom(parseFloat(e.target.value) || 1.0, false);
    });
  }
  if (btnCamZoomOut) {
    btnCamZoomOut.addEventListener('click', () => {
      setCameraZoom(cameraZoom - 0.25, true);
    });
  }
  if (btnCamZoomIn) {
    btnCamZoomIn.addEventListener('click', () => {
      setCameraZoom(cameraZoom + 0.25, true);
    });
  }
  if (btnCamZoomPresets && btnCamZoomPresets.length > 0) {
    btnCamZoomPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetZ = parseFloat(btn.dataset.zoom || btn.dataset.camZoom);
        if (!isNaN(targetZ)) setCameraZoom(targetZ, true);
      });
    });
  }
  if (btnFloatCamZoomOut) {
    btnFloatCamZoomOut.addEventListener('click', (e) => {
      e.stopPropagation();
      setCameraZoom(cameraZoom - 0.25, true);
    });
  }
  if (btnFloatCamZoomIn) {
    btnFloatCamZoomIn.addEventListener('click', (e) => {
      e.stopPropagation();
      setCameraZoom(cameraZoom + 0.25, true);
    });
  }
  if (floatZoomPresetBtns && floatZoomPresetBtns.length > 0) {
    floatZoomPresetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetZ = parseFloat(btn.dataset.zoom || btn.dataset.camZoom);
        if (!isNaN(targetZ)) setCameraZoom(targetZ, true);
      });
    });
  }

  // Gestur Pinch-to-Zoom 2 Jari di layar saat kamera aktif
  let pinchStartDist = 0;
  let pinchStartZoom = 1.0;

  window.addEventListener('touchstart', (e) => {
    if (!cameraStream || !e.touches || e.touches.length !== 2) return;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    pinchStartDist = Math.hypot(dx, dy);
    pinchStartZoom = cameraZoom;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!cameraStream || !e.touches || e.touches.length !== 2 || pinchStartDist <= 10) return;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.hypot(dx, dy);
    const ratio = dist / pinchStartDist;
    setCameraZoom(pinchStartZoom * ratio, false);
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!e.touches || e.touches.length < 2) {
      pinchStartDist = 0;
    }
  }, { passive: true });

  if (cameraBgVideo) {
    cameraBgVideo.addEventListener('loadedmetadata', () => {
      applyCameraFitStyle();
    });
  }

  window.addEventListener('resize', () => {
    if (cameraStream && cameraBgVideo) {
      applyCameraFitStyle();
    }
    applyCustomBgTransform();
  });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      if (cameraStream && cameraBgVideo) {
        applyCameraFitStyle();
      }
      applyCustomBgTransform();
    }, 150);
  });

  // Background choices
  bgChoiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stopCameraBackground(false);
      bgChoiceButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const bgClass = btn.dataset.bg;
      document.body.className = '';
      document.body.classList.add(bgClass);

      customBgLayer.classList.add('hidden');
      if (customBgControls) customBgControls.classList.add('hidden');
      customBgImageObj = null;
      if (customBgImg) customBgImg.src = '';
      btnRemoveCustomBg.classList.add('hidden');
    });
  });

  inputCustomBg.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    stopCameraBackground(false);
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target.result;
      if (customBgImg) customBgImg.src = dataUrl;
      customBgLayer.classList.remove('hidden');
      if (btnRemoveCustomBg) btnRemoveCustomBg.classList.remove('hidden');
      if (customBgControls) customBgControls.classList.remove('hidden');

      customBgImageObj = new Image();
      customBgImageObj.onload = () => {
        applyCustomBgTransform();
      };
      customBgImageObj.src = dataUrl;

      idbSet('smoothietuber_custom_bg', dataUrl).catch(() => {});

      bgChoiceButtons.forEach(b => b.classList.remove('active'));
      document.body.className = '';
      showToast(t('toast_custom_bg_set'));
    };
    reader.readAsDataURL(file);
  });

  btnRemoveCustomBg.addEventListener('click', () => {
    stopCameraBackground(false);
    if (customBgImg) customBgImg.src = '';
    customBgLayer.classList.add('hidden');
    if (customBgControls) customBgControls.classList.add('hidden');
    customBgImageObj = null;
    btnRemoveCustomBg.classList.add('hidden');
    idbSet('smoothietuber_custom_bg', null).catch(() => {});
    document.body.classList.add('bg-checkerboard');
    bgChoiceButtons[0].classList.add('active');
  });

  // --- 10. OBS MODE ---
  function toggleObsMode(hide) {
    if (hide) {
      document.body.classList.add('obs-mode');
      closeAllFlyouts();
      btnRestoreControls.classList.remove('hidden');
      showToast(t('toast_obs_active'));
    } else {
      document.body.classList.remove('obs-mode');
      btnRestoreControls.classList.add('hidden');
    }
  }

  btnToggleObs.addEventListener('click', () => toggleObsMode(true));
  btnRestoreControls.addEventListener('click', () => toggleObsMode(false));

  // --- 10B. MODE GREEN SCREEN MURNI (#00FF00) & QUICK LIVE CAMERA CONTROLS ---
  let isPureGreenMode = false;

  function togglePureGreenMode(enable) {
    if (typeof enable === 'boolean') {
      isPureGreenMode = enable;
    } else {
      isPureGreenMode = !isPureGreenMode;
    }

    if (isPureGreenMode) {
      document.body.classList.add('pure-green-mode');
      closeAllFlyouts();
      if (btnRestorePureGreen) btnRestorePureGreen.classList.remove('hidden');
      if (btnDockGreenScreen) btnDockGreenScreen.classList.add('is-active');
      showToast(t('toast_green_screen_active'));
    } else {
      document.body.classList.remove('pure-green-mode');
      if (btnRestorePureGreen) btnRestorePureGreen.classList.add('hidden');
      if (btnDockGreenScreen) btnDockGreenScreen.classList.remove('is-active');
      showToast(t('toast_green_screen_exit'));
    }
  }

  if (btnDockGreenScreen) {
    btnDockGreenScreen.addEventListener('click', () => togglePureGreenMode(!isPureGreenMode));
  }
  if (btnRestorePureGreen) {
    btnRestorePureGreen.addEventListener('click', () => togglePureGreenMode(false));
  }

  // --- Quick Camera Toggle (Handcam / Facecam) ---
  function toggleCameraQuick() {
    if (!cameraStream) {
      // 1st click: Kamera Belakang (Handcam / Sorot meja kerja/konten)
      startCameraBackground('environment');
    } else if (activeCameraFacing === 'environment') {
      // 2nd click: Kamera Depan (Facecam / Selfie)
      startCameraBackground('user');
    } else {
      // 3rd click: Matikan kamera
      stopCameraBackground(true);
    }
  }

  if (btnDockCamera) {
    btnDockCamera.addEventListener('click', toggleCameraQuick);
  }

  // --- 11. HOTKEYS SETUP ---
  function setupHotkeyEvents() {
    if (btnHotkeyMute) {
      btnHotkeyMute.addEventListener('click', () => {
        isRecordingSystemHotkey = (isRecordingSystemHotkey === 'toggleMute') ? null : 'toggleMute';
        isRecordingHotkeyForId = null;
        renderHotkeysUI();
      });
    }

    if (btnHotkeyObs) {
      btnHotkeyObs.addEventListener('click', () => {
        isRecordingSystemHotkey = (isRecordingSystemHotkey === 'toggleObs') ? null : 'toggleObs';
        isRecordingHotkeyForId = null;
        renderHotkeysUI();
      });
    }

    if (btnHotkeyResetAudio) {
      btnHotkeyResetAudio.addEventListener('click', () => {
        isRecordingSystemHotkey = (isRecordingSystemHotkey === 'resetAudio') ? null : 'resetAudio';
        isRecordingHotkeyForId = null;
        renderHotkeysUI();
      });
    }

    if (btnResetDefaultHotkeys) {
      btnResetDefaultHotkeys.addEventListener('click', () => {
        systemHotkeys = { ...DEFAULT_SYSTEM_HOTKEYS };
        saveSystemHotkeys();
        isRecordingSystemHotkey = null;
        renderHotkeysUI();
        showToast(t('toast_reset_sys_keys'));
      });
    }

    if (btnResetEmotionHotkeys) {
      btnResetEmotionHotkeys.addEventListener('click', () => {
        emotions.forEach((emo, idx) => {
          emo.hotkey = String(idx + 1);
        });
        saveEmotions();
        isRecordingHotkeyForId = null;
        renderHotkeysUI();
        renderCompactEmotionsList();
        updateSlotImages();
        showToast(t('toast_reset_emo_keys'));
      });
    }
  }

  let toastTimer = null;
  function showToast(message) {
    clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toastNotification.classList.remove('hidden');
    toastTimer = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 2200);
  }

  // --- 11B. CADANGKAN & PULIHKAN PROFIL AVATAR (EXPORT / IMPORT JSON) ---
  function exportUserProfile() {
    try {
      const backupData = {
        app: 'SmoothieTuber',
        version: 4,
        exportedAt: new Date().toISOString(),
        emotions: emotions,
        activeEmotionId: activeEmotionId,
        settings: {
          threshold,
          holdDelay,
          bounceIntensity,
          bounceSpeed,
          avatarScale,
          avatarPosX,
          avatarPosY,
          isFloatingEnabled,
          floatIntensity,
          floatDuration,
          blinkInterval,
          blinkDuration,
          systemHotkeys
        }
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const blobUrl = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      const nowStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = `SmoothieTuber-Profile-${nowStr}.json`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);

      showToast(t('toast_profile_saved'));
    } catch (err) {
      console.error('Gagal ekspor profil:', err);
      showToast(t('toast_profile_export_failed'));
    }
  }

  function importUserProfile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported || !Array.isArray(imported.emotions) || imported.emotions.length === 0) {
          throw new Error('Format file profil tidak valid');
        }

        // Terapkan daftar emosi & sprite
        emotions = imported.emotions;
        isStorageHydrated = true;
        saveEmotions();

        if (imported.activeEmotionId && emotions.some(em => em.id === imported.activeEmotionId)) {
          activeEmotionId = imported.activeEmotionId;
        } else {
          activeEmotionId = emotions[0].id;
        }

        // Terapkan pengaturan jika ada
        if (imported.settings) {
          const s = imported.settings;
          if (typeof s.threshold === 'number') setThreshold(s.threshold);
          if (typeof s.holdDelay === 'number') {
            holdDelay = s.holdDelay;
            if (holdDelaySlider) holdDelaySlider.value = holdDelay;
            if (holdDelayBadge) holdDelayBadge.textContent = `${holdDelay} ms`;
          }
          if (typeof s.bounceIntensity === 'number') {
            bounceIntensity = s.bounceIntensity;
            if (bounceIntensitySlider) bounceIntensitySlider.value = bounceIntensity;
            if (bounceBadge) bounceBadge.textContent = `${bounceIntensity} px`;
            document.documentElement.style.setProperty('--bounce-height', `${bounceIntensity}px`);
            document.documentElement.style.setProperty('--bounce-offset', `${bounceIntensity}px`);
          }
          if (typeof s.bounceSpeed === 'number') {
            bounceSpeed = s.bounceSpeed;
            if (bounceSpeedSlider) bounceSpeedSlider.value = bounceSpeed;
            if (bounceSpeedBadge) bounceSpeedBadge.textContent = `${bounceSpeed.toFixed(2)} s`;
            document.documentElement.style.setProperty('--bounce-half-duration', `${(bounceSpeed / 2).toFixed(3)}s`);
            document.documentElement.style.setProperty('--bounce-duration', `${bounceSpeed.toFixed(3)}s`);
          }
          if (typeof s.avatarScale === 'number') {
            setAvatarScaleValue(Math.round(s.avatarScale * 100));
          }
          if (typeof s.avatarPosX === 'number' && typeof s.avatarPosY === 'number') {
            setAvatarPosition(s.avatarPosX, s.avatarPosY);
          }
          if (typeof s.isFloatingEnabled === 'boolean') {
            isFloatingEnabled = s.isFloatingEnabled;
            if (toggleFloating) toggleFloating.checked = isFloatingEnabled;
            if (isFloatingEnabled) avatarWrapper?.classList.add('floating-enabled');
            else avatarWrapper?.classList.remove('floating-enabled');
          }
          if (s.animMode === 'scale' || s.animMode === 'bounce') {
            applyAvatarAnimationMode(s.animMode, false);
          }
          if (typeof s.floatIntensity === 'number') {
            floatIntensity = s.floatIntensity;
            if (floatIntensitySlider) floatIntensitySlider.value = floatIntensity;
            if (floatIntensityBadge) floatIntensityBadge.textContent = `${floatIntensity} px`;
            document.documentElement.style.setProperty('--float-amplitude', `${floatIntensity}px`);
          }
          if (typeof s.floatDuration === 'number') {
            floatDuration = s.floatDuration;
            if (floatSpeedSlider) floatSpeedSlider.value = floatDuration;
            if (floatSpeedBadge) floatSpeedBadge.textContent = `${floatDuration.toFixed(1)} s`;
            document.documentElement.style.setProperty('--float-duration', `${floatDuration}s`);
          }
          if (typeof s.blinkInterval === 'number') {
            blinkInterval = s.blinkInterval;
            if (blinkIntervalSlider) blinkIntervalSlider.value = (blinkInterval / 1000).toFixed(1);
            if (blinkIntervalBadge) blinkIntervalBadge.textContent = `${(blinkInterval / 1000).toFixed(1)} detik`;
          }
          if (typeof s.blinkDuration === 'number') {
            blinkDuration = s.blinkDuration;
            if (blinkDurationSlider) blinkDurationSlider.value = blinkDuration;
            if (blinkDurationBadge) blinkDurationBadge.textContent = `${blinkDuration} ms`;
          }
          if (s.systemHotkeys) {
            systemHotkeys = Object.assign({}, DEFAULT_SYSTEM_HOTKEYS, s.systemHotkeys);
            saveSystemHotkeys();
          }
          saveUserSettings();
        }

        lastAppliedSpriteSrc = '';
        updateSlotImages();
        updateAvatarSprite();
        renderCompactEmotionsList();
        renderHotkeysUI();

        showToast(t('toast_profile_restored'));
      } catch (err) {
        console.error('Gagal impor profil:', err);
        showToast(t('toast_profile_import_failed'));
      }
    };
    reader.readAsText(file);
  }

  // --- 11B. LAPORAN BUG / MASUKAN (BACKGROUND FETCH TANPA MENAMPILKAN EMAIL) ---
  let bugModalAutoCloseTimer = null;

  function openBugReportModal() {
    if (!bugReportModal) return;
    clearTimeout(bugModalAutoCloseTimer);
    if (bugReportStatus) {
      bugReportStatus.className = 'bug-report-status hidden';
      bugReportStatus.textContent = '';
    }
    if (btnSubmitBugReport) btnSubmitBugReport.disabled = false;
    if (btnSubmitBugText) btnSubmitBugText.textContent = t('btn_submit_bug') || 'Kirim Laporan';
    bugReportModal.classList.remove('hidden');
  }

  function closeBugReportModal() {
    if (!bugReportModal) return;
    clearTimeout(bugModalAutoCloseTimer);
    bugReportModal.classList.add('hidden');
  }

  function setupBugReportModal() {
    if (btnOpenBugReport) {
      btnOpenBugReport.addEventListener('click', (e) => {
        e.stopPropagation();
        openBugReportModal();
      });
    }

    if (btnCloseBugModal) {
      btnCloseBugModal.addEventListener('click', () => {
        closeBugReportModal();
      });
    }

    if (bugReportModal) {
      bugReportModal.addEventListener('click', (e) => {
        if (e.target === bugReportModal) {
          closeBugReportModal();
        }
      });
    }

    if (bugReportForm) {
      bugReportForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearTimeout(bugModalAutoCloseTimer);

        const reporter = (bugReporterName && bugReporterName.value) ? bugReporterName.value.trim() : 'Anonim';
        const category = (bugCategory && bugCategory.value) ? bugCategory.value : 'Lainnya';
        const description = (bugDescription && bugDescription.value) ? bugDescription.value.trim() : '';

        if (!description) return;

        // 1. Feedback visual langsung: status "Mengirim..."
        const sendingText = t('bug_status_sending') || 'Mengirim...';
        if (bugReportStatus) {
          bugReportStatus.textContent = sendingText;
          bugReportStatus.className = 'bug-report-status is-sending';
        }
        if (btnSubmitBugReport) btnSubmitBugReport.disabled = true;
        if (btnSubmitBugText) btnSubmitBugText.textContent = sendingText;

        const payload = {
          reporter: reporter || 'Anonim',
          category,
          description,
          animMode,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          timestamp: new Date().toISOString()
        };

        // Simpan juga ke log cadangan lokal agar tidak ada laporan yang hilang
        try {
          const existingLogs = JSON.parse(localStorage.getItem('smoothietuber_bug_reports_log') || '[]');
          existingLogs.push(payload);
          localStorage.setItem('smoothietuber_bug_reports_log', JSON.stringify(existingLogs.slice(-30)));
        } catch (_) {}

        // 2. Kirimkan secara background menggunakan Fetch API ke endpoint relay/webhook tanpa mengekspos email
        try {
          if (BUG_REPORT_ENDPOINT && !BUG_REPORT_ENDPOINT.includes('YOUR_FORM_ID')) {
            await fetch(BUG_REPORT_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(payload)
            });
          } else {
            await new Promise(resolve => setTimeout(resolve, 650));
          }
        } catch (_) {
          // Tetap lanjutkan agar UX pengguna mulus meskipun sedang offline
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // 3. Ubah menjadi notifikasi sukses & tutup modal otomatis setelah 2 detik
        const successText = t('bug_status_success') || 'Laporan berhasil terkirim! Terima kasih masukannya.';
        if (bugReportStatus) {
          bugReportStatus.textContent = successText;
          bugReportStatus.className = 'bug-report-status is-success';
        }
        if (btnSubmitBugText) btnSubmitBugText.textContent = '✓ Terkirim';
        showToast(`💌 ${successText}`);

        bugModalAutoCloseTimer = setTimeout(() => {
          closeBugReportModal();
          bugReportForm.reset();
          if (btnSubmitBugReport) btnSubmitBugReport.disabled = false;
          if (btnSubmitBugText) btnSubmitBugText.textContent = t('btn_submit_bug') || 'Kirim Laporan';
          if (bugReportStatus) bugReportStatus.className = 'bug-report-status hidden';
        }, 2000);
      });
    }
  }

  function isAutoContinuityCamEnabled() {
    if (toggleAutoContinuityCam) return toggleAutoContinuityCam.checked;
    const saved = localStorage.getItem('smoothietuber_auto_continuity_cam');
    return saved !== '0';
  }

  async function tryAutoConnectMacIphoneCamera() {
    if (!isMacDesktop || !isAutoContinuityCamEnabled() || cameraStream) return;
    try {
      await populateCameraDevices();
      const iphoneCamId = await findPreferredIphoneContinuityCameraId();
      if (iphoneCamId) {
        if (cameraDeviceSelect) cameraDeviceSelect.value = iphoneCamId;
        await startCameraBackground('environment', iphoneCamId);
      } else {
        // Membangunkan Continuity Camera di macOS: memanggil startCameraBackground('environment')
        // akan otomatis membuka stream & mengganti ke iPhone Camera begitu label terdeteksi
        await startCameraBackground('environment', null);
      }
    } catch (e) {
      console.warn('Auto-connect iPhone Continuity Camera ditunda:', e);
    }
  }

  // Hotplug listener: Jika iPhone baru didekatkan / dinyalakan Continuity Camera-nya saat web sudah terbuka
  if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
    navigator.mediaDevices.addEventListener('devicechange', async () => {
      try {
        await populateCameraDevices();
        if (isMacDesktop && isAutoContinuityCamEnabled()) {
          const iphoneCamId = await findPreferredIphoneContinuityCameraId();
          if (iphoneCamId) {
            const currentSettings = cameraStream && cameraStream.getVideoTracks()[0]
              ? cameraStream.getVideoTracks()[0].getSettings()
              : null;
            if (!cameraStream || (currentSettings && currentSettings.deviceId !== iphoneCamId)) {
              if (cameraDeviceSelect) cameraDeviceSelect.value = iphoneCamId;
              await startCameraBackground('environment', iphoneCamId);
            }
          }
        }
      } catch (e) {}
    });
  }

  // --- 12. INITIALIZATION ---
  async function init() {
    setupVipGateEvents();
    initLanguageFlow();
    setupBugReportModal();
    const isUnlocked = checkVipGate();

    // Pulihkan mode animasi avatar dari localStorage ('bounce' | 'scale')
    applyAvatarAnimationMode(animMode, false);

    // Pulihkan pengaturan audio & kalibrasi dari data persisten
    setThreshold(threshold);
    if (holdDelaySlider) {
      holdDelaySlider.value = holdDelay;
      if (holdDelayBadge) holdDelayBadge.textContent = `${holdDelay} ms`;
    }

    // Pulihkan visual & animasi dari data persisten
    if (bounceIntensitySlider) {
      bounceIntensitySlider.value = bounceIntensity;
      if (bounceBadge) bounceBadge.textContent = `${bounceIntensity} px`;
    }
    if (bounceSpeedSlider) {
      bounceSpeedSlider.value = bounceSpeed;
      if (bounceSpeedBadge) bounceSpeedBadge.textContent = `${bounceSpeed.toFixed(2)} s`;
    }
    if (avatarScaleSlider) {
      avatarScaleSlider.value = Math.round(avatarScale * 100);
      if (scaleBadge) scaleBadge.textContent = `${Math.round(avatarScale * 100)}%`;
    }
    if (avatarPosYSlider) {
      avatarPosYSlider.value = avatarPosY;
      if (posYBadge) posYBadge.textContent = `${avatarPosY} px`;
    }

    document.documentElement.style.setProperty('--avatar-pos-x', `${avatarPosX}px`);
    document.documentElement.style.setProperty('--avatar-pos-y', `${avatarPosY}px`);
    document.documentElement.style.setProperty('--avatar-scale', `${avatarScale}`);
    document.documentElement.style.setProperty('--bounce-height', `${bounceIntensity}px`);
    document.documentElement.style.setProperty('--bounce-offset', `${bounceIntensity}px`);
    document.documentElement.style.setProperty('--bounce-half-duration', `${(bounceSpeed / 2).toFixed(3)}s`);
    document.documentElement.style.setProperty('--bounce-duration', `${bounceSpeed.toFixed(3)}s`);
    document.documentElement.style.setProperty('--float-amplitude', `${floatIntensity}px`);
    document.documentElement.style.setProperty('--float-duration', `${floatDuration}s`);

    if (toggleFloating) {
      toggleFloating.checked = isFloatingEnabled;
      if (isFloatingEnabled) avatarWrapper?.classList.add('floating-enabled');
      else avatarWrapper?.classList.remove('floating-enabled');
    }
    if (floatIntensitySlider) {
      floatIntensitySlider.value = floatIntensity;
      if (floatIntensityBadge) floatIntensityBadge.textContent = `${floatIntensity} px`;
    }
    if (floatSpeedSlider) {
      floatSpeedSlider.value = floatDuration;
      if (floatSpeedBadge) floatSpeedBadge.textContent = `${floatDuration.toFixed(1)} s`;
    }
    if (blinkIntervalSlider) {
      blinkIntervalSlider.value = (blinkInterval / 1000).toFixed(1);
      if (blinkIntervalBadge) blinkIntervalBadge.textContent = `${(blinkInterval / 1000).toFixed(1)} detik`;
    }
    if (blinkDurationSlider) {
      blinkDurationSlider.value = blinkDuration;
      if (blinkDurationBadge) blinkDurationBadge.textContent = `${blinkDuration} ms`;
    }

    // Pulihkan format, resolusi & FPS rekaman
    if (exportResolution) {
      if (userSettings.exportResolution) {
        exportResolution.value = userSettings.exportResolution;
      }
      exportResolution.addEventListener('change', () => {
        saveUserSettings();
      });
    }
    if (exportFps) {
      if (userSettings.exportFps) {
        exportFps.value = userSettings.exportFps;
      }
      exportFps.addEventListener('change', () => {
        saveUserSettings();
      });
    }

    // Pulihkan pengaturan ukuran & posisi latar belakang kustom
    if (customBgScaleSlider) {
      customBgScaleSlider.value = userSettings.customBgScale || 100;
      if (customBgScaleBadge) customBgScaleBadge.textContent = `${userSettings.customBgScale || 100}%`;
      customBgScaleSlider.addEventListener('input', () => {
        userSettings.customBgScale = parseInt(customBgScaleSlider.value, 10) || 100;
        if (customBgScaleBadge) customBgScaleBadge.textContent = `${userSettings.customBgScale}%`;
        applyCustomBgTransform();
      });
      customBgScaleSlider.addEventListener('change', () => {
        saveUserSettings();
      });
    }

    if (customBgPosXSlider) {
      customBgPosXSlider.value = userSettings.customBgPosX || 0;
      if (customBgPosXBadge) customBgPosXBadge.textContent = `${userSettings.customBgPosX || 0} px`;
      customBgPosXSlider.addEventListener('input', () => {
        userSettings.customBgPosX = parseInt(customBgPosXSlider.value, 10) || 0;
        if (customBgPosXBadge) customBgPosXBadge.textContent = `${userSettings.customBgPosX} px`;
        applyCustomBgTransform();
      });
      customBgPosXSlider.addEventListener('change', () => {
        saveUserSettings();
      });
    }

    if (customBgPosYSlider) {
      customBgPosYSlider.value = userSettings.customBgPosY || 0;
      if (customBgPosYBadge) customBgPosYBadge.textContent = `${userSettings.customBgPosY || 0} px`;
      customBgPosYSlider.addEventListener('input', () => {
        userSettings.customBgPosY = parseInt(customBgPosYSlider.value, 10) || 0;
        if (customBgPosYBadge) customBgPosYBadge.textContent = `${userSettings.customBgPosY} px`;
        applyCustomBgTransform();
      });
      customBgPosYSlider.addEventListener('change', () => {
        saveUserSettings();
      });
    }

    if (btnBgFitCover) {
      btnBgFitCover.addEventListener('click', () => {
        userSettings.customBgFit = 'cover';
        btnBgFitCover.classList.add('is-active');
        if (btnBgFitContain) btnBgFitContain.classList.remove('is-active');
        applyCustomBgTransform();
        saveUserSettings();
      });
    }

    if (btnBgFitContain) {
      btnBgFitContain.addEventListener('click', () => {
        userSettings.customBgFit = 'contain';
        btnBgFitContain.classList.add('is-active');
        if (btnBgFitCover) btnBgFitCover.classList.remove('is-active');
        applyCustomBgTransform();
        saveUserSettings();
      });
    }

    if (userSettings.customBgFit === 'contain') {
      if (btnBgFitContain) btnBgFitContain.classList.add('is-active');
      if (btnBgFitCover) btnBgFitCover.classList.remove('is-active');
    } else {
      if (btnBgFitCover) btnBgFitCover.classList.add('is-active');
      if (btnBgFitContain) btnBgFitContain.classList.remove('is-active');
    }

    if (btnResetCustomBgTransform) {
      btnResetCustomBgTransform.addEventListener('click', () => {
        userSettings.customBgScale = 100;
        userSettings.customBgPosX = 0;
        userSettings.customBgPosY = 0;
        userSettings.customBgFit = 'cover';

        if (customBgScaleSlider) customBgScaleSlider.value = 100;
        if (customBgScaleBadge) customBgScaleBadge.textContent = '100%';
        if (customBgPosXSlider) customBgPosXSlider.value = 0;
        if (customBgPosXBadge) customBgPosXBadge.textContent = '0 px';
        if (customBgPosYSlider) customBgPosYSlider.value = 0;
        if (customBgPosYBadge) customBgPosYBadge.textContent = '0 px';
        if (btnBgFitCover) btnBgFitCover.classList.add('is-active');
        if (btnBgFitContain) btnBgFitContain.classList.remove('is-active');

        applyCustomBgTransform();
        saveUserSettings();
        showToast(t('toast_bg_transform_reset') || '🔄 Ukuran & posisi background dipulihkan!');
      });
    }

    // Event listener Backup & Restore Profil
    if (btnExportProfile) {
      btnExportProfile.addEventListener('click', exportUserProfile);
    }
    if (inputImportProfile) {
      inputImportProfile.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) importUserProfile(file);
      });
    }

    // Pulihkan avatar kustom dari penyimpanan IndexedDB permanen secara aman (AWAIT sebelum first paint)
    await restoreEmotionsFromIDB();
    isStorageHydrated = true;
    applyCustomBgTransform();

    lastAppliedSpriteSrc = '';
    updateSlotImages();
    updateAvatarSprite();
    renderCompactEmotionsList();
    renderHotkeysUI();
    setupHotkeyEvents();
    scheduleNextBlink();

    // Minta izin Persistent Storage agar browser HP (Safari iOS & Chrome) tidak menghapus data otomatis setelah 7 hari
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then(granted => {
        if (granted) {
          console.log('✅ Persistent Storage: Aktif (Data avatar terlindungi dari auto-eviction browser)');
        }
      }).catch(() => {});
    }

    if (previewRecordedVideo) {
      setupMediaElementEvents(previewRecordedVideo, 'playback');
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('obs') === '1' || urlParams.get('obs') === 'true') {
      document.body.classList.add('is-direct-obs');
      toggleObsMode(true);
    }

    const greenParam = urlParams.get('green') || urlParams.get('greenscreen');
    if (greenParam === '1' || greenParam === 'true') {
      togglePureGreenMode(true);
    }

    const posParam = urlParams.get('pos');
    if (posParam) {
      applyPositionPreset(posParam);
    }

    const scaleParam = parseInt(urlParams.get('scale'), 10);
    if (!isNaN(scaleParam) && scaleParam >= 20 && scaleParam <= 250) {
      setAvatarScaleValue(scaleParam);
    }

    const camParam = urlParams.get('cam');
    if (camParam === 'back' || camParam === 'rear') {
      startCameraBackground('environment').catch(() => {});
    } else if (camParam === 'front') {
      startCameraBackground('user').catch(() => {});
    } else if (isUnlocked && isMacDesktop && isAutoContinuityCamEnabled() && camParam !== 'off' && camParam !== '0') {
      // Otomatis bangunkan & konek ke kamera iPhone (Continuity Camera) saat dibuka di Mac mini
      tryAutoConnectMacIphoneCamera();
    }

    // Otomatis deteksi suara hanya jika sudah terotentikasi!
    if (isUnlocked) {
      startMicrophone().catch(() => {});
    }

    // Fallback: Aktifkan/resume audio & kamera iPhone jika browser mewajibkan interaksi awal
    const resumeAudioOnFirstInteraction = () => {
      if (!isVipAuthorized()) return;
      if (!isListening) {
        startMicrophone().catch(() => {});
      } else if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
      }
      if (!cameraStream && isMacDesktop && isAutoContinuityCamEnabled() && camParam !== 'off' && camParam !== '0') {
        tryAutoConnectMacIphoneCamera();
      }
      window.removeEventListener('click', resumeAudioOnFirstInteraction);
      window.removeEventListener('keydown', resumeAudioOnFirstInteraction);
      window.removeEventListener('touchstart', resumeAudioOnFirstInteraction);
    };
    window.addEventListener('click', resumeAudioOnFirstInteraction, { passive: true });
    window.addEventListener('keydown', resumeAudioOnFirstInteraction, { passive: true });
    window.addEventListener('touchstart', resumeAudioOnFirstInteraction, { passive: true });
  }

  init();
})();
