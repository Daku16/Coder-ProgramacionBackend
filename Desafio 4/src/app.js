const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const handlebars = require('express-handlebars')
const routesProducts = require('./routes/products.router.js')
const PORT = 8080;

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname + '/public'))

app.use("/", routesProducts)

io.on('connection', (socket) => {
    console.log("Un Cliente Se Ha Conectado")
    socket.on("newProduct", (data) => {
        console.log(data)
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
