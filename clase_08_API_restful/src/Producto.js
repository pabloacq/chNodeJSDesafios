class Producto {
  constructor({ title, price, thumbnail, id = undefined }) {
    this.title = title
    this.price = Number(price || undefined)
    this.thumbnail = thumbnail
    this.id = id ? Number(id) : id

    this.isValid()
  }

  isValid() {
    if (this.title !== undefined && this.title.length < 1) throw {status:400, message:'title invalido'}
    if (this.title !== undefined && isNaN(this.price)) throw {status:400, message:'precio invalido'}
    if (this.id !== undefined && isNaN(this.id)) throw {status:400, message:'ID no valido'}
  }

  static isValidID(id) {
    return !isNaN(id)
  }
}

module.exports = Producto