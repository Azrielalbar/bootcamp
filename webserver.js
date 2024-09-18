const { log } = require("console");
const http = require("http");
const fs = require("fs")

http.createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, {
        "Content-Type": "text/html",
    });

    const handleAbout = (res) => {
        res.write("<h1>Ini halaman about</h1>");
        res.end();
    };
    
    const handleContact = (res) => {
        res.write("<h2>Ini halaman contact</h2>");
        res.end();
    };
    
    const handleNotFound = (res) => {
        fs.readFile("./index.html", (err, data) => {
            if (err) {
                res.writeHead(404);
                res.write("Error: Halaman tidak ditemukan");
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });
    };

    if (url === "/about") {
        handleAbout(res);
    } else if (url === "/contact") {
        handleContact(res);
    } else {
        handleNotFound(res);
    }
}).listen(3000, () => {
    log("Server is listening on port 3000");
});
