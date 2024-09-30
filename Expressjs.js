const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const flash = require('connect-flash');
const session = require('express-session');

// Middleware untuk logging
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// Set view engine ke EJS
app.set('view engine', 'ejs');

// Gunakan express-ejs-layouts middleware
app.use(expressLayouts);

// Gunakan body-parser untuk menangani POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Tambahkan ini untuk menangani JSON

// Tentukan folder untuk file EJS
app.set('views', './views');

// Tentukan folder untuk file statis seperti gambar
app.use(express.static(path.join(__dirname, 'image')));

// Fungsi untuk memvalidasi email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Fungsi untuk membaca data kontak dari file
function readContactsFromFile() {
    try {
        const data = fs.readFileSync('./contacts.json', 'utf8'); // Pastikan jalur file sesuai
        return JSON.parse(data); // Kembalikan data dalam bentuk array
    } catch (error) {
        console.error('Error reading contacts:', error);
        return []; // Kembalikan array kosong jika terjadi error
    }
}

// Fungsi untuk menyimpan data kontak ke file
function saveContactsToFile(contacts) {
    try {
        fs.writeFileSync('./contacts.json', JSON.stringify(contacts, null, 2)); // Simpan kontak
    } catch (error) {
        console.error('Error saving contacts:', error);
    }
}

// Route untuk halaman Home
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// Route untuk halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kogie',
        hobbies: 'membaca buku, bermain game, dan mendengarkan musik',
        imageUrl: '/images/path-to-your-photo.jpg'
    });
});

// Route untuk halaman Contact (GET)
app.get('/contact', (req, res) => {
    const contacts = readContactsFromFile(); // Baca data dari contacts.json
    res.render('contact', { title: 'Contact Us', contacts }); // Kirim data ke view
});

// Route untuk mendapatkan detail kontak (GET)
app.get('/contact/details/:id', (req, res) => {
    const contactId = req.params.id;
    const contacts = readContactsFromFile(); // Baca data dari contacts.json
    const contact = contacts.find(c => c.id === contactId);

    if (contact) {
        res.json(contact); // Kirim detail kontak sebagai JSON
    } else {
        res.status(404).send('Contact not found');
    }
});

// Route untuk menambahkan kontak (POST)
app.post('/contact/add', (req, res) => {
    const { name, email } = req.body;

    // Validasi email
    if (!isValidEmail(email)) {
        return res.status(400).send('Email tidak valid');
    }

    const newContact = {
        id: Date.now().toString(), // Menambahkan ID unik
        name,
        email,
    };

    const contacts = readContactsFromFile(); // Baca data dari contacts.json
    contacts.push(newContact); // Tambahkan kontak baru
    saveContactsToFile(contacts); // Simpan kembali ke contacts.json

    res.redirect('/contact'); // Redirect kembali ke halaman kontak
});

// Route untuk menghapus kontak (DELETE)
app.delete('/contact/delete/:id', (req, res) => {
    const contactId = req.params.id;
    let contacts = readContactsFromFile(); // Baca data dari contacts.json

    // Filter kontak yang tidak sesuai ID yang diberikan
    contacts = contacts.filter(contact => contact.id !== contactId);
    saveContactsToFile(contacts); // Tulis kembali data kontak yang sudah diperbarui ke file

    req.flash('success', 'Contact deleted successfully!'); // Menyimpan pesan sukses
    res.redirect('/contact'); // Redirect kembali ke halaman kontak
});

// Setup session dan flash
app.use(session({
    secret: 'your secret key', // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

// Route untuk mengupdate kontak (POST)
app.post('/contact/update/:id', (req, res) => {
    const contactId = req.params.id;
    const { name, email } = req.body;

    // Validasi email
    if (!isValidEmail(email)) {
        return res.status(400).send('Email tidak valid');
    }

    const contacts = readContactsFromFile(); // Baca data kontak dari file
    const contactIndex = contacts.findIndex(contact => contact.id === contactId); // Cek index kontak

    // Cek apakah kontak ada
    if (contactIndex === -1) {
        return res.status(404).send('Kontak tidak ditemukan');
    }

    // Perbarui data kontak
    contacts[contactIndex] = {
        id: contactId,
        name,
        email,
    };

    // Simpan perubahan ke file
    saveContactsToFile(contacts); 

    // Kirim respons
    res.status(200).send('Kontak berhasil diperbarui');
});

// Jalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
