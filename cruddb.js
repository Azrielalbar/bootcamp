const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const pool = require('./db'); 

// Middleware untuk logging
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// Set view engine ke EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'image')));

// Fungsi untuk memvalidasi email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

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
app.get('/contact', async (req, res) => {
    try {
        const contacts = await pool.query('SELECT * FROM contacts');
        res.render('contact', { title: 'Contact Us', contacts: contacts.rows });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Error fetching contacts');
    }
});

// Route untuk mendapatkan detail kontak (GET)
app.get('/contact/details/:id', async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await pool.query('SELECT * FROM contacts WHERE id = $1', [contactId]);
        if (contact.rows.length > 0) {
            res.json(contact.rows[0]);
        } else {
            res.status(404).send('Contact not found');
        }
    } catch (error) {
        console.error('Error fetching contact details:', error);
        res.status(500).send('Error fetching contact details');
    }
});

// Route untuk menambahkan kontak (POST)
app.post('/contact/add', async (req, res) => {
    const { name, mobile, email } = req.body;

    // Validasi email
    if (!isValidEmail(email)) {
        return res.status(400).send('Email tidak valid');
    }

    try {
        const newContact = await pool.query(
            'INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3) RETURNING *',
            [name, mobile, email]
        );
        res.redirect('/contact');
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).send('Error adding contact');
    }
});

// Route untuk menghapus kontak (DELETE)
app.delete('/contact/delete/:id', async (req, res) => {
    const contactId = req.params.id;

    try {
        await pool.query('DELETE FROM contacts WHERE id = $1', [contactId]);
        req.flash('success', 'Contact deleted successfully!');
        res.redirect('/contact');
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send('Error deleting contact');
    }
});

// Setup session dan flash
app.use(session({
    secret: 'your secret key', // Ganti dengan kunci rahasia Anda
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

// Route untuk mengupdate kontak (POST)
app.post('/contact/update/:id', async (req, res) => {
    const contactId = req.params.id;
    const { name, email } = req.body;

    // Validasi email
    if (!isValidEmail(email)) {
        return res.status(400).send('Email tidak valid');
    }

    try {
        await pool.query(
            'UPDATE contacts SET name = $1, email = $2 WHERE id = $3',
            [name, email, contactId]
        );
        res.status(200).send('Kontak berhasil diperbarui');
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send('Error updating contact');
    }
});

// Jalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
