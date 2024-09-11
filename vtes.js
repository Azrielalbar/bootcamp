const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const { log } = require("node:console");
const fs = require("fs");
const validator = require("validator")

const rl = readline.createInterface({ input, output });

//membuat pertanyaan dan jawaban
rl.question("Siapa nama kamu? ", (nama) => {
    rl.question("Berapa nomor kamu? ", (nomor) => {
        rl.question("Apa email kamu? ", (email) => {
           const validemail = validator.isEmail(email);
           const validnomor = validator.isMobilePhone(nomor);
           if (validemail&&validnomor){
            const data = `Nama: ${nama}\nUmur: ${nomor}\nHobi: ${email}\n`;

            // Menyimpan data ke file
            fs.writeFile("tes2.txt", data, (err) => {
                if (err) {
                    log("Terjadi kesalahan saat menyimpan data.");
                } else {
                    log("Data berhasil disimpan ke file tes2.txt.");
                }
                
            });
        } else {
            if (!validemail){
                console.log("email anda salah");
                
            }
            if (!validnomor){
                console.log("nomor anda salah");
                
            }
        }
        rl.close();
        });
    });
});
