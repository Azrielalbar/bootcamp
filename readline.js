const readline = require("node:readline")
const{ stdin: input, stdout: output } = require("node:process");
const { log } = require("node:console");

const rl = readline.createInterface({ input, output});

rl.question("siapa nama kamu?", (answer) => {
    console.log(`nama kamu adalah ${answer}`)
        rl.close();
})
