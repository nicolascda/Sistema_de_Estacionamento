const express = require("express");
const cors = require("cors");

const clienteRoute = require("./routes/cliente.route.js");
const usuarioRoute = require("./routes/usuario.route.js");
const veiculoRoute = require("./routes/veiculo.route.js");
const vagaRoute = require("./routes/vaga.route.js");
const movimentacaoRoute = require("./routes/movimentacao.route.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/clientes", clienteRoute);
app.use("/usuarios", usuarioRoute);
app.use("/veiculos", veiculoRoute);
app.use("/vagas", vagaRoute);
app.use("/movimentacoes", movimentacaoRoute);

app.get('/', (req, res) => {
    console.log("oi");
});

module.exports = app;