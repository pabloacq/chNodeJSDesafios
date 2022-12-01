import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import {iContainerElement, iContenedor} from './Store'


class Contenedor<T extends iContainerElement> implements iContenedor<T> {
    fileName: string
    defaultFileContent: Array<JSON> = []

    constructor(filename: string) {
        this.fileName = `${__dirname}/../../${filename}.json`
        this.defaultFileContent = new Array
    }

    private async writeToFile(fileContent: Array<object>, fileName: string):Promise<any> {
        return fs.promises.writeFile(fileName, JSON.stringify(fileContent))
    }

    async save(object:any):Promise<T> {
        let fileContent: Array<object> = new Array
        try {
            object._id = uuidv4()
            fileContent = await this.getAll()
        } catch (error) {
            console.log(error)
        }
        fileContent.push(object)
        await this.writeToFile(fileContent, this.fileName)
        return object
    }

    async getByID(id:string) {
        let fileContent = await this.getAll()
        return await fileContent.find( (element: any) => element._id == id)
    }

    getAll() {
        try {
            const fileContent = fs.readFileSync(this.fileName, 'utf-8')
            return JSON.parse(fileContent)
        } catch (error) {
            //SyntaxError - TypeError = Error from getAll, output file is not valid JSON
            //errno -2 = File does not exist
            if ((error instanceof SyntaxError) || !(error instanceof TypeError) || (error as NodeJS.ErrnoException).errno != -2){ 
                if  (error instanceof SyntaxError)
                {console.log("Syntax error")}
                return []
            }
            throw error
        }
    }

    async count() {
        return this.getAll().length
    }

    async deleteById(id:string):Promise<T> {
        let deletedRecord: T
        let fileContent = this.getAll()
        const indexToDelete = fileContent.findIndex((element:iContainerElement) => element._id == id)
        if (indexToDelete < 0) {
            throw { status: 422, message: 'ID no encontrado' }
        }

        deletedRecord = fileContent.splice(indexToDelete, 1)[0]
        await this.writeToFile(fileContent, this.fileName)
        return deletedRecord
    }

    async deleteAll() {
        const fileContent = new Array
        await this.writeToFile(fileContent, this.fileName)
    }

    async update(object: T) {
        let fileContent = await this.getAll()
        const objectIndex = fileContent.findIndex((element:T) => element._id == object._id)
        if (objectIndex < 0) {
            throw { status: 422, message: 'ID no encontrado' }
        }

        fileContent.splice(objectIndex, 1, object)
        
        await this.writeToFile(fileContent, this.fileName)
        return object
    }
}

export default Contenedor
