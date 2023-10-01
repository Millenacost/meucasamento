//servidor
const express = require('express')
const server = express()
const { pageIndex, pageProductsList} = require("./pages")

// configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
//receber os dados do req.body
.use(express.urlencoded({ extended: true }))
// configurar arquivos estáticos (css,scripts,imagens)
.use(express.static("public")) //comecar enxergar o public
//rotas da aplicação
.get("/", pageIndex)
.get("/lista-presentes", pageProductsList)

.listen(3000)