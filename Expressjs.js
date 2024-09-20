const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const fs = require("fs");

app.set("view engine", "ejs");

// Middleware untuk melayani file statis
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk halaman utama
app.get("/", (req, res) => {
    const nama = "kogie6";
    res.render('index', { nama, title: "Home" });
});

// Route untuk mengarahkan /index ke /
app.get("/index", (req, res) => {
    res.redirect("/");
});

// Route untuk halaman tentang
app.get("/about", (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Route untuk halaman kontak
app.get('/contacts', (req, res) => {
    fs.readFile(path.join(__dirname, 'contacts.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading contacts file.');
        }
        const contacts = JSON.parse(data);
        res.render('contacts', { title: 'Contacts', contacts });
    });
});

// Route untuk produk dengan kategori
app.get("/product/:prodID/category/:catID", (req, res) => {
    const { prodID, catID } = req.params;
    res.send(`Product ID: ${prodID} <b>Category ID: ${catID}</b>`);
});

// Route untuk halaman tidak ditemukan
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Mulai server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
