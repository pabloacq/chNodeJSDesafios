const knex = require('knex')
const conf = require('./conf')

const sqlite = knex(conf.sqlite3)
const mariaDB = knex(conf.mariaDB)

createTables()
async function createTables(){
    await sqlite.schema.createTable('mensajes', table => {
        table.increments('id').primary();
        table.string('sender', 50);
        table.string('text', 100);
        table.string('timestamp', 50);
    })

    await mariaDB.schema.createTable('productos', table => {
        table.increments('id').primary();
        table.string('title', 50);
        table.string('thumbnail', 100);
        table.integer('price');
    })

}

console.log("Tablas creadas exitosamente...")
process.exit(0)