const yargs = require('yargs');
const fs = require('fs');

// Fungsi untuk membaca data dari file JSON
const readData = (filePath) => {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('File kontak tidak ditemukan.');
      return [];
    } else {
      console.error('Terjadi kesalahan saat membaca data:', error);
      return [];
    }
  }
};

// Fungsi untuk menulis data ke file JSON
const writeData = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Data berhasil diperbarui.');
  } catch (error) {
    console.error('Terjadi kesalahan saat menulis data:', error);
  }
};

// Command untuk menampilkan daftar kontak (list)
yargs.command({
  command: 'list',
  describe: 'List all contact names',
  handler() {
    const contacts = readData('data/Contacts.json');

    if (contacts.length === 0) {
      console.log('Tidak ada kontak yang tersimpan.');
      return;
    }

    console.log('Daftar Kontak:');
    contacts.forEach((contact, index) => {
      console.log(`${index + 1}. ${contact.name}`);
    });
  }
});

// Command untuk menampilkan detail kontak berdasarkan nama (detail)
yargs.command({
  command: 'detail',
  describe: 'Show details of a specific contact by name',
  builder: {
    name: {
      describe: 'Contact name to show details for',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    const contacts = readData('data/Contacts.json');

    if (contacts.length === 0) {
      console.log('Tidak ada kontak yang tersimpan.');
      return;
    }

    const contact = contacts.find(contact => contact.name === argv.name);

    if (contact) {
      console.log(`Detail Kontak untuk ${argv.name}:`);
      console.log(`Nama: ${contact.name}`);
      console.log(`Email: ${contact.email}`);
      console.log(`Mobile: ${contact.mobile}`);
    } else {
      console.log('Kontak tidak ditemukan.');
    }
  }
});

// Command untuk menghapus kontak berdasarkan nama (delete)
yargs.command({
  command: 'delete',
  describe: 'Delete a contact by name',
  builder: {
    name: {
      describe: 'Contact name to delete',
      demandOption: true,
      type: 'string',
    }
  },
  handler(argv) {
    const contacts = readData('data/Contacts.json');

    const filteredContacts = contacts.filter(contact => contact.name !== argv.name);

    if (contacts.length === filteredContacts.length) {
      console.log(`Kontak dengan nama ${argv.name} tidak ditemukan.`);
    } else {
      writeData('data/Contacts.json', filteredContacts);
      console.log(`Kontak dengan nama ${argv.name} telah dihapus.`);
    }
  }
});

// Command untuk memperbarui kontak berdasarkan oldname dan newname
yargs.command({
  command: 'update',
  describe: 'Update a contact by old name and optionally change the name',
  builder: {
    oldname: {
      describe: 'Current name of the contact',
      demandOption: true,
      type: 'string',
    },
    newname: {
      describe: 'New name for the contact',
      demandOption: false,
      type: 'string',
    },
    email: {
      describe: 'New email for the contact',
      demandOption: false,
      type: 'string',
    },
    mobile: {
      describe: 'New mobile number for the contact',
      demandOption: false,
      type: 'string',
    }
  },
  handler(argv) {
    const contacts = readData('data/Contacts.json');

    // Mencari kontak berdasarkan oldname
    const index = contacts.findIndex(contact => contact.name === argv.oldname);

    if (index === -1) {
      console.log(`Kontak dengan nama ${argv.oldname} tidak ditemukan.`);
      return;
    }

    // Memperbarui nama kontak jika `newname` disediakan
    if (argv.newname) {
      contacts[index].name = argv.newname;
    }

    // Memperbarui email dan/atau mobile jika disediakan
    if (argv.email) {
      contacts[index].email = argv.email;
    }
    if (argv.mobile) {
      contacts[index].mobile = argv.mobile;
    }

    // Menyimpan kembali data yang diperbarui ke file
    writeData('data/Contacts.json', contacts);
    console.log(`Kontak dengan nama ${argv.oldname} berhasil diperbarui.`);
  }
});

// Menjalankan yargs
yargs.parse();
