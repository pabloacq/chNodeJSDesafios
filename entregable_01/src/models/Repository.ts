import Ajv, { ErrorObject } from "ajv"
import Contenedor, {containerElement} from "../services/fileStore";

const ajv = new Ajv();

type validationResult = { valid: boolean, errors?: ErrorObject[] | null | undefined }

const schema = {}

export interface iEntity extends containerElement{ }

export abstract class Repository<T extends iEntity> {
    private schema = {}
    private contenedor
    constructor(schema: object) {
        this.schema = schema
        this.contenedor = new Contenedor(this.constructor.name)
    }

    private async isValid(entity: T): Promise<validationResult> {
        return { valid: await ajv.validate(schema, entity), errors: ajv.errors }
    }

    async save(ent: T) {
        const valid =  await this.isValid(ent)
        if (valid.valid){
           await this.contenedor.save(ent)
        }
        else{
            console.log(valid.errors)
            'TO-DO RETURN ERROR CODES'
        }
    }

    async getByID(id:string): Promise<T> {
        const a = await this.contenedor.getByID(id) 
        return a
    }

    async getAll(): Promise<Array<T>>{
        return await this.contenedor.getAll()
    }

    async update(ent: T){
        console.log("Updating")
        await this.contenedor.update(ent)
    }
}