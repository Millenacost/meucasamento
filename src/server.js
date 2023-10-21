//servidor
const express = require("express")
const { pageIndex, pageProductsList, findProductByName, clickPresentear} = require("./public/js/pages.js")

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
.use(function (req,res,next) {
    res.setHeader("Cache-control", "no-store")
    next()
})
//rotas da aplicação
.get("/", pageIndex)
.get("/lista-presentes", pageProductsList)
.post("/busca-produtos", findProductByName)
.get("/busca-produtos", (req, res) => {
    res.redirect("/lista-presentes")
})
.post("/presentear", clickPresentear)
// .get("/presentear", redirecPresentear)

.listen(4000)