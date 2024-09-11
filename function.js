const fs = require("fs")

// fs.writeFilesync("test2.txt", "apa benar ya?")

fs.readFile("tes2.txt" , "utf-8" , (err, data) =>{
    if (err) throw err
    console.log(data);
    //bentar lupa

    
})

