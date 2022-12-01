import {iEntity} from '../Repository'

export interface iProduct extends iEntity{
    _id?: string | undefined
    nombre: string
    descripcion: string
    timestamp?: number | string
    codigo?: string
    foto?: string
    precio?: number
    stock?: number
  }

 export const schema = {
    type: "object",
    additionalProperties: false,
    properties: {      
      nombre: { type: "string"},
      descripcion: {type: "string"},
      codigo: {type:"string"},
      precio: { type: "number" },
      foto: { type: "string" },
      stock: {type: "number"},
      timestamp: {type: ["number", "string"]},
      _id: { type: "string" },
    }
  }