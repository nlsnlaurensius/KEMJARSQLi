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

