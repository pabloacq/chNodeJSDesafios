console.info("Starting... ")

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
  productos = ProductContainer.getAll().then(prods => socket.emit('envioDataDeProductos', { productos: prods }))


  socket.on('productAdded', (data) => {
    productos = ProductContainer.getAll().then(prods => webSocketServer.emit('envioDataDeProductos', { productos: [prods[prods.length - 1]] }))

  })

  socket.on('chatConnection', async (data) => {
    const messages = await Chat.getAllMessages()
    socket.emit('newMessage', messages.slice(-10))
  })

  socket.on('sentMessage', (data) => {


    try {
      message = Utils.addTimeStamp(data)
      const reply = new Array
      if (Chat.saveMessage(message)) {
        reply.push(message)
        webSocketServer.emit('newMessage', reply)
      } else {
        reply.push(Utils.addTimeStamp({ sender: "CHAT-BOT", text: "Su ultimo mensaje no es valido" }))
        socket.emit('newMessage', reply)
      }
    } catch (error) {
      console.log(error)
    }

  })
})



