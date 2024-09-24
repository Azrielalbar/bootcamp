const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

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
    // Baca data dari contacts.json
    fs.readFile('./contacts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading contact data.');
        }
        const contacts = JSON.parse(data); // Parse data JSON
        res.render('contact', { title: 'Contact Us', contacts }); // Kirim data ke view
    });
});

// Route untuk menambahkan kontak (POST)
app.post('/contact/add', (req, res) => {
    const newContact = {
        id: Date.now().toString(), // Menambahkan ID unik
        name: req.body.name,
        email: req.body.email,
    };

    // Baca data dari contacts.json
    fs.readFile('./contacts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading contact data.');
        }
        const contacts = JSON.parse(data); // Parse data JSON
        contacts.push(newContact); // Tambahkan kontak baru

        // Simpan kembali ke contacts.json
        fs.writeFile('./contacts.json', JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving contact data.');
            }
            res.redirect('/contact'); // Redirect kembali ke halaman kontak
        });
    });
});

// Route untuk menghapus kontak (DELETE)
app.delete('/contact/delete/:id', (req, res) => {
    const contactId = req.params.id;

    // Baca data dari contacts.json
    fs.readFile('./contacts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading contact data.');
        }
        let contacts = JSON.parse(data); // Parse data JSON

        // Filter kontak yang tidak sesuai ID yang diberikan
        contacts = contacts.filter(contact => contact.id !== contactId);

        // Tulis kembali data kontak yang sudah diperbarui ke file
        fs.writeFile('./contacts.json', JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error saving contact data.');
            }
            res.send('Contact deleted successfully.'); // Kirim respons sukses
        });
    });
});

// Jalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
