# Style Guide & Aturan Visual: Kigo Weather Board (Dark Modern Edition)

## 1. Aturan Desain Mutlak (Modern UI Principles)
* **Dark Theme Default:** Latar belakang aplikasi harus selalu menggunakan warna gelap pekat (bukan hitam murni #000000, melainkan *dark slate* atau *charcoal* yang elegan).
* **Glassmorphism (Efek Kaca):** Kotak kartu pos di tengah tidak lagi menggunakan warna solid, melainkan transparan dengan efek `backdrop-filter: blur(16px)` dan *border* putih super tipis yang sedikit transparan.
* **Subtle Depth (Elevasi):** Gunakan `box-shadow` yang sangat halus dan melebar (menyebar luas, bukan tajam) di belakang kartu kaca untuk memisahkannya dari latar belakang gelap.
* **Neon Accents (Glow Tipis):** Berikan efek *glow* yang sangat tipis pada teks atau *border* tertentu saat di-*hover* untuk memberikan kesan interaktif yang futuristik.

## 2. Tipografi
* **UI & Data Cuaca:** Gunakan font Sans-Serif modern dan geometris yang bersih (seperti **Inter**, **Plus Jakarta Sans**, atau **SF Pro**).
* **Karakter Kanji/Kigo Utama:** Untuk kesan modern namun tetap kultural, gunakan **Noto Sans JP** (Gothic) dengan ketebalan yang sangat tebal (Bold/Black), ATAU **Noto Serif JP** dengan ketebalan tipis (Light) untuk kontras yang tajam.
* **Warna Teks:** Jangan gunakan putih murni. Gunakan *Off-white* atau *Ice Blue* untuk teks utama, dan *Slate Gray* untuk teks sekunder (Romaji dan arti).

## 3. Palet Warna (CSS Variables)
Warna aksen (glow/bayangan) akan berubah merespons cuaca, menembus lapisan kaca dari latar belakang yang gelap.

```css
:root {
  /* Dasar Gelap (Base Dark) */
  --bg-dark: #0F172A; /* Slate 900 - Latar belakang utama aplikasi */
  --glass-bg: rgba(255, 255, 255, 0.03); /* Isi kartu kaca */
  --glass-border: rgba(255, 255, 255, 0.08); /* Garis tepi kartu kaca */
  
  /* Tipografi */
  --text-primary: #F8FAFC; /* Slate 50 - Untuk Kanji dan Suhu */
  --text-secondary: #94A3B8; /* Slate 400 - Untuk terjemahan dan Romaji */
  
  /* Tema Cuaca (Subtle Neon Glows & Accents) */
  --theme-clear: #06B6D4; /* Cyan - Untuk hari cerah */
  --theme-rain: #8B5CF6; /* Violet/Purple - Untuk hujan */
  --theme-cloudy: #64748B; /* Slate 500 - Untuk mendung */
  --theme-snow: #E2E8F0; /* Slate 200 - Untuk salju */
}

4. Tata Letak & Interaksi (Layout & Micro-interactions)
Floating Panel: Kartu Kigo diletakkan tepat di tengah layar menggunakan Flexbox/Grid, seolah-olah mengambang (floating) di atas latar belakang yang gelap.

Smooth Transitions: Semua perubahan warna tema (misalnya cuaca berubah dari hujan ke cerah) harus memiliki transisi CSS yang lambat dan mulus (transition: all 0.8s ease-in-out).

Interaksi Salin (Copy): Saat kursor (mouse) mengarah ke karakter Kanji, berikan efek glow yang sesuai dengan variabel --theme saat ini. Saat diklik, kartu sedikit mengecil (transform: scale(0.98)) sebagai respons taktil (haptic feedback visual).