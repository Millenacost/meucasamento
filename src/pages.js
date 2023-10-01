function pageIndex(req,res) {
    return res.render("index.html")
}

function pageProductsList(req,res) {
    const produtosJson = "produtos.json";
    let products = null;
    fetch(produtosJson).then((response) => {
        response.json().then((produtos) => {
            console.log(produtos);
            products = produtos;
        })
    })
    console.log("meus produtos: "+products)
    return res.render("lista-presentes.html", { products })
}

module.exports = {
    pageIndex,
    pageProductsList
}