// Basic Express server opening stuff
// Coisas básicas para abrir um servidor com o Express

const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const port = 6969;
// const homePath = `http://localhost:${port}`
// Couldn't export homePath and didn't find a solution yet.
// Não consegui exportar o homePath e ainda não encontrei uma solução.

app.use(routes);
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Server online na porta ${port}.\nhttp://localhost:${port}`);
});
