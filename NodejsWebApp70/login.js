var express = require('express');
var bodyparser = require('body-parser');
const morgan = require("morgan");
const path = require("path");
var app = express();
const gorevler = [];
var port = process.env.PORT || 1337;
app.use(morgan("dev"));
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({ 'extended': 'true' }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/gorevler", (req, res) => {
    res.status(200).json(gorevler);
});

app.get("/gorevEkle", (req, res) => {
    console.log(req.query);
    gorevler.push(req.query);
    res.redirect("/gorevler1.html");
});
app.get("/gorevler2", (req, res) => {
    res.status(200).json(gorevler);
});

app.get("/gorevEkle2", (req, res) => {
    console.log(req.query);
    gorevler.push(req.query);
    res.redirect("/gorevler2.html");
});

app.post("/login", function (req, res) {
    var user1 = "kisi1";
    var pass1 = "123";
    var user2 = "kisi2";
    var pass2 = "456";

    kullaniciAdi = req.body.kullaniciAdi;
    sifre = req.body.sifre;

    if (user1 == kullaniciAdi && pass1 == sifre) {
        res.sendFile(path.join(__dirname, "kisi1.html"));
    }

    else if (user2 == kullaniciAdi && pass2 == sifre) {
        res.sendFile(path.join(__dirname, "kisi2.html"));
    }

    else {
        app.get('/', function (req, res) {
            res.redirect("/");
        });
    }
});

app.listen(port, () => {
    console.log(`Server is listening port ${port}`);
})