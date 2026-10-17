/**
 * ============================================================================
 * SmoothieTuber 🥤 - Veadotube Style Sleek Dual Dock Engine
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
      app_title: 'SmoothieTuber 🥤 - Doodle Avatar 2D Reaktif Suara',
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
      option_default_system: 'Default Sistem',
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
      label_float_intensity: 'Tinggi Ayunan:',
      label_float_speed: 'Kecepatan Melayang:',
      label_bounce: 'Pantulan Bicara (Hop):',
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
      opt_res_3_2: '📷 3:2 Kamera (1620 × 1080 - Rasio Kamera Standar)',
      opt_res_2_3: '📸 2:3 Potret (1080 × 1620 - Foto Vertikal)',
      opt_res_1_1: '⏹️ 1:1 Persegi (1080 × 1080 - Feed IG & Profil)',
      opt_res_16_9: '🖥️ 16:9 Horizontal (1920 × 1080 - YouTube / PC)',
      btn_record_start: 'Mulai Merekam Video',
      btn_record_stop: 'Hentikan Rekaman Video',
      status_record_ready: 'Siap merekam animasi reaktif audio.',
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
      toast_emotion_renamed: '✏️ Nama emosi berhasil disimpan!'
    },
    'ja': {
      app_title: 'SmoothieTuber 🥤 - 落書き風2D手描きPNGTuber',
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
      option_default_system: 'システム既定',
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
      label_float_intensity: '揺れの高さ:',
      label_float_speed: '浮遊速度:',
      label_bounce: '発声時の跳ね (Hop):',
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
      opt_res_3_2: '📷 3:2 カメラ (1620 × 1080 - 標準カメラ比率)',
      opt_res_2_3: '📸 2:3 ポートレート (1080 × 1620 - 縦向き写真)',
      opt_res_1_1: '⏹️ 1:1 正方形 (1080 × 1080 - IGフィード・アイコン)',
      opt_res_16_9: '🖥️ 16:9 横型 (1920 × 1080 - YouTube / PC)',
      btn_record_start: '録画を開始',
      btn_record_stop: '録画を停止',
      status_record_ready: '音声反応アニメーションの録画準備完了',
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
      toast_emotion_renamed: '✏️ 表情の名前を保存しました！'
    },
    'zh': {
      app_title: 'SmoothieTuber 🥤 - 涂鸦风格2D手绘PNGTuber',
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
      option_default_system: '系统默认',
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
      label_float_intensity: '浮动幅度:',
      label_float_speed: '浮动速度:',
      label_bounce: '说话跳动幅度 (Hop):',
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
      opt_res_3_2: '📷 3:2 相机 (1620 × 1080 - 经典相机画幅)',
      opt_res_2_3: '📸 2:3 肖像 (1080 × 1620 - 竖向构图)',
      opt_res_1_1: '⏹️ 1:1 方形 (1080 × 1080 - 朋友圈/小红书/头像)',
      opt_res_16_9: '🖥️ 16:9 横屏 (1920 × 1080 - B站/YouTube/PC)',
      btn_record_start: '开始录制视频',
      btn_record_stop: '停止视频录制',
      status_record_ready: '已就绪，随时可开始录制声音感应动画。',
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
      toast_emotion_renamed: '✏️ 表情名称已更新保存！'
    },
    'en-US': {
      app_title: 'SmoothieTuber 🥤 - 2D Doodle PNGTuber Studio',
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
      option_default_system: 'System Default',
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
      label_float_intensity: 'Float Amplitude:',
      label_float_speed: 'Floating Speed:',
      label_bounce: 'Speech Bounce (Hop):',
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
      opt_res_3_2: '📷 3:2 Camera (1620 × 1080 - Standard Camera Ratio)',
      opt_res_2_3: '📸 2:3 Portrait (1080 × 1620 - Vertical Photo)',
      opt_res_1_1: '⏹️ 1:1 Square (1080 × 1080 - IG Feed & Profile)',
      opt_res_16_9: '🖥️ 16:9 Landscape (1920 × 1080 - YouTube / PC)',
      btn_record_start: 'Start Video Recording',
      btn_record_stop: 'Stop Video Recording',
      status_record_ready: 'Ready to record voice-reactive animation.',
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
      toast_emotion_renamed: '✏️ Emotion name saved!'
    },
    'en-GB': {
      app_title: 'SmoothieTuber 🥤 - 2D Doodle PNGTuber Studio',
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
      option_default_system: 'System Default',
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
      label_float_intensity: 'Float Amplitude:',
      label_float_speed: 'Floating Speed:',
      label_bounce: 'Speech Bounce (Hop):',
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
      opt_res_3_2: '📷 3:2 Camera (1620 × 1080 - Standard Camera Ratio)',
      opt_res_2_3: '📸 2:3 Portrait (1080 × 1620 - Vertical Photo)',
      opt_res_1_1: '⏹️ 1:1 Square (1080 × 1080 - IG Feed & Profile)',
      opt_res_16_9: '🖥️ 16:9 Landscape (1920 × 1080 - YouTube / PC)',
      btn_record_start: 'Start Video Recording',
      btn_record_stop: 'Stop Video Recording',
      status_record_ready: 'Ready to record voice-reactive animation.',
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
      toast_emotion_renamed: '✏️ Emotion name saved!'
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
  }

  // --- 3. ROBUST STORAGE & NON-DESTRUCTIVE PERSISTENCE ENGINE ---
  const STORAGE_KEYS = {
    settings: 'smoothietuber_user_settings_v4',
    emotions: 'smoothietuber_emotions_v4',
    hotkeys: 'smoothietuber_system_hotkeys',
    lang: 'smoothietuber_lang',
    vip: 'smoothietuber_vip_auth'
  };

  const DEFAULT_SETTINGS = {
    threshold: 15.0,
    holdDelay: 160,
    bounceIntensity: 12,
    avatarScale: 1,
    avatarPosX: 0,
    avatarPosY: 0,
    isFloatingEnabled: true,
    floatIntensity: 8,
    floatDuration: 3.8,
    blinkInterval: 3500,
    blinkDuration: 160,
    activeEmotionId: 'emotion_normal'
  };

  const DEFAULT_SYSTEM_HOTKEYS = {
    toggleMute: 'm',
    toggleObs: 'h',
    resetAudio: 'r'
  };

  function cleanupLegacyStorage() {
    try {
      localStorage.removeItem('pngtuber_emotions_v2');
      localStorage.removeItem('pngtuber_emotions_v3');
      localStorage.removeItem('smoothietuber_user_settings_v1');
    } catch (e) {}
  }

  function loadUserSettings() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.settings) || localStorage.getItem('smoothietuber_user_settings_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            threshold: (typeof parsed.threshold === 'number' && !isNaN(parsed.threshold) && parsed.threshold >= 0.1 && parsed.threshold <= 40.0) ? Math.round(parsed.threshold * 10) / 10 : DEFAULT_SETTINGS.threshold,
            holdDelay: (typeof parsed.holdDelay === 'number' && !isNaN(parsed.holdDelay) && parsed.holdDelay >= 50 && parsed.holdDelay <= 500) ? parsed.holdDelay : DEFAULT_SETTINGS.holdDelay,
            bounceIntensity: (typeof parsed.bounceIntensity === 'number' && !isNaN(parsed.bounceIntensity) && parsed.bounceIntensity >= 0 && parsed.bounceIntensity <= 30) ? parsed.bounceIntensity : DEFAULT_SETTINGS.bounceIntensity,
            avatarScale: (typeof parsed.avatarScale === 'number' && !isNaN(parsed.avatarScale) && parsed.avatarScale >= 0.2 && parsed.avatarScale <= 2.5) ? parsed.avatarScale : DEFAULT_SETTINGS.avatarScale,
            avatarPosX: (typeof parsed.avatarPosX === 'number' && !isNaN(parsed.avatarPosX) && parsed.avatarPosX >= -2000 && parsed.avatarPosX <= 2000) ? parsed.avatarPosX : DEFAULT_SETTINGS.avatarPosX,
            avatarPosY: (typeof parsed.avatarPosY === 'number' && !isNaN(parsed.avatarPosY) && parsed.avatarPosY >= -2000 && parsed.avatarPosY <= 2000) ? parsed.avatarPosY : DEFAULT_SETTINGS.avatarPosY,
            isFloatingEnabled: typeof parsed.isFloatingEnabled === 'boolean' ? parsed.isFloatingEnabled : DEFAULT_SETTINGS.isFloatingEnabled,
            floatIntensity: (typeof parsed.floatIntensity === 'number' && !isNaN(parsed.floatIntensity) && parsed.floatIntensity >= 1 && parsed.floatIntensity <= 50) ? parsed.floatIntensity : DEFAULT_SETTINGS.floatIntensity,
            floatDuration: (typeof parsed.floatDuration === 'number' && !isNaN(parsed.floatDuration) && parsed.floatDuration >= 0.1 && parsed.floatDuration <= 10.0) ? parsed.floatDuration : DEFAULT_SETTINGS.floatDuration,
            blinkInterval: (typeof parsed.blinkInterval === 'number' && !isNaN(parsed.blinkInterval) && parsed.blinkInterval >= 800 && parsed.blinkInterval <= 15000) ? parsed.blinkInterval : DEFAULT_SETTINGS.blinkInterval,
            blinkDuration: (typeof parsed.blinkDuration === 'number' && !isNaN(parsed.blinkDuration) && parsed.blinkDuration >= 50 && parsed.blinkDuration <= 600) ? parsed.blinkDuration : DEFAULT_SETTINGS.blinkDuration,
            activeEmotionId: (typeof parsed.activeEmotionId === 'string' && parsed.activeEmotionId) ? parsed.activeEmotionId : DEFAULT_SETTINGS.activeEmotionId
          };
        }
      }
    } catch (e) {
      console.warn('Gagal memuat userSettings dari storage:', e);
    }
    return { ...DEFAULT_SETTINGS };
  }

  function loadEmotions() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.emotions) || localStorage.getItem('pngtuber_emotions_v3') || localStorage.getItem('pngtuber_emotions_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validated = parsed.filter(item => item && typeof item === 'object' && item.id && item.sprites);
          if (validated.length > 0) {
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
        }
      }
    } catch (e) {
      console.warn('Gagal memuat emosi tersimpan, menggunakan default:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_EMOTIONS));
  }

  function loadSystemHotkeys() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.hotkeys);
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
          avatarScale,
          avatarPosX,
          avatarPosY,
          isFloatingEnabled,
          floatIntensity,
          floatDuration,
          blinkInterval,
          blinkDuration,
          activeEmotionId
        };
        localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(payload));
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
    try {
      localStorage.setItem(STORAGE_KEYS.emotions, JSON.stringify(emotions));
    } catch (e) {
      console.warn('Gagal menyimpan emosi ke localStorage:', e);
    }
  }

  function saveSystemHotkeys() {
    try {
      localStorage.setItem(STORAGE_KEYS.hotkeys, JSON.stringify(systemHotkeys));
    } catch (e) {}
  }

  function flushAllStorage() {
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
  let audioFileSourceNode = null;
  let audioRecordDestination = null;

  let currentAudioSourceMode = 'mic'; // 'mic' | 'file'
  let isListening = false;
  let isSpeaking = false;
  let isMicMuted = false;
  let lastVoiceActiveTimestamp = 0;

  // Sliders & Configuration dimuat dari userSettings yang persisten!
  let threshold = typeof userSettings.threshold === 'number' ? userSettings.threshold : 15;
  let holdDelay = typeof userSettings.holdDelay === 'number' ? userSettings.holdDelay : 160; // ms
  let bounceIntensity = typeof userSettings.bounceIntensity === 'number' ? userSettings.bounceIntensity : 12; // px
  let avatarScale = typeof userSettings.avatarScale === 'number' ? userSettings.avatarScale : 1;
  let avatarPosX = typeof userSettings.avatarPosX === 'number' ? userSettings.avatarPosX : 0;
  let avatarPosY = typeof userSettings.avatarPosY === 'number' ? userSettings.avatarPosY : 0;
  let cameraStream = null;
  let activeCameraFacing = null;

  // Canva Floating / Breathing Animation
  let isFloatingEnabled = userSettings.isFloatingEnabled !== false;
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
  const btnPureGreenScreen = document.getElementById('btnPureGreenScreen');
  const btnQuickCameraToggle = document.getElementById('btnQuickCameraToggle');
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
  const thresholdSliderInput = document.getElementById('thresholdSliderInput');
  const thresholdBadge = document.getElementById('thresholdBadge');
  const holdDelaySlider = document.getElementById('holdDelaySlider');
  const holdDelayBadge = document.getElementById('holdDelayBadge');
  const btnDirectResetAudio = document.getElementById('btnDirectResetAudio');

  // Motion Flyout
  const toggleFloating = document.getElementById('toggleFloating');
  const floatIntensitySlider = document.getElementById('floatIntensitySlider');
  const floatIntensityBadge = document.getElementById('floatIntensityBadge');
  const floatSpeedSlider = document.getElementById('floatSpeedSlider');
  const floatSpeedBadge = document.getElementById('floatSpeedBadge');
  const bounceIntensitySlider = document.getElementById('bounceIntensity');
  const bounceBadge = document.getElementById('bounceBadge');
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
  const cameraFitToggleGroup = document.getElementById('cameraFitToggleGroup');
  const btnToggleCameraFit = document.getElementById('btnToggleCameraFit');

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
    showToast(`Emosi aktif: ${emo.name} [${emo.hotkey.toUpperCase()}]`);
  }

  // Helper untuk mengecilkan gambar besar pengguna ke 1280px agar aman di localStorage & tidak crash
  function optimizeImageFile(file, maxWidth = 1280, maxHeight = 1280) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        const dataUrl = loadEvt.target.result;
        if (!file.type || !file.type.startsWith('image/')) {
          resolve(dataUrl);
          return;
        }
        if (file.size < 180 * 1024) {
          resolve(dataUrl);
          return;
        }

        const img = new Image();
        img.onload = () => {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;

          if (w <= maxWidth && h <= maxHeight && file.size < 350 * 1024) {
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

          // Simpan dengan transparansi PNG penuh
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

  // Update Slot Thumbnails to match active emotion
  function updateSlotImages() {
    const emo = getActiveEmotion();
    if (!emo) return;

    if (slotImgClosed) slotImgClosed.src = emo.sprites.closed;
    if (slotImgOpen) slotImgOpen.src = emo.sprites.open;
    if (slotImgClosedBlink) slotImgClosedBlink.src = emo.sprites.closedBlink || emo.sprites.closed;
    if (slotImgOpenBlink) slotImgOpenBlink.src = emo.sprites.openBlink || emo.sprites.open;

    if (curEmotionName) curEmotionName.textContent = emo.name;
    if (curEmotionHotkey) curEmotionHotkey.textContent = `[${emo.hotkey.toUpperCase()}]`;

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

  // Setup click-to-upload on the 4 vertical slots dengan optimasi aman
  document.querySelectorAll('input[data-sprite-slot]').forEach(input => {
    input.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const slotKey = input.dataset.spriteSlot;
      const emo = getActiveEmotion();
      if (!emo) return;

      showToast('Memproses sprite...');
      const optimizedUrl = await optimizeImageFile(file);
      if (optimizedUrl) {
        emo.sprites[slotKey] = optimizedUrl;
        saveEmotions();
        updateSlotImages();
        updateAvatarSprite();
        showToast(`Sprite "${slotKey}" untuk "${emo.name}" tersimpan aman!`);
      }
    });
  });

  // Render Daftar Emosi Ringkas di Flyout Emosi (Dengan Fitur Rename Emosi Langsung)
  function renderCompactEmotionsList() {
    if (!emotionsListCompact) return;
    emotionsListCompact.innerHTML = '';

    emotions.forEach(emo => {
      const isCurrentActive = emo.id === activeEmotionId;
      const isRec = isRecordingHotkeyForId === emo.id;

      const row = document.createElement('div');
      row.className = `emotion-compact-row ${isCurrentActive ? 'active' : ''}`;
      row.innerHTML = `
        <div class="emotion-name-box">
          <input 
            type="text" 
            class="emotion-name-input" 
            value="${escapeHtml(emo.name)}" 
            maxlength="24" 
            placeholder="${t('placeholder_emo_name') || 'Nama emosi...'}" 
            title="${t('desc_emotions') || 'Ubah nama emosi'}"
          >
          <span class="emotion-rename-icon" title="Edit">✏️</span>
        </div>
        <button type="button" class="btn-hotkey-rebind btn-emo-rebind ${isRec ? 'is-recording-key' : ''}" title="${t('flyout_hotkeys_title') || 'Ubah Hotkey'}">
          ${isRec ? '⌨️ ...' : emo.hotkey.toUpperCase()}
        </button>
        <button type="button" class="btn btn-secondary btn-emo-select">
          ${isCurrentActive ? (t('btn_emo_active') || '✓ Aktif') : (t('btn_emo_select') || 'Pilih')}
        </button>
        ${emotions.length > 1 ? `<button type="button" class="btn-del-emotion" title="Hapus">🗑️</button>` : ''}
      `;

      // Inline Emotion Name Renaming
      const nameInput = row.querySelector('.emotion-name-input');
      const handleNameChange = () => {
        const trimmed = (nameInput.value || '').trim();
        if (trimmed && trimmed !== emo.name) {
          emo.name = trimmed;
          saveEmotions();
          if (emo.id === activeEmotionId && curEmotionName) {
            curEmotionName.textContent = emo.name;
          }
          renderHotkeysUI();
          showToast(t('toast_emotion_renamed') || '✏️ Nama emosi diperbarui!');
        } else if (!trimmed) {
          nameInput.value = emo.name;
        }
      };

      nameInput.addEventListener('change', handleNameChange);
      nameInput.addEventListener('blur', handleNameChange);
      nameInput.addEventListener('keydown', (e) => {
        e.stopPropagation(); // Mencegah pemicu hotkey saat mengetik!
        if (e.key === 'Enter') {
          nameInput.blur();
        }
      });
      nameInput.addEventListener('keyup', (e) => e.stopPropagation());

      row.querySelector('.btn-emo-select').addEventListener('click', () => {
        setActiveEmotion(emo.id);
        closeAllFlyouts();
      });

      const btnRebind = row.querySelector('.btn-emo-rebind');
      btnRebind.addEventListener('click', (e) => {
        e.stopPropagation();
        isRecordingHotkeyForId = (isRecordingHotkeyForId === emo.id) ? null : emo.id;
        isRecordingSystemHotkey = null;
        renderCompactEmotionsList();
        renderHotkeysUI();
        if (isRecordingHotkeyForId) {
          showToast(`⌨️ ${t('desc_emo_hotkeys') || 'Tekan tombol baru'} ("${emo.name}")`);
        }
      });

      const btnDel = row.querySelector('.btn-del-emotion');
      if (btnDel) {
        btnDel.addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`Hapus emosi "${emo.name}"?`)) {
            emotions = emotions.filter(e => e.id !== emo.id);
            if (activeEmotionId === emo.id) activeEmotionId = emotions[0].id;
            saveEmotions();
            setActiveEmotion(activeEmotionId);
            renderCompactEmotionsList();
            renderHotkeysUI();
          }
        });
      }

      emotionsListCompact.appendChild(row);
    });
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
    showToast(`Emosi baru ditambahkan! Hotkey: [${defaultKey.toUpperCase()}]`);
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
                ${isCurrentActive ? '<span class="badge-active-pill">✓ Aktif</span>' : ''}
              </div>
              <div class="hotkey-desc">${isCurrentActive ? 'Ekspresi tampil di avatar' : 'Tekan hotkey untuk beralih'}</div>
            </div>
          </div>
          <button type="button" class="btn-hotkey-rebind btn-emo-hotkey-rebind ${isRec ? 'is-recording-key' : ''}" data-emotion-id="${emo.id}" title="Klik untuk ubah hotkey emosi ini">
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
            showToast(`⌨️ Tekan tombol baru untuk "${emo.name}" (Esc untuk batal)`);
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
      showToast('🔇 Mikrofon Dimute');
    } else {
      showToast('🎙️ Mikrofon Di-unmute (Aktif)');
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

  function resetAudioCalibration() {
    setSpeakingState(false);
    updateVolumeMeter(0);
    lastVoiceActiveTimestamp = 0;

    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }

    showToast('🔄 Audio berhasil direkalibrasi & direset!');
  }

  // Global Keydown Handler
  window.addEventListener('keydown', (e) => {
    // 0. Tutup mode green screen murni atau modal rekaman jika Escape ditekan
    if (e.key === 'Escape') {
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
        showToast('Batal mengubah pintasan');
        return;
      }

      let chosenKey = e.key.toLowerCase();
      if (chosenKey === ' ') chosenKey = 'space';

      systemHotkeys[isRecordingSystemHotkey] = chosenKey;
      saveSystemHotkeys();
      showToast(`Pintasan diset ke: [ ${chosenKey.toUpperCase()} ]`);

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
        showToast('Batal mengubah hotkey emosi');
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
          showToast(`Hotkey [${chosenKey.toUpperCase()}] ditukar dengan "${conflictEmo.name}"`);
        } else {
          showToast(`Hotkey "${targetEmo.name}" diset ke: [ ${chosenKey.toUpperCase()} ]`);
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
          showToast(`Kembali ke: ${defaultEmo.name} [${defaultEmo.hotkey.toUpperCase()}]`);
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
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(() => {});
    }
  }

  // Tracking node sumber media agar createMediaElementSource hanya dipanggil sekali per elemen
  const connectedMediaElements = new WeakMap();

  function connectMediaElementToAudioEngine(mediaElement) {
    if (!mediaElement) return null;
    initAudioContext();

    if (connectedMediaElements.has(mediaElement)) {
      const existingNode = connectedMediaElements.get(mediaElement);
      if (audioRecordDestination) {
        try {
          existingNode.connect(audioRecordDestination);
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

      // 4. Arahkan ke audioRecordDestination agar suara rekaman tersimpan saat proses ekspor video
      if (audioRecordDestination) {
        sourceNode.connect(audioRecordDestination);
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

  async function startMicrophone() {
    initAudioContext();
    setMicStatus('connecting', 'Meminta Izin Mic...');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('SECURE_CONTEXT_REQUIRED');
      }

      const selectedDeviceId = micSelect.value || undefined;
      const constraints = {
        audio: {
          deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      };

      micStream = await navigator.mediaDevices.getUserMedia(constraints);
      if (isMicMuted) {
        micStream.getAudioTracks().forEach(t => t.enabled = false);
      }
      micSourceNode = audioContext.createMediaStreamSource(micStream);

      micSourceNode.connect(analyser);
      micSourceNode.connect(audioRecordDestination);

      currentAudioSourceMode = 'mic';
      isListening = true;
      setMicStatus('active', 'Aktif & Mendengarkan');
      populateAudioDevices();
      startAudioLoop();
      showToast('🎙️ Mikrofon aktif & mendengarkan suara!');
    } catch (err) {
      console.error('Gagal mic:', err);
      isListening = false;
      if (err.message === 'SECURE_CONTEXT_REQUIRED' || (typeof window !== 'undefined' && !window.isSecureContext)) {
        setMicStatus('error', 'Butuh HTTPS/Server');
        showToast('🔒 Mic di Android butuh HTTPS atau Local Server (bukan file:// langsung)');
      } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicStatus('error', 'Izin Ditolak');
        showToast('⚠️ Izin mikrofon ditolak. Izinkan akses mic di pengaturan browser HP');
      } else {
        setMicStatus('error', 'Izin Gagal');
        showToast('⚠️ Mikrofon tidak dapat diakses: ' + (err.message || 'Error'));
      }
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
    setMicStatus('disconnected', 'Terputus');
    if (currentAudioSourceMode === 'mic' && !isAnyMediaPlaying()) {
      isListening = false;
      stopAudioLoop();
      updateVolumeMeter(0);
      setSpeakingState(false);
    }
    showToast('Mikrofon dinonaktifkan');
  }

  function setMicStatus(state, label) {
    if (statusLed) {
      statusLed.className = 'status-led-dot';
      if (state === 'active') {
        statusLed.classList.add('led-active');
      } else if (state === 'connecting') {
        statusLed.classList.add('led-connecting');
      } else if (state === 'error') {
        statusLed.classList.add('led-error');
      } else {
        statusLed.classList.add('led-disconnected');
      }
    }
    if (btnToggleMic) {
      if (state === 'active') {
        btnToggleMic.classList.add('is-active');
      } else {
        btnToggleMic.classList.remove('is-active');
      }
    }
    if (statusText) statusText.textContent = label;
  }

  async function populateAudioDevices() {
    if (!navigator.mediaDevices?.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(d => d.kind === 'audioinput');
      if (audioInputs.length > 0) {
        micSelect.disabled = false;
        const currentVal = micSelect.value;
        micSelect.innerHTML = '';
        audioInputs.forEach((d, i) => {
          const opt = document.createElement('option');
          opt.value = d.deviceId;
          opt.textContent = d.label || `Mikrofon ${i + 1}`;
          micSelect.appendChild(opt);
        });
        if (currentVal) micSelect.value = currentVal;
      }
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
        setSpeakingState(true);
      } else {
        if (now - lastVoiceActiveTimestamp > holdDelay) {
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

    showToast(`File audio "${file.name}" siap dideteksi!`);
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
      showToast('File audio dihapus. Kembali ke mikrofon live.');
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
    const res = exportResolution ? exportResolution.value : '1080x1920';
    if (res === '1080x1920') {
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
    } else if (res === '1920x1080') {
      exportCanvas.width = 1920;
      exportCanvas.height = 1080;
    } else if (res === '800x800') {
      exportCanvas.width = 800;
      exportCanvas.height = 800;
    } else {
      // Bawaan default: 9:16 vertikal (1080 × 1920)
      exportCanvas.width = 1080;
      exportCanvas.height = 1920;
    }
  }

  let customBgImageObj = null;
  let lastValidRecordedImg = null;

  function renderExportFrame() {
    const w = exportCanvas.width;
    const h = exportCanvas.height;
    const isTransparentMode = (toggleTransparentExport && toggleTransparentExport.checked) || (exportBgMode && exportBgMode.value === 'transparent');
    const bgMode = isTransparentMode ? 'transparent' : (exportBgMode ? exportBgMode.value : 'current');
    const isCameraActive = cameraStream && cameraBgVideo && !cameraBgVideo.paused && !cameraBgVideo.ended;

    // Bersihkan seluruh bidang canvas agar murni transparan (alpha channel = 0)
    exportCtx.clearRect(0, 0, w, h);

    if (isTransparentMode || bgMode === 'transparent') {
      // JANGAN beri warna solid/fill rect pada latar belakang saat direkam (biarkan clearRect agar alpha channel tetap terjaga)
    } else if (bgMode === 'green') {
      exportCtx.fillStyle = '#00FF00';
      exportCtx.fillRect(0, 0, w, h);
    } else if (isCameraActive && bgMode !== 'green') {
      // Prioritas Utama Kamera: Jika kamera HP menyala, selalu rekam latar kamera langsung dengan rasio cover penuh (anti-gepeng)
      const vw = cameraBgVideo.videoWidth || 1280;
      const vh = cameraBgVideo.videoHeight || 720;
      const vAspect = vw / vh;
      const cAspect = w / h;
      let sx = 0, sy = 0, sw = vw, sh = vh;
      if (vAspect > cAspect) {
        sw = vh * cAspect;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / cAspect;
        sy = (vh - sh) / 2;
      }
      try {
        exportCtx.drawImage(cameraBgVideo, sx, sy, sw, sh, 0, 0, w, h);
      } catch (e) {
        try { exportCtx.drawImage(cameraBgVideo, 0, 0, w, h); } catch (_) {}
      }
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
      } else if (customBgImageObj && customBgImageObj.complete) {
        exportCtx.drawImage(customBgImageObj, 0, 0, w, h);
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

      const nowSec = performance.now() / 1000;
      const floatSine = isFloatingEnabled ? Math.sin((nowSec * 2 * Math.PI) / floatDuration) : 0;
      const currentFloatOffset = floatSine * floatIntensity;
      const currentFloatScale = isFloatingEnabled ? 1 + (floatSine * 0.012) : 1;
      const currentBounce = isSpeaking ? bounceIntensity : 0;

      const winW = window.innerWidth || 1;
      const winH = window.innerHeight || 1;
      const normX = avatarPosX / winW;
      const normY = avatarPosY / winH;

      const cx = (w / 2) + (normX * w);
      const cy = (h / 2) + (normY * h) - currentFloatOffset - currentBounce;

      exportCtx.translate(cx, cy);
      exportCtx.scale(avatarScale * currentFloatScale, avatarScale * currentFloatScale);

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
      const normX = avatarPosX / winW;
      const normY = avatarPosY / winH;
      const cx = (w / 2) + (normX * w);
      const cy = (h / 2) + (normY * h);
      exportCtx.translate(cx, cy);
      exportCtx.scale(avatarScale, avatarScale);
      const baseDimension = Math.min(w, h);
      const baseDrawHeight = baseDimension * 0.72;
      const aspect = lastValidRecordedImg.naturalWidth / lastValidRecordedImg.naturalHeight;
      const drawWidth = baseDrawHeight * aspect;
      exportCtx.drawImage(lastValidRecordedImg, -drawWidth / 2, -baseDrawHeight / 2, drawWidth, baseDrawHeight);
      exportCtx.restore();
    }

    if (isRecordingVideo) {
      currentRenderRaf = requestAnimationFrame(renderExportFrame);
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

    // Pastikan avatar mulai dari keadaan mata terbuka & sprite sudah siap (cegah kedipan terpotong)
    isBlinking = false;
    updateAvatarSprite();
    scheduleNextBlink();

    setupExportCanvasSize();
    isRecordingVideo = true;
    recordedChunks = [];

    renderExportFrame();

    const canvasStream = exportCanvas.captureStream(30);
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

    try {
      mediaRecorder = new MediaRecorder(combinedStream, selectedMime ? { mimeType: selectedMime } : {});
    } catch (err) {
      try {
        mediaRecorder = new MediaRecorder(combinedStream);
      } catch (e2) {
        console.error('MediaRecorder init failed:', e2);
        showToast('⚠️ Perekaman video tidak didukung di browser ini.');
        isRecordingVideo = false;
        return;
      }
    }

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      cancelAnimationFrame(currentRenderRaf);
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

      metaDuration.textContent = `Durasi: ${formatTime(durationSec)}`;
      metaSize.textContent = `Ukuran: ${sizeMb} MB`;
      metaFormat.textContent = isTransparentRecorded 
        ? `Format: WEBM TRANSPARAN (${actualMime.split(';')[0]})` 
        : `Format: ${actualFormat.toUpperCase()} (${actualMime.split(';')[0]})`;

      // 1. Primary Download button (.mp4 / .webm)
      if (btnDownloadVideo) {
        btnDownloadVideo.href = videoUrl;
        if (actualFormat === 'webm' || isTransparentRecorded) {
          btnDownloadVideo.download = `${baseFilename}.webm`;
          btnDownloadVideo.textContent = '✨ Unduh WebM Transparan (.webm)';
        } else {
          btnDownloadVideo.download = `${baseFilename}.mp4`;
          btnDownloadVideo.textContent = '⬇️ Unduh MP4 (.mp4)';
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
                text: 'Video rekaman dari SmoothieTuber',
                files: [shareFile]
              });
              showToast('✅ Berhasil dibagikan / disimpan ke Galeri!');
            } else if (navigator.share) {
              await navigator.share({
                title: 'SmoothieTuber Video',
                text: 'Unduh video SmoothieTuber',
                url: videoUrl
              });
            } else {
              const a = document.createElement('a');
              a.href = videoUrl;
              a.download = `${baseFilename}.${ext}`;
              a.click();
              showToast('⬇️ Mengunduh video...');
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
      showToast('🎉 Rekaman video siap disimpan!');
    };

    mediaRecorder.start(250);
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
      showToast(isTransparentMode ? '✨🔴 Merekam WebM Transparan & memutar audio...' : '🔴 Merekam & memutar audio rekaman...');
    } else {
      showToast(isTransparentMode ? '✨🔴 Merekam video WebM transparan...' : '🔴 Merekam animasi & audio...');
    }
  }

  function stopVideoRecording() {
    if (!isRecordingVideo || !mediaRecorder) return;
    isRecordingVideo = false;
    if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    setRecordingUI(false);

    // Otomatis jeda (pause) pemutaran file audio jika sedang diputar saat merekam
    if (audioFileElement && !audioFileElement.paused) {
      audioFileElement.pause();
      if (btnPlayPauseAudio) btnPlayPauseAudio.textContent = '▶️';
      checkActiveAudioPlaybackState();
    }
  }

  function setRecordingUI(recording) {
    if (recording) {
      btnQuickRecord.classList.add('is-recording');
      btnMainRecord.classList.add('is-recording');
      btnMainRecordText.textContent = 'Hentikan Rekaman Video';
      recTimer.classList.remove('hidden');

      recordTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordStartTime) / 1000);
        recTimer.textContent = formatTime(elapsed);
      }, 1000);
    } else {
      btnQuickRecord.classList.remove('is-recording');
      btnMainRecord.classList.remove('is-recording');
      btnMainRecordText.textContent = 'Mulai Merekam Video';
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
        showToast('✨ Mode Ekspor Transparan Aktif (WebM VP9 Alpha)');
      } else {
        if (exportBgMode) {
          exportBgMode.disabled = false;
          exportBgMode.value = exportBgMode.dataset.prevVal || 'current';
        }
        if (exportFormat) {
          exportFormat.disabled = false;
          exportFormat.value = exportFormat.dataset.prevVal || 'mp4';
        }
        showToast('Mode latar belakang & format video normal dipulihkan.');
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
          showToast('✨ Mode Ekspor Transparan Aktif (WebM VP9 Alpha)');
        }
      }
    });
  }

  if (exportFormat) {
    exportFormat.addEventListener('change', () => {
      if (exportFormat.value === 'webm' && (!toggleTransparentExport || !toggleTransparentExport.checked)) {
        showToast('💡 Format WebM dipilih. Aktifkan sakelar "Ekspor Transparan" untuk alpha channel murni!');
      }
    });
  }

  // --- 9. MOTION & VISUAL SLIDERS ---
  toggleFloating.addEventListener('change', (e) => {
    isFloatingEnabled = e.target.checked;
    if (isFloatingEnabled) {
      avatarWrapper.classList.add('floating-enabled');
      showToast('Efek melayang Canva aktif');
    } else {
      avatarWrapper.classList.remove('floating-enabled');
      showToast('Efek melayang Canva dimatikan');
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
    document.documentElement.style.setProperty('--bounce-offset', `${bounceIntensity}px`);
    bounceBadge.textContent = `${bounceIntensity} px`;
    saveUserSettings();
  });

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
        showToast('📍 Avatar dipindah ke Kanan Bawah');
        break;
      case 'bottom-left':
        setAvatarPosition(-xDist, yDist);
        setAvatarScaleValue(65);
        showToast('📍 Avatar dipindah ke Kiri Bawah');
        break;
      case 'top-right':
        setAvatarPosition(xDist, -yDist);
        setAvatarScaleValue(65);
        showToast('📍 Avatar dipindah ke Kanan Atas');
        break;
      case 'top-left':
        setAvatarPosition(-xDist, -yDist);
        setAvatarScaleValue(65);
        showToast('📍 Avatar dipindah ke Kiri Atas');
        break;
      case 'center':
      default:
        setAvatarPosition(0, 0);
        setAvatarScaleValue(100);
        showToast('📍 Avatar dipindah ke Tengah Layar');
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

  // --- 9C. LIVE CAMERA HANDCAM LAYER (IPHONE & ANDROID) ---
  let isCameraCoverFit = true;

  function applyCameraFitStyle() {
    if (!cameraBgVideo) return;
    if (isCameraCoverFit) {
      cameraBgVideo.style.setProperty('object-fit', 'cover', 'important');
      cameraBgVideo.classList.remove('camera-fit-contain');
      if (btnToggleCameraFit) btnToggleCameraFit.textContent = '📐 Tampilan: Penuh Layar (Cover)';
    } else {
      cameraBgVideo.style.setProperty('object-fit', 'contain', 'important');
      cameraBgVideo.classList.add('camera-fit-contain');
      if (btnToggleCameraFit) btnToggleCameraFit.textContent = '📐 Tampilan: Pas Sensor (Fit/Contain)';
    }
  }

  async function startCameraBackground(facing = 'environment') {
    stopCameraBackground(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('⚠️ Kamera tidak didukung di browser ini.');
        return;
      }

      const constraints = {
        audio: false, // Audio mic dikelola oleh Web Audio API
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (e1) {
        stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      }

      cameraStream = stream;
      activeCameraFacing = facing;

      if (cameraBgVideo) {
        cameraBgVideo.srcObject = cameraStream;
        cameraBgVideo.classList.remove('hidden');
        cameraBgVideo.muted = true;
        cameraBgVideo.playsInline = true;
        cameraBgVideo.setAttribute('playsinline', '');
        cameraBgVideo.setAttribute('webkit-playsinline', '');
        cameraBgVideo.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100dvh !important; min-width: 100vw !important; min-height: 100dvh !important; object-position: center center !important; z-index: 1 !important; pointer-events: none !important; margin: 0 !important; padding: 0 !important; border: none !important; background: #000000 !important;' + (isCameraCoverFit ? 'object-fit: cover !important;' : 'object-fit: contain !important;');
        await cameraBgVideo.play().catch(() => {});
        applyCameraFitStyle();
      }

      if (customBgLayer) customBgLayer.classList.add('hidden');
      if (btnRemoveCustomBg) btnRemoveCustomBg.classList.add('hidden');
      if (btnStopCamera) btnStopCamera.classList.remove('hidden');
      if (cameraFitToggleGroup) cameraFitToggleGroup.classList.remove('hidden');
      if (exportBgMode) exportBgMode.value = 'current';

      document.body.className = '';
      document.body.classList.add('bg-pure-transparent');

      if (facing === 'environment') {
        if (btnCameraBack) btnCameraBack.classList.add('is-active');
        if (btnCameraFront) btnCameraFront.classList.remove('is-active');
        if (btnDockCamera) {
          btnDockCamera.classList.add('is-active');
          if (dockCameraIcon) dockCameraIcon.textContent = '📷';
          btnDockCamera.title = 'Kamera Belakang Aktif (Klik untuk ganti Kamera Depan)';
        }
        if (btnQuickCameraToggle) {
          btnQuickCameraToggle.classList.add('btn-primary');
          btnQuickCameraToggle.classList.remove('btn-secondary');
          btnQuickCameraToggle.textContent = '⏹️ Matikan Kamera HP (Sedang Aktif)';
        }
        showToast('📷 Kamera Belakang aktif! (Sorot meja/kegiatan)');
      } else {
        if (btnCameraFront) btnCameraFront.classList.add('is-active');
        if (btnCameraBack) btnCameraBack.classList.remove('is-active');
        if (btnDockCamera) {
          btnDockCamera.classList.add('is-active');
          if (dockCameraIcon) dockCameraIcon.textContent = '🤳';
          btnDockCamera.title = 'Kamera Depan Aktif (Klik untuk matikan kamera)';
        }
        if (btnQuickCameraToggle) {
          btnQuickCameraToggle.classList.add('btn-primary');
          btnQuickCameraToggle.classList.remove('btn-secondary');
          btnQuickCameraToggle.textContent = '⏹️ Matikan Kamera HP (Sedang Aktif)';
        }
        showToast('🤳 Kamera Depan aktif!');
      }
    } catch (err) {
      console.error('Kamera error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        showToast('⚠️ Izin kamera ditolak. Berikan izin di browser HP.');
      } else {
        showToast('⚠️ Gagal menyalakan kamera: ' + (err.message || 'Error'));
      }
    }
  }

  function stopCameraBackground(notify = true) {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      cameraStream = null;
    }
    activeCameraFacing = null;
    if (cameraBgVideo) {
      cameraBgVideo.srcObject = null;
      cameraBgVideo.classList.add('hidden');
    }
    if (btnStopCamera) btnStopCamera.classList.add('hidden');
    if (cameraFitToggleGroup) cameraFitToggleGroup.classList.add('hidden');
    if (btnCameraBack) btnCameraBack.classList.remove('is-active');
    if (btnCameraFront) btnCameraFront.classList.remove('is-active');

    if (btnDockCamera) {
      btnDockCamera.classList.remove('is-active');
      if (dockCameraIcon) dockCameraIcon.textContent = '📷';
      btnDockCamera.title = 'Kamera Langsung Handcam (Klik: Belakang / Depan / Mati)';
    }
    if (btnQuickCameraToggle) {
      btnQuickCameraToggle.classList.remove('btn-primary');
      btnQuickCameraToggle.classList.add('btn-secondary');
      btnQuickCameraToggle.textContent = '📷 Aktifkan Kamera Langsung (Handcam)';
    }

    if (document.body.classList.contains('bg-pure-transparent')) {
      document.body.classList.remove('bg-pure-transparent');
      document.body.classList.add('bg-checkerboard');
      if (bgChoiceButtons && bgChoiceButtons[0]) bgChoiceButtons[0].classList.add('active');
    }

    if (notify) showToast('Kamera HP dinonaktifkan');
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
  if (btnToggleCameraFit) {
    btnToggleCameraFit.addEventListener('click', () => {
      isCameraCoverFit = !isCameraCoverFit;
      applyCameraFitStyle();
      showToast(isCameraCoverFit ? '📐 Mode: Kamera Penuh Layar (Cover)' : '📐 Mode: Kamera Pas Sensor (Fit)');
    });
  }

  if (cameraBgVideo) {
    cameraBgVideo.addEventListener('loadedmetadata', () => {
      cameraBgVideo.style.width = '100vw';
      cameraBgVideo.style.height = '100dvh';
      applyCameraFitStyle();
    });
  }

  window.addEventListener('resize', () => {
    if (cameraStream && cameraBgVideo) {
      cameraBgVideo.style.width = '100vw';
      cameraBgVideo.style.height = '100dvh';
    }
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
      customBgImageObj = null;
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
      customBgLayer.style.backgroundImage = `url("${dataUrl}")`;
      customBgLayer.classList.remove('hidden');
      btnRemoveCustomBg.classList.remove('hidden');

      customBgImageObj = new Image();
      customBgImageObj.src = dataUrl;

      bgChoiceButtons.forEach(b => b.classList.remove('active'));
      document.body.className = '';
      showToast('Latar belakang kustom dipasang!');
    };
    reader.readAsDataURL(file);
  });

  btnRemoveCustomBg.addEventListener('click', () => {
    stopCameraBackground(false);
    customBgLayer.style.backgroundImage = '';
    customBgLayer.classList.add('hidden');
    customBgImageObj = null;
    btnRemoveCustomBg.classList.add('hidden');
    document.body.classList.add('bg-checkerboard');
    bgChoiceButtons[0].classList.add('active');
  });

  // --- 10. OBS MODE ---
  function toggleObsMode(hide) {
    if (hide) {
      document.body.classList.add('obs-mode');
      closeAllFlyouts();
      btnRestoreControls.classList.remove('hidden');
      showToast('Mode OBS aktif (Tekan H untuk kembali)');
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
      showToast('🟩 Mode Green Screen Murni (#00FF00) Aktif (Prism Live Ready)');
    } else {
      document.body.classList.remove('pure-green-mode');
      if (btnRestorePureGreen) btnRestorePureGreen.classList.add('hidden');
      if (btnDockGreenScreen) btnDockGreenScreen.classList.remove('is-active');
      showToast('Kembali ke tampilan editor');
    }
  }

  if (btnDockGreenScreen) {
    btnDockGreenScreen.addEventListener('click', () => togglePureGreenMode(!isPureGreenMode));
  }
  if (btnPureGreenScreen) {
    btnPureGreenScreen.addEventListener('click', () => togglePureGreenMode(true));
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
  if (btnQuickCameraToggle) {
    btnQuickCameraToggle.addEventListener('click', () => {
      if (cameraStream) {
        stopCameraBackground(true);
      } else {
        startCameraBackground('environment');
      }
    });
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
        showToast('Hotkey dikembalikan ke default: M, H, R!');
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
        showToast('Hotkey emosi dikembalikan ke default: [1], [2], [3]...');
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

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      const nowStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `SmoothieTuber-Profile-${nowStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      showToast('💾 Profil avatar & pengaturan berhasil dicadangkan!');
    } catch (err) {
      console.error('Gagal ekspor profil:', err);
      showToast('⚠️ Gagal mengekspor profil');
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
            document.documentElement.style.setProperty('--bounce-offset', `${bounceIntensity}px`);
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

        updateSlotImages();
        updateAvatarSprite();
        renderCompactEmotionsList();
        renderHotkeysUI();

        showToast('🎉 Profil avatar berhasil dipulihkan!');
      } catch (err) {
        console.error('Gagal impor profil:', err);
        showToast('⚠️ Gagal membaca file backup: Format tidak sesuai');
      }
    };
    reader.readAsText(file);
  }

  // --- 12. INITIALIZATION ---
  function init() {
    cleanupLegacyStorage();
    setupVipGateEvents();
    initLanguageFlow();
    const isUnlocked = checkVipGate();

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
    document.documentElement.style.setProperty('--bounce-offset', `${bounceIntensity}px`);
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

    updateSlotImages();
    updateAvatarSprite();
    renderCompactEmotionsList();
    renderHotkeysUI();
    setupHotkeyEvents();
    scheduleNextBlink();

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
    }

    // Otomatis deteksi suara hanya jika sudah terotentikasi!
    if (isUnlocked) {
      startMicrophone().catch(() => {});
    }

    // Fallback: Aktifkan/resume audio jika browser mewajibkan interaksi awal
    const resumeAudioOnFirstInteraction = () => {
      if (!isVipAuthorized()) return;
      if (!isListening) {
        startMicrophone().catch(() => {});
      } else if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
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
