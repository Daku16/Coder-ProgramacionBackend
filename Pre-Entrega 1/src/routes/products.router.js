const express = require('express')
const fs = require('fs')
const router = express.Router()
const file = './src/files/products.json'

let products = JSON.parse(fs.readFileSync(file, 'utf8'))

router.get('/api/products', (req, res) => {
    res.json(products)
})

router.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const product = products.find(p => p.id === id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})
router.post('/api/products', (req, res) => {
    let product = req.body
    console.log(req.body)
    product = {
        "title": product.title,
        "description": product.description,
        "code": product.code,
        "price": product.price,
        "status": product.status,
        "stock": product.stock,
        "category": product.category,
        "thumbnail": [product.thumbnail],
    }
    addId(product)
    products.push(product)
    fs.writeFileSync(file, JSON.stringify(products, null, 2))
    res.json({ message: 'Product added' })
})

function addId(product) {
    if (products.length === 0) {
        product.id = 1
    } else {
        product.id = products[products.length - 1].id + 1
    }
}

router.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const product = products.find(p => p.id === id)
    if (product) {
        product.title = "Product modified"
        product.price = 200
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

router.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id)
    products = products.filter(p => p.id !== id)
    res.json({ message: "Product deleted" })
})

module.exports = router