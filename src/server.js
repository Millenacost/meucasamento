//servidor
const express = require("express")
const { pageIndex, pageProductsList, findProductByName} = require("./public/js/pages.js")

// configurar nunjucks (template engine)
const nunjucks = require("nunjucks");
const server = express()
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
//receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css,scripts,imagens)
// .use(express.static("public")) //comecar enxergar o public
.use(express.static(__dirname + "/public")) //comecar enxergar o public

//rotas da aplicação
.get("/", pageIndex)
.get("/lista-presentes", pageProductsList)
.post("/busca-produtos", findProductByName)
.get("/busca-produtos", (req, res) => {
    res.redirect("/lista-presentes")
})

.listen(4000)