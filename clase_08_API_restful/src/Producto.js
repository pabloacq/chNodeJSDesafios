class Producto{
  constructor({title, price, thumbnail, id=undefined}){
    this.title= title
    this.price = Number(price)
    this.thumbnail = thumbnail 
    this.id = Number(id)
  }
}


module.exports = Producto