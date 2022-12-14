const mariaDB = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password:'root',
        database: 'ecommerce'
    }
}

// const sqlite3 = {
//     client: 'sqlite3',
//     connection: {
//         filename: `${__dirname}/DB/mensajes.sqlite`
//     },
//     useNullAsDefault:true
// }

// const sqlite3 = {
//     client: 'sqlite3',
//     connection: `${__dirname}/DB/mensajes.sqlite`,
//     useNullAsDefault:true
// }

const sqlite3 = {
    client: 'sqlite3',
    connection: {
      dirname: `${__dirname}/DB`,
      filename: `${__dirname}/DB/mensajes.sqlite`,
    },
    useNullAsDefault: true
  };

module.exports = {mariaDB, sqlite3}