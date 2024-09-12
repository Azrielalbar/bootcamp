const readline = require("node:readline");
const fs = require("fs");
const validator = require("validator");

// Membuat interface untuk input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fungsi untuk menambah dan menyimpan data
function addAndSaveData(nama, nomor, email, filePath) {
    const validEmail = validator.isEmail(email);
    const validNomor = validator.isMobilePhone(nomor); // Menambahkan parameter 'any' untuk validasi lebih fleksibel

    if (validEmail && validNomor) {
        // Membuat objek data baru
        const newData = { nama, nomor, email };

        try {
            // Membaca data dari file
            const file = fs.readFileSync(filePath, 'utf-8');
            const contacts = JSON.parse(file);

            // Menambah data baru
            contacts.push(newData);

            // Menyimpan data ke file
            fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf-8');
            console.log("Data berhasil ditambahkan dan disimpan!");
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Jika file tidak ditemukan, buat file baru dengan data baru
                const contacts = [newData];
                fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf-8');
                console.log("File tidak ditemukan, file baru dibuat dan data disimpan!");
            } else {
                console.error("Terjadi kesalahan saat membaca/saving data:", error);
            }
        }
    } else {
        if (!validEmail) console.log("Email tidak valid.");
        if (!validNomor) console.log("Nomor telepon tidak valid.");
    }
}

// Fungsi untuk input data pengguna
function getUserInput() {
    rl.question("Siapa nama kamu? ", (nama) => {
        rl.question("Berapa nomor kamu? ", (nomor) => {
            rl.question("Apa email kamu? ", (email) => {
                // Panggil fungsi addAndSaveData untuk menambah dan menyimpan data
                addAndSaveData(nama, nomor, email, "data/Contacts.json");
                rl.close();
            });
        });
    });
}

// Jalankan input pengguna
getUserInput();
