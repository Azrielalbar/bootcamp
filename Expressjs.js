const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// Set view engine ke EJS
app.set('view engine', 'ejs');

// Gunakan express-ejs-layouts middleware
app.use(expressLayouts);

// Gunakan body-parser untuk menangani POST request
app.use(bodyParser.urlencoded({ extended: true }));

// Tentukan folder untuk file EJS
app.set('views', './views');

// Route untuk halaman Home
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

// Route untuk halaman About
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Route untuk halaman Contact (GET)
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Route POST untuk form Contact
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Message received from ${name} (${email}): ${message}`);
  res.send('Thank you for contacting us!');
});

// Jalankan server di port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
