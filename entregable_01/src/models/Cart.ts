import {Repository, iEntity} from './Repository'

  export interface iCart extends iEntity{
    id?: string | undefined
    timestamp?: number | string
    products?: any[]
  }

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      id: { "type": ["string", "null"] },
      timestamp: { "type": ["number", "string"] },
      products: {"type": "array"}
    }
  }
  
  export class CartRepo extends Repository<iCart>{
    constructor(){
      super(schema)
    }
  }
