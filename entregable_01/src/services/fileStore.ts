const fs = require('fs')
import { v4 as uuidv4 } from 'uuid';

export interface containerElement{
    id?: string
}

class Contenedor {
    fileName: string
    defaultFileContent: Array<JSON> = []

    constructor(filename: string) {
        this.fileName = `${filename}.json`
        this.defaultFileContent = new Array
    }

    private async writeToFile(fileContent: Array<object>, fileName: string):Promise<any> {
        return fs.promises.writeFile(fileName, JSON.stringify(fileContent))
    }

    async save(object:any):Promise<containerElement> {
        let fileContent: Array<object> = new Array
        try {
            object.id = uuidv4()
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
        return await fileContent.find( (element: any) => element.id == id)
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

    async deleteById(id:string):Promise<containerElement> {
        let deletedRecord: containerElement = {}
        let fileContent = this.getAll()
        const indexToDelete = fileContent.findIndex((element:containerElement) => element.id == id)
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

    async update(object: containerElement) {
        let fileContent = await this.getAll()
        const objectIndex = fileContent.findIndex((element:containerElement) => element.id == object.id)
        if (objectIndex < 0) {
            throw { status: 422, message: 'ID no encontrado' }
        }
        const dbObject = fileContent[objectIndex]
        Object.keys(dbObject).forEach(key => {
            dbObject[key] = typeof object[key as keyof object] !== 'undefined' ? object[key as keyof object] : dbObject[key]
        })

        fileContent.splice(objectIndex, 1, dbObject)
        await this.writeToFile(fileContent, this.fileName)
        return dbObject
    }
}

export default Contenedor
