import {Repository} from './Repository'
import {schema, iCart} from './schemas/Cart'
// import Contenedor from '../services/fileStore'
import Contenedor from '../services/mongoStore'
// import Contenedor from '../services/fireStore'


  
  export default class CartRepo extends Repository<iCart>{
    constructor(){
      super(schema, Contenedor, 'Carts')
    }
  }
