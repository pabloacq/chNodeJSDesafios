class Producto{
  constructor({title, price, thumbnail, id=undefined}){
    this.title= title
    this.price = Number(price || undefined)
    this.thumbnail = thumbnail
    this.id = Number(id)

    this.isValid()

  }

  isValid(){
   if (this.title.length < 1) throw 'title invalido'
   if (isNaN(this.price)) throw 'precio invalido'
  }

  static isValidID(id){
    return isNaN(id)
  }
}



module.exports = Producto