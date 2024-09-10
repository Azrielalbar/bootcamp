const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const { log } = require("node:console");
const fs = require("fs");

const rl = readline.createInterface({ input, output });

//membuat pertanyaan dan jawaban
rl.question("Siapa nama kamu? ", (nama) => {
    rl.question("Berapa umur kamu? ", (umur) => {
        rl.question("Apa hobi kamu? ", (hobi) => {
            const data = `Nama: ${nama}\nUmur: ${umur}\nHobi: ${hobi}\n`;

            // Menyimpan data ke file
            fs.writeFile("tes2.txt", data, (err) => {
                if (err) {
                    log("Terjadi kesalahan saat menyimpan data.");
                } else {
                    log("Data berhasil disimpan ke file tes2.txt.");
                }
                rl.close();
            });
        });
    });
});
