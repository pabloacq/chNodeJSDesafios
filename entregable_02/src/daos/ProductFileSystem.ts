import {Repository, iEntity} from './Repository'
import {schema, iProduct} from './schemas/Product'
// import Contenedor from '../services/mongoStore'
import Contenedor from '../services/fileStore'
// import Contenedor from '../services/fireStore'

 
  
  export default class ProductRepo extends Repository<iProduct>{
    constructor(){
      super(schema, Contenedor, "Products")
    }
  }
