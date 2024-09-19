const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware untuk melayani file statis
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route untuk halaman tentang
app.get("/about", (req, res) => {
    res.send("About Page");
});

// Route untuk halaman kontak
app.get("/contact", (req, res) => {
    res.send("Contact Page");
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
