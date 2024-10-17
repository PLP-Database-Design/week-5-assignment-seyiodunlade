const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

const app = express();
app.set("view engine", "ejs");
dotenv.config();

app.use(express.json());

db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("Hello There!!!");
});

app.get("/patients", (req, res) => {
  db.query(
    "SELECT patient_id, first_name, last_name, date_of_birth FROM patients",
    (err, data) => {
      if (err) {
        res.status(500).end("Something went wrong!!!");
      } else {
        res.render("patients", { fname: "", results: data });
      }
    }
  );
});

app.get("/providers", (req, res) => {
  db.query(
    "SELECT first_name, last_name, provider_specialty FROM providers",
    (err, data) => {
      if (err) {
        res.status(500).end("Something went wrong!!!");
      } else {
        res.render("providers", { specialty: "", results: data });
      }
    }
  );
});

app.get("/patients_fname/:fname", (req, res) => {
  fname = req.params.fname;
  db.query(
    `SELECT * FROM patients WHERE first_name LIKE "%${fname}%"`,
    (err, data) => {
      if (err) {
        res.status(500).end("Something went wrong!!!");
      } else {
        res.render("patients", { fname: fname, results: data });
      }
    }
  );
});

app.get("/providers_specialty/:specialty", (req, res) => {
  specialty = req.params.specialty;
  db.query(
    `SELECT * FROM providers WHERE provider_specialty LIKE "%${specialty}%"`,
    (err, data) => {
      if (err) {
        res.status(500).end("Something went wrong!!!");
      } else {
        res.render("providers", { specialty: specialty, results: data });
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Connected to port ${process.env.PORT}`);
  db.connect((err) => {
    if (err) {
      console.error("Can't connect to the db!!!");
    } else {
      console.log("Connected to the db!!!");
    }
  });
});
