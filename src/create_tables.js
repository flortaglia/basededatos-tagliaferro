const dbMariadb = require ("../src/db_config_mariadb");
const createTable = async ()=>{
    await dbMariadb.schema.createTable('producto', table=>{
        table.increments('id').primary()
        table.string('title',50)
        table.float('price')
        table.string('thumbnail')
        table.string('description')
        table.integer('code')
        table.integer('stock')
        table.string('timestamp')
        });
}
createTable()