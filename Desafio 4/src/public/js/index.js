const socket = io()

//Funcion para enviar un mensaje al servidor
function agregarProducto() {
    const producto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        codigo: document.getElementById('codigo').value,
        precio: document.getElementById('precio').value,
        estado: document.getElementById('estado').value,
        stock: document.getElementById('stock').value,
        categoria: document.getElementById('categoria').value,
        imagen: document.getElementById('imagen').value
    }
    socket.emit('newProduct', producto)
}

//Funcion para mostrar los mensajes en el cliente

function appendMessage(socketId, message) {
    const messageList = document.getElementById('messageList')
    const newMessage = document.createElement('p')
    newMessage.textContent = `${socketId}: ${message}`
    messageList.appendChild(newMessage)
}

socket.on("messageList", (messages) => {
    const messageList = document.getElementById('messageList')
    messageList.innerHTML = ""
    messages.forEach((msg) => {
        appendMessage(msg.socketId, msg.message)
    });
})

//Recibir mensajes del servidor
socket.on("newMessage", (data) => {
    appendMessage(data.socketId, data.mensaje)
})