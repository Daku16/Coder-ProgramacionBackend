const express = require('express')
const Contenedor = require('./Contenedor')
const app = express()
const PORT = 8080
const main = async () => {
    const contenedor = new Contenedor('productos.txt')
    let products
    await contenedor.save({
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    })
    await contenedor.save({
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    })
    await contenedor.save({
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
    })
    products = await contenedor.getAll()
    app.get('/productos', (req, res) => {
        res.json(products)
    })
    app.get('/productsRandom', (req, res) => {
        let product = products[Math.floor(Math.random() * products.length)]
        res.json(product)
    })

}
main()
const server = app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))