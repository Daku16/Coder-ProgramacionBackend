const express = require('express')
const router = express.Router()

let product = []
router.get('/', (req, res) => {
    socket.on("newProduct", (data) => {
        product.push(data)
    })
    res.render("home", { product })
})


module.exports = router