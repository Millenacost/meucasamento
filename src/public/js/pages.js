const fs = require("fs");
const unorm = require('unorm');

function pageIndex(req,res) {
    return res.render("index.html")
}

function pageProductsList(req,res) {
    const filePath = "src/produtos.json";

    // let products = readFileSync(filePath, "utf8");
    let products = fs.readFileSync(filePath, "utf8");
    if(products) {
        products = JSON.parse(products)
    }
    let listaProdutos = products.products;
    
    return res.render("lista-presentes.html", { listaProdutos })
}

function removeAcentos(string1) {
    string1 = unorm.nfd(string1).replace(/[\u0300-\u036f]/g, '');
    return string1;
}

function findProductByName(req, res) {

    const mostrarTodos = req.body.todos;

    if(!mostrarTodos || mostrarTodos == undefined) {
        const nomeProduto = req.body.product;
        const filePath = "src/produtos.json";
    
        let products = fs.readFileSync(filePath, "utf8");
        if(products) {
            products = JSON.parse(products)
        }

        let actualListProducts = Array.from(products.products);
        let listaProdutos = [];
        let produtoAtual = "";
        let produtoPedido = ""

        if(actualListProducts.length == 0) {
            return res.render("lista-presentes.html", { listaProdutos })
        }

        for(let i = 0; i < actualListProducts.length; i++) {
            produtoAtual = removeAcentos(actualListProducts[i].name.toLowerCase());
            produtoPedido = removeAcentos(nomeProduto.toLowerCase());
            if (produtoAtual.includes(produtoPedido)) {
                listaProdutos.push(actualListProducts[i]);
            }
        }
        return res.render("lista-presentes.html", { listaProdutos })
    }
    return res.redirect("/lista-presentes")
}

function clickPresentear(req, res) {
    if(req.body.url && req.body.redirect == "sim") {
        res.redirect(req.body.url)
    } 
}

module.exports = {
    pageIndex,
    pageProductsList,
    findProductByName,
    clickPresentear,
}