# Edu Episians PWA

Paket ini mengubah pembungkus iframe Edu Episians menjadi Progressive Web App (PWA) yang dapat dipasang pada perangkat.

## Cara menggunakan

1. Unggah seluruh isi folder ini ke layanan hosting HTTPS, misalnya Cloudflare Pages, Netlify, Vercel, atau GitHub Pages.
2. Buka alamat website dari Chrome/Edge di Android atau desktop, kemudian pilih **Pasang aplikasi**.
3. Pada Safari iPhone/iPad, pilih **Bagikan → Tambahkan ke Layar Utama**.

PWA dan service worker tidak akan aktif jika `index.html` dibuka langsung melalui alamat `file://`; gunakan server lokal atau hosting HTTPS.

## Fitur

- mode aplikasi mandiri tanpa bilah alamat setelah dipasang;
- splash screen, ikon lokal, dan metadata PWA;
- tombol instalasi pada browser yang mendukung;
- indikator koneksi dan tombol pemulihan;
- cache shell aplikasi serta halaman fallback luring;
- dukungan area aman pada perangkat berponi.

## Batasan luring

Isi iframe berasal dari domain Google Apps Script. Kebijakan keamanan browser tidak mengizinkan service worker pada domain PWA ini meng-cache konten lintas domain tersebut. Karena itu, antarmuka shell dan halaman pemberitahuan tetap tersedia saat luring, sedangkan materi, autentikasi, dan data aplikasi tetap memerlukan internet.
