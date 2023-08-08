const express = require('express')
const fs = require('fs')
const router = express.Router()
const file = './src/files/carts.json'

let carts = JSON.parse(fs.readFileSync(file, 'utf8'))

router.post('/api/carts', (req, res) => {
    let cart = req.body
    addId(cart)
    cart = {
        "products": []
    }
    carts.push(cart)
    res.json({ message: 'Cart added' })
})

router.get('/api/carts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const cart = carts.find(c => c.id === id)
    if (cart) {
        res.json(cart.products)
    } else {
        res.status(404).json({ message: 'Cart not found' })
    }
})

router.post('/api/carts/:id/product/:id', (req, res) => {
    productId = parseInt(req.params.id)
    res.json(products)
})
function addId(cart) {
    if (carts.length === 0) {
        cart.id = 1
    } else {
        cart.id = carts[carts.length - 1].id + 1
    }
}

module.exports = router