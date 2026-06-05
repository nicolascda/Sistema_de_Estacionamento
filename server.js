require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = require('./src/app.js');

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor rodando na http://localhost:${PORT}`);
});
