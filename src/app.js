const express = require("express");
const cors = require("cors");

const clienteRoute = require("./routes/cliente.route.js");
const usuarioRoute = require("./routes/usuario.route.js");
const veiculoRoute = require("./routes/veiculo.route.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/clientes", clienteRoute);
app.use("/usuarios", usuarioRoute);
app.use("/veiculos", veiculoRoute);

app.get('/', (req, res) => {
    console.log("oi");
});

module.exports = app;