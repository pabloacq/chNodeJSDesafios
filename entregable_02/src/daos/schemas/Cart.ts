import {iEntity} from '../Repository'

export interface iCart extends iEntity{
    _id?: string | undefined
    timestamp?: number | string
    products?: any[]
  }

export const schema = {
    type: "object",
    additionalProperties: true,  /*TO - DO arreglar esto */
    properties: {
      // _id: { type: "string" },
      // timestamp: { type: "number" },
      // products: {type: "array"}
    }
  }