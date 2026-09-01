# REWORK V3 — Marketplace + Customer & Maker Dashboard

V3 menambahkan:
- Login/register Supabase
- Profil konsumen
- Profil penjahit/desainer
- Katalog pengrajin dari database
- Upload foto pakaian
- Pembuatan order
- Tracking status
- Dashboard penjahit/desainer
- Pengrajin melihat order yang masuk
- Pengrajin mengubah status order
- Chat konsumen ↔ pengrajin
- Review setelah order selesai
- Rating pengrajin otomatis diperbarui
- PostgreSQL + RLS
- Supabase Storage

## SETUP PALING MUDAH

### 1. Buat project Supabase
Buat project baru di Supabase.

### 2. Jalankan database
Buka **SQL Editor** → copy seluruh isi `supabase/schema.sql` → Run.

Jika sebelumnya sudah pernah menjalankan schema V2, tetap jalankan file V3 ini. Beberapa policy lama akan diganti.

### 3. Isi key
Buka `app.js`:

```js
const SUPABASE_URL="PASTE_YOUR_SUPABASE_URL_HERE";
const SUPABASE_PUBLISHABLE_KEY="PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";
```

Ganti dengan Project URL dan publishable/anon key dari project kamu.

**Jangan pernah memasukkan service_role key ke browser.**

### 4. Test
Pakai VS Code + Live Server, atau:

```bash
python -m http.server 5500
```

Lalu buka `http://localhost:5500`.

### 5. Buat akun
Daftar sebagai:
- Konsumen
- Penjahit/desainer

### 6. Hubungkan akun maker
Untuk membuat akun maker benar-benar menerima order:

1. Daftar sebagai penjahit/desainer.
2. Buka Supabase → Table Editor → `profiles`.
3. Ambil UUID user maker.
4. Buka `makers`.
5. Pada row pengrajin yang sesuai, isi `owner_user_id` dengan UUID tersebut.

Contoh:
```text
makers.owner_user_id = UUID dari profiles
```

Setelah itu login sebagai maker dan dashboard akan menampilkan order yang ditujukan kepadanya.

## ALUR DEMO LOMBA

### Sebagai konsumen
1. Register.
2. Cari pengrajin.
3. Buka profil.
4. Ajukan pesanan.
5. Upload foto pakaian.
6. Masukkan layanan, budget, dan catatan.
7. Pesanan masuk ke database.
8. Buka Pesanan.
9. Chat dengan pengrajin.
10. Lihat status sampai selesai.
11. Setelah status `Selesai`, beri review.

### Sebagai pengrajin
1. Register sebagai penjahit/desainer.
2. Hubungkan UUID akun ke `makers.owner_user_id`.
3. Login.
4. Dashboard pengrajin muncul.
5. Lihat order.
6. Chat dengan konsumen.
7. Ubah status:
   Diterima → Desain disepakati → Proses penjahit → Finishing → Siap dikirim → Selesai.
8. Konsumen melihat perubahan status.

## DEPLOY

### Netlify
Upload folder project ke Netlify. Tidak membutuhkan build command.

### GitHub Pages
Upload ke repository → Settings → Pages → Deploy dari branch utama.

Setelah online, masukkan URL website ke Supabase Authentication → URL Configuration.

## Catatan produksi

Pembayaran di V3 masih simulasi. Untuk uang sungguhan, gunakan payment gateway melalui backend/Edge Function, bukan memasukkan secret key ke browser.

Fitur yang sebaiknya ditambahkan setelah V3:
- pembayaran nyata
- ongkir/tracking
- notifikasi email/push
- portofolio foto pengrajin
- admin panel
- dispute/refund
- verifikasi identitas pengrajin
- signed/private storage untuk foto pribadi
- validasi upload lebih ketat
- monitoring dan anti-spam

## Struktur

```text
rework-fashion-app-v3/
├── index.html
├── styles.css
├── app.js
├── README.md
└── supabase/
    └── schema.sql
```
