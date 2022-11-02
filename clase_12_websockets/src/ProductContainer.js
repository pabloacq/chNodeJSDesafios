const Contenedor =  require('./Contenedor')

function productContainer(){
  return new Contenedor(__dirname+'/DB/productos.json')
}

module.exports = productContainer()