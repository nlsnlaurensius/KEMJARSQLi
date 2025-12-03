# SQL Injection Lab - Proyek Akhir Kemjar 2025

Repo ini berisi simulasi sederhana untuk mendemonstrasikan serangan **SQL Injection (SQLi)** pada fitur login, serta cara mencegahnya menggunakan *Prepared Statements*.

Proyek ini dibuat sebagai bagian dari Tugas Akhir mata kuliah Keamanan Jaringan (Kelompok 4).

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** SQLite3 (Memory)  
- **Frontend:** HTML & CSS Native  

## Fitur
1. **Vulnerable Mode:** Login rentan SQL Injection.
2. **Secure Mode:** Login yang sudah diperbaiki dengan *Parameterized Queries*.
3. **Admin Dashboard:** Halaman hanya untuk user yang berhasil login, berisi data dummy.

## Cara Menjalankan

Pastikan sudah menginstall **Node.js**.

1. Clone atau download repo.
2. Install dependencies lewat terminal:

```bash
npm install
```
3. Jalankan server:

```bash
node sqli_server.js
```

4. Buka browser dan akses:

```
http://localhost:3001
``` 

## Simulasi Serangan (POC)

Secara default aplikasi berjalan di mode **Vulnerable**.

1. Buka halaman login.
2. Masukkan payload berikut di kolom **Username**:

```
admin' --
```

> Ada spasi setelah `--`.

3. Isi password dengan sembarang angka, misalnya `123`.
4. Klik **Sign In**.  
Jika masih rentan, login akan berhasil tanpa password.

---

## Cara Memperbaiki (Mitigasi)

Untuk mengaktifkan versi aman:

1. Buka file `server_sqli.js`.
2. Temukan bagian bertanda **[VERSI RENTAN]**, lalu komentar seluruh bloknya.
3. Temukan bagian **[VERSI AMAN]**, lalu hapus tanda komentar pada blok tersebut.
4. Restart server dengan perintah:

```
Ctrl + C
node server_sqli.js
```

Setelah itu coba payload yang sama. Login akan gagal jika patch berhasil diterapkan.

---

## Struktur Project

Project ini dibuat sederhana dengan satu file utama:

```
server_sqli.js → berisi setup server, dummy database SQLite, template HTML, dan logika login (Vulnerable & Secure)
```
