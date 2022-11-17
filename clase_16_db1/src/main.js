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

  socket.on('chatConnection',async (data) => {
    const messages = await Chat.getAllMessages()
    socket.emit('newMessage', messages.slice(-10))
  })

  socket.on('sentMessage', (data) => {
    message = Utils.addTimeStamp(data)

    const reply = new Array
    if (Chat.saveMessage(message)) {
      reply.push(message)
      webSocketServer.emit('newMessage', reply)
    } else {
      reply.push(Utils.addTimeStamp({ sender: "CHAT-BOT", text: "Su ultimo mensaje no es valido" }))
      socket.emit('newMessage', reply)
    }
  })
})




// const sql = require('./sqlContainer')
// const conf = require('./conf')

// const sqlClient = new sql(conf.mariaDB, "productos")
// const liteClient = new sql (conf.sqlite3,"mensajes")
// // sqlClient.createTable()



// test()

// async function test() {
//   const obj = {
//     "title": "Comida para perros",
//     "price": 2000,
//     "thumbnail": "/uploads/descarga.png"
//   }

//   const objNew = {
//     "title": "Updated!!!",
//     "price": 3000,
//     "id": 14
//   }

//   await sqlClient.save(obj)

//   await sqlClient.getByID(99)
//   sqlClient.getAll()

//   try {
//     const deleted = await sqlClient.deleteById(9)
//     console.log(deleted)
//   } catch (error) {
//     console.log(`Status: ${error.status} Message: ${error.message}`)
//   }

//   try {
//     const updt = await sqlClient.update(objNew)
//     console.log(updt)
//   } catch (error) {
//     console.log(`Status: ${error.status} Message: ${error.message}`)
//     console.log(error)
//   }
// }



