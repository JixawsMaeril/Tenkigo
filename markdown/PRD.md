# Product Requirements Document (PRD): Tenkigo Weather Board

## 1. Ringkasan Proyek
Tenkigo Weather Board adalah aplikasi web cuaca mandiri di sisi klien (*client-side*) yang menggabungkan data cuaca waktu nyata (*real-time*) dengan sastra klasik Jepang. Aplikasi ini menyajikan satu kata puitis (*Tenkigo*) yang mewakili musim dan kondisi cuaca pengguna saat ini, dikemas dalam antarmuka tata letak sederhana.

## 2. Tujuan
* Menyediakan informasi cuaca dasar yang akurat.
* Memberikan pengalaman estetika dan ketenangan visual melalui tipografi dan ruang kosong (*white space*).
* Menghindari desain dasbor cuaca konvensional yang penuh dengan ikon animasi 3D.

## 3. Fitur Utama
1. **Deteksi Lokasi & Cuaca:** Mengambil data suhu dan kondisi cuaca berdasarkan lokasi pengguna (melalui Geolocation API atau pencarian manual) menggunakan OpenWeatherMap API.
2. **Mesin Logika Tenkigo:** Mencocokkan bulan saat ini (musim) dan kode kondisi cuaca dari API dengan kamus *array* internal untuk menampilkan satu kata *Tenkigo* yang tepat.
3. **Tampilan Kartu Pos Jepang:** Menampilkan karakter Kanji ukuran besar di tengah layar, dilengkapi dengan cara baca (Romaji) dan arti puitisnya.
4. **Interaksi Salin (Copy-to-Clipboard):** Pengguna dapat mengeklik area Kanji untuk menyalin karakter tersebut secara instan, ditandai dengan notifikasi visual yang tidak mencolok.

## 4. Tumpukan Teknologi (Tech Stack)
* **Frontend:** HTML5, CSS3 (Variabel CSS untuk manajemen tema), Vanilla JavaScript.
* **Backend/Database:** Tidak ada. Menggunakan struktur objek JavaScript lokal sebagai kamus data statis.
* **API Eksternal:** OpenWeatherMap API (Peringkat Gratis).