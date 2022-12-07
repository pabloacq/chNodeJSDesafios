const Contenedor =  require('./Contenedor')
const conf = require('./conf')
const sqlContainer = require('./sqlContainer')

function productContainer(){
  return new Contenedor(__dirname+'/DB/productos.json')
  // return new sqlContainer(conf.mariaDB, "productos")
}

module.exports = productContainer()