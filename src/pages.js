const fs = require('fs');

function pageIndex(req,res) {
    return res.render("index.html")
}

function pageProductsList(req,res) {
    const filePath = "src/produtos.json";

    let products = fs.readFileSync(filePath, "utf8");
    if(products) {
        products = JSON.parse(products)
    }
    let listaProdutos = products.products;
    
    return res.render("lista-presentes.html", { listaProdutos })
}

module.exports = {
    pageIndex,
    pageProductsList
}