const knex = require('knex')
const path = require('path')


const configSQLite3 = {
    client: 'sqlite3',
    connection: {
      filename: (path.join(__dirname,'../db/mydb.sqlite'))
    },
    useNullAsDefault: true
}
console.log(configSQLite3 )
const database = knex(configSQLite3)

module.exports = database