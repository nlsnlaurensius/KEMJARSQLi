const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3001; 

app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT, password TEXT, email TEXT, role TEXT, salary TEXT)");

    db.run("INSERT INTO users VALUES (1, 'admin', 'admin123', 'admin@netlab.com', 'ADMINISTRATOR', 'Rp 25.000.000')");
    db.run("INSERT INTO users VALUES (2, 'dosen', 'dosen123', 'dosen@ui.ac.id', 'USER', 'Rp 15.000.000')");
    db.run("INSERT INTO users VALUES (3, 'mahasiswa', 'mhs123', 'mhs@ui.ac.id', 'USER', 'Rp 0')");
});


const htmlTemplate = (content) => `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netlab Login Portal</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }
        h2 { color: #1a73e8; margin-bottom: 1.5rem; }
        .logo { font-weight: bold; font-size: 24px; color: #333; margin-bottom: 10px; }
        .logo span { color: #1a73e8; }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-sizing: border-box;
            transition: 0.3s;
        }
        input:focus { border-color: #1a73e8; outline: none; }
        input[type="submit"], button {
            width: 100%;
            background-color: #1a73e8;
            color: white;
            padding: 12px;
            margin: 10px 0;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
        }
        input[type="submit"]:hover, button:hover { background-color: #1557b0; }
        .error { color: red; background: #ffe6e6; padding: 10px; border-radius: 6px; margin-bottom: 15px; }
        .success { color: #155724; background-color: #d4edda; padding: 15px; border-radius: 6px; text-align: left; }
        .info-label { font-size: 0.85rem; color: #666; font-weight: bold; margin-top: 10px; }
        .info-value { font-size: 1.1rem; color: #333; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">NT<span>Lab</span></div>
        ${content}
    </div>
</body>
</html>
`;

app.get('/', (req, res) => {
    res.send(htmlTemplate(`
        <h2>Employee Login</h2>
        <p style="color:#666; margin-bottom:20px;">Silakan login untuk melihat slip gaji.</p>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Sign In">
        </form>
        <p style="font-size:12px; color:#aaa; margin-top:20px;">Bapak kau booyah</p>
    `));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    

    // --- [VERSI RENTAN / VULNERABLE] ---
    
    // const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    // console.log(`[SQL Log] Executing: ${query}`); 

    // db.get(query, (err, row) => {
    //     if (err) return res.send(htmlTemplate(`<div class="error">Database Error</div><a href="/">Kembali</a>`));
        
    //     if (row) {
    //         res.send(htmlTemplate(`
    //             <h2>Login Berhasil!</h2>
    //             <div class="success">
    //                 <div class="info-label">WELCOME</div>
    //                 <div class="info-value">${row.username} (${row.role})</div>
    //                 <hr style="border:0; border-top:1px solid #c3e6cb; margin:10px 0;">
    //                 <div class="info-label">EMAIL</div>
    //                 <div class="info-value">${row.email}</div>
    //                 <div class="info-label">GAJI BULAN INI</div>
    //                 <div class="info-value" style="font-weight:bold; color:#155724;">${row.salary}</div>
    //             </div>
    //             <br>
    //             <a href="/"><button style="background:#6c757d;">Logout</button></a>
    //         `));
    //     } else {
    //         res.send(htmlTemplate(`
    //             <div class="error">Login Gagal: Username atau Password salah.</div>
    //             <a href="/"><button>Coba Lagi</button></a>
    //         `));
    //     }
    // });
    

    // --- [VERSI AMAN / REMEDIATION] ---
    
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    console.log(`[SQL Log] Executing Prepared Statement for user: ${username}`);

    db.get(query, [username, password], (err, row) => {
        if (err) return res.send(htmlTemplate(`<div class="error">System Error</div>`));
        
        if (row) {
            res.send(htmlTemplate(`
                <h2>Login Berhasil!</h2>
                <div class="success">
                    <p>Selamat datang, ${row.username}!</p>
                    <p>Status: Aman dari SQL Injection.</p>
                </div>
                <a href="/"><button>Logout</button></a>
            `));
        } else {
            res.send(htmlTemplate(`
                <div class="error">Login Gagal (Secure Mode).</div>
                <a href="/"><button>Kembali</button></a>
            `));
        }
    });

});

app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
