const express = require("express");
const app = express();
const port = 3002;

const bodyParser = require("body-parser");
const db = require("./config.js");
const response = require("./request.js");
const request = require("requests");

app.use(bodyParser.json());

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM tb_mahasiswa";
  db.query(sql, (error, result) => {
    response(200, result, "data mahasiswa", res);
  });
});

app.get("/mahasiswa/:npm", (req, res) => {
  const npm = req.params.npm;
  const sql = `SELECT * FROM tb_mahasiswa where npm = '${npm}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "get detail mahasiswa", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nama, npm, alamat } = req.body;
  const sql = `INSERT INTO tb_mahasiswa (nama,npm,alamat) values ('${nama}','${npm}','${alamat}' );`;

  db.query(sql, (error, fields) => {
    if (error) response(500, "invalid", `${nama} dengan npm ${npm} sudah ditambahkan`, res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: Fields.insertId,
      };
      response(200, data, "Data berhasil disimpan", res);
    }
  });
});

app.listen(port,()=>{
  console.log(`Running in port ${port}`)
})
