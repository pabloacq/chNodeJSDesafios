const knex = require('knex')

class sqlClient {

    constructor(config, tableName) {
        this.knex = knex(config)
        this.tableName = tableName
    }

    async save(object) {
        const id = await this.knex.insert(object, 'id').into(this.tableName)
        object.id = id[0]
        return object
    }


    async getByID(id) {
        const returnValue = await this.knex(this.tableName).where({
            id: id
        }).select('*')

        return { ...returnValue[0] }
    }

    async getAll() {
        const returnArray = await this.knex.from(this.tableName).select('*')
        const converteArray = returnArray.map(elem => { return { ...elem } })
        return converteArray
    }

    async deleteById(id) {
        const deletedObject = await this.getByID(id)
        if (!deletedObject.id) {
            throw { status: 422, message: 'ID no encontrado' }
        }
        await this.knex.from(this.tableName).where('id', id).del()
        return deletedObject
    }

    async deleteAll() {
        await this.knex.from(this.tableName).del()
    }

    async update(object){
        const updatedObject = await this.getByID(object.id)
        if (!updatedObject.id) {
            throw { status: 422, message: 'ID no encontrado' }
        }
        await this.knex.from(this.tableName).where('id', object.id).update(object)
        return object
    }
}

module.exports = sqlClient