const mysql = require("mysql");
const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "car_wash_db",
});

database.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = database;