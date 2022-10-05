const Contenedor = require('./Contenedor')

class Producto{
  constructor({title, price, thumbnail, id=undefined}){
    this.title= title
    this.price = price
    this.thumbnail = thumbnail 
    this.id = id
  }
}

function generateRandomInteger(max, min=0) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

(async function test(){
    console.clear()
    const contenedor = new Contenedor('contenedor.json')

    console.log("Creating random products...")
    for (let i=0; i < 10; i++){
      const producto = new Producto({title: `producto ${i+1}`, price: generateRandomInteger(100, 1), thumbnail: './thumbnail.jpg' })
      await contenedor.save(producto)
    }


    console.log("GetAll...")
    console.log(await contenedor.getAll())

    console.log("getByID...")
    console.log(await contenedor.getByID(2))

    console.log("deleteById....")
    console.log(await contenedor.deleteById(4))

    console.log("Deleting all....")
    await contenedor.deleteAll()

    console.log(`Empty file... ${JSON.stringify(await contenedor.getAll())}`)
    
})()