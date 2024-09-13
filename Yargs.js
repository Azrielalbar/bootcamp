const yargs = require("yargs");
const fs = require("fs");

// Membuat command untuk mengambil input nama, email, dan mobile
yargs.command({
  command: 'add',
  describe: 'Add a new contact',
  builder: {
    name: {
      describe: 'Your Name',
      demandOption: true,  // Wajib diisi
      type: 'string'
    },
    email: {
      describe: 'Your Email',
      demandOption: true,  // Wajib diisi
      type: 'string'
    },
    mobile: {
      describe: 'Your Mobile Number',
      demandOption: true,  // Wajib diisi
      type: 'string'
    }
  },
  handler(argv) {
    const contact = {
      name: argv.name,
      email: argv.email,
      mobile: argv.mobile,
    };
    
    // Memanggil fungsi saveData dengan argumen contact dan file path
    saveData(contact, "data/Contacts.json");
  }
});

// Fungsi untuk menyimpan data ke file
const saveData = (newData, filePath) => {
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
};

// Menjalankan yargs
yargs.parse();
