//Default exports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//making passwords secure using .env
dotenv.config({ path: "./.env" });

//importing files
const { mailNotifier } = require("./mail.js");
//initialising server
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "-" + mm + "-" + yyyy;
// console.log(today);

setInterval(() => mailNotifier("301427", today), 1740000);

app.get("/", (req, res) => {
    mailNotifier("301427", today).then((resp) => {
        res.send(resp);
    });
});
// starting the serve
app.listen(process.env.PORT, () => {
    console.log(`
            ####################################
            🛡️  Server listening on port: ${process.env.PORT} 🛡️
            ####################################
        `);
});
