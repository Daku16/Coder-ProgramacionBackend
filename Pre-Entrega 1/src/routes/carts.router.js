const express = require('express')
const fs = require('fs')
const router = express.Router()
const file = './src/files/carts.json'
const productsList = './src/files/products.json'

let carts = JSON.parse(fs.readFileSync(file, 'utf8'))

router.post('/api/carts', (req, res) => {
    let cart = req.body
    cart = {
        "products": [{
            quantity: 0,
            id: 1
        }]
    }
    addId(cart)
    carts.push(cart)
    fs.writeFileSync(file, JSON.stringify(carts, null, 2))
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

router.post('/api/carts/:cid/product/:pid', (req, res) => {
    let controlador = true
    const products = JSON.parse(fs.readFileSync(productsList, 'utf8'))
    const product = products.find(p => p.id === parseInt(req.params.pid))
    const cart = carts.find(c => c.id === parseInt(req.params.cid))
    if (cart) {
        if (cart.products.length === 0) {
            cart.products.push({
                quantity: 1,
                id: product.id
            })
        } else {
            for (const c of cart.products) {
                if (c.id === product.id) {
                    c.quantity += 1
                    console.log("c.quantity", c.quantity)
                    controlador = false
                    break
                } else {
                    controlador = true
                }
            }
            if (controlador) {
                cart.products.push({
                    quantity: 1,
                    id: product.id
                })
            }
        }
        fs.writeFileSync(file, JSON.stringify(carts, null, 2))
        res.json({ message: 'Product added' })
    } else {
        res.status(404).json({ message: 'Cart not found' })
    }
})
function addId(cart) {
    carts.length === 0 ? cart.id = 1 : cart.id = carts[carts.length - 1].id + 1
}

module.exports = router