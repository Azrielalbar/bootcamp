const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const pool = require('./db'); // Import database connection

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

// Setup session dan flash
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

// Fungsi untuk mendapatkan semua kontak
async function getData() {
    try {
        const result = await pool.query('SELECT * FROM contacts');
        return result.rows;
    } catch (error) {
        console.error("Gagal mengambil data dari database:", error.message);
        throw error;
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
        hobbies: 'Membaca buku, bermain game, dan mendengarkan musik',
        imageUrl: '/images/path-to-your-photo.jpg'
    });
});

// Route untuk halaman Contact (GET)
app.get('/contact', async (req, res) => {
    try {
        const contacts = await getData();
        res.render('contact', { title: 'Contact Us', contacts });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Error fetching contacts');
    }
});

// Route untuk menambah kontak (POST)
app.post("/contact/add", async (req, res) => {
    const { name, mobile, email } = req.body;

    try {
        let contact = await pool.query('SELECT * FROM contacts WHERE name = $1', [name]);

        if (contact.rows.length > 0) {
            console.log("Nama sudah ada");
            return res.redirect('/contact');
        }

        await pool.query(
            'INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3)', [name, mobile, email]
        );

        res.redirect("/contact");
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route untuk update kontak (POST)
app.post("/contact/update", async (req, res) => {
    const { oldName, name, mobile, email } = req.body;

    try {
        let contact = await pool.query('SELECT * FROM contacts WHERE name = $1', [oldName]);

        if (contact.rows.length === 0) {
            console.log("Kontak tidak ditemukan");
            return res.redirect('/contact');
        }

        await pool.query(
            'UPDATE contacts SET name = $1, mobile = $2, email = $3 WHERE name = $4',
            [name, mobile, email, oldName]
        );

        console.log("Kontak berhasil diupdate");
        res.redirect("/contact");
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route untuk menghapus kontak (POST)
app.post('/contacts/delete', async (req, res) => {
    const { name } = req.body;

    try {
        let contact = await pool.query('SELECT * FROM contacts WHERE name = $1', [name]);

        if (contact.rows.length === 0) {
            return res.status(404).send('Kontak tidak ditemukan');
        }

        await pool.query('DELETE FROM contacts WHERE name = $1', [name]);

        console.log(`Kontak ${name} berhasil dihapus`);
        res.redirect('/contact');
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route untuk halaman 404
app.use("/", (req, res) => {
    res.status(404);
    res.send("Page not found: 404");
});

// Jalankan server di port 3000
app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
