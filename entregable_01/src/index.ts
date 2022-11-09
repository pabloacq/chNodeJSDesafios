import {ProductRepo, iProduct} from './models/Product'

const productRepo = new ProductRepo();


 (async function() {
    try {
        await productRepo.save({nombre:"nombre de prod", descripcion:"descripcion de prod"});
        console.log("Save OK!")
    } catch (error) {
        console.log("Save FAIL!")
    }

const prodByID = await productRepo.getByID('98c9573a-ac18-4816-a50c-a12247cccef5')
console.log(prodByID.descripcion ? "ProdByID OK!": "ProdByID FAIL!")
console.log( (await productRepo.getAll()).length>0 ? "GetAll() OK!" : "getAll() FAIL!")

console.log(prodByID.nombre)
prodByID.nombre = "Nombre cambiado4"
await productRepo.update(prodByID)

const prodByID2 = await productRepo.getByID('98c9573a-ac18-4816-a50c-a12247cccef5')

console.log(prodByID2.nombre)
 })();

