import {Repository, iEntity} from './Repository'

  export interface iProduct extends iEntity{
    id?: string | undefined
    nombre: string
    descripcion: string
    timestamp?: Date
    codigo?: string
    foto?: string
    precio?: number
    stock?: number
  }

  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      id: { "type": ["string", "null"] },
      nombre: { type: "string" },
      descripcion: {type: "string"},
      codigo: {type:"string"},
      precio: { type: "number" },
      foto: { type: "string" },
      stock: {type: "number"}
    },
    required: ["nombre", "descripcion"]
  }
  
  export class ProductRepo extends Repository<iProduct>{
    constructor(){
      super(schema)
    }
  }
