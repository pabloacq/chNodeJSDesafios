const { HTTPServer, webSocketServer } = require('./services/server')
const ProductContainer = require('./ProductContainer')
const Chat = require('./Chat')
const Utils = require('./Utils')


const PORT = 8080

const appServer = HTTPServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${appServer.address().port}`)
})

appServer.on('error', error => console.log(`Error en el servidor ${error}`))

webSocketServer.on('connection', (socket) => {
  productos = ProductContainer.getAll()
  socket.emit('envioDataDeProductos', { productos: productos })

  socket.on('productAdded', (data) => {
    productos = ProductContainer.getAll()
    webSocketServer.emit('envioDataDeProductos', { productos: [productos[productos.length - 1]] })
  })

  socket.on('chatConnection', (data) => {
    socket.emit('newMessage', Chat.getAllMessages().slice(-10))
  })

  socket.on('sentMessage', (data) => {
    message = Utils.addTimeStamp(data)

    const reply = new Array
    if (Chat.saveMessage(message)) {
      reply.push(message)
      webSocketServer.emit('newMessage',reply) 
    } else { 
      reply.push(Utils.addTimeStamp({sender: "CHAT-BOT", text: "Su ultimo mensaje no es valido"}))
      socket.emit('newMessage',reply) 
    }
  })

})










