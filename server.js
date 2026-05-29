require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;


app.get('/', () => {
    console.log("oi")
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na http://localhost:${PORT}`);
});
