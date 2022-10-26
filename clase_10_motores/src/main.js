const server = require('./services/server')

const PORT = 8080

const appServer = server.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${appServer.address().port}`)
})

appServer.on('error', error => console.log(`Error en el servidor ${error}`))
