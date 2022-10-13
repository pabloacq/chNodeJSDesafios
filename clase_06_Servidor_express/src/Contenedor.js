const fs = require('fs')

async function writeToFile(fileContent, fileName){
  await fs.promises.writeFile(fileName, JSON.stringify(fileContent))
}

class Contenedor{
  constructor(filename){
    this.fileName = filename
    this.defaultFileContent = new Array
    this.initialId = 1
  }

  async save(object){
    let fileContent = new Array
    try {
      fileContent = this.getAll() 
      object.id = fileContent[fileContent.length-1].id+1
    } catch (error) {
      this.#catchSaveError(error, object, fileContent)
    }
    
    fileContent.push(object)
    await writeToFile(fileContent, this.fileName)
  }
  
  #catchSaveError(error, object, fileContent){
    if (error instanceof SyntaxError || error instanceof TypeError){
      fileContent = this.defaultFileContent
      object.id = this.initialId
    }
    else{
      switch (error.errno) {
        case -2: //no such file or directory, open 
          object.id = this.initialId
          break;
        default:
          console.error(error)
          break;
      }
    }
  }

  async getByID(id){
    let fileContent =  this.getAll()
    return fileContent.find(element => element.id == id)
  }

  getAll(){
   return JSON.parse(fs.readFileSync(this.fileName,'utf-8'))
  }

  async count(){
    return this.getAll().length
  }

  async deleteById(id){
    let deletedRecord = {}
    let fileContent = this.getAll()
    const indexToDelete = fileContent.findIndex(element => element.id == id)
    
    if (indexToDelete > -1){
      deletedRecord = fileContent.splice(indexToDelete,1)[0]
      await writeToFile(fileContent, this.fileName)
    }

    return deletedRecord
  }

  async deleteAll(){
    const fileContent = new Array
    await writeToFile(fileContent, this.fileName)
  }
}

module.exports = Contenedor