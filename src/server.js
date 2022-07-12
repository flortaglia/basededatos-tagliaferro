
const express = require('express')
const app = express()
const rutas = require('./routes/index')
const puerto =process.env.PORT||8080     
const path = require('path')
// const database = (path.join(__dirname,'./db_config_sqlite'))
// console.log(database)
const database=require('./db_config_sqlite')
const { Server: IOServer } = require('socket.io')
const {engine}= require("express-handlebars")
const expressServer= app.listen(puerto, (err) => {
    if(err) {
        console.log(`Se produjo un error al iniciar el servidor: ${err}`)
    } else {
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})

const io = new IOServer(expressServer)

const messages= []
const productos= []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'/public')))
// app.engine(
//     "hbs",
//     engine({
//         extname:".hbs",
//         defaultLayout:'index.hbs',
//         layoutsDir:__dirname + "/views/layouts",
//         partialsDir:__dirname + '/views/partials/'

//     })
// );
// app.set('views', path.join(__dirname, './views'))
// app.set('view engine', 'hbs')

app.use('/api', rutas)

const error404= (req, res,next)=>{
    let mensajeError={
        error : "-2",
        descripcion: `ruta: ${req.url} método: ${req.method} no implementado`
    }
    res.status(404).json( mensajeError)
    next()
} 
//Ruta NO encontrada
app.use(error404)

async function escribir(){

    try{
        await database.schema.dropTableIfExists('mensaje');
        console.log('drop')
        await database.schema.createTable('mensaje', table=>{
            table.increments('id').primary()
            table.string('mail',50)
            table.string('tiempochat')
            table.string('message')
        });
        console.log('se creo la tabla mensaje')
        console.log(messages)
        await database.from('mensaje').insert(messages);
        console.log('inserto mensajes tabla')
        let rows= await database.from('mensaje').select("*");
        rows.forEach((article)=>{ console.log(`${article['id']} ${article['mail']} ${article['tiempochat']}: ${article['message']}`) });
        
        
    }catch(err){
        console.log('no se pudo guardar el chat', err)
        
    }

}
// LADO SERVIDOR
io.on('connection', async socket=>{
    console.log('se conecto un usuario')

    io.emit('serverSend:Products', productos) //envio todos los productos

    socket.on('client:enterProduct', productInfo=>{
        productos.push(productInfo) //recibo productos
        io.emit('serverSend:Products', productos)//emito productos recibidos a los usuarios
    })
    // PARTE CHAT _ LADO SERVIDOR
    io.emit('serverSend:message',messages) //envio CHATS a todos los usuarios

    socket.on('client:message', messageInfo=>{
        messages.push(messageInfo) //RECIBO mensaje y lo anido
        escribir()
        io.emit('serverSend:message', messages)//EMITO CHATS
    })
})



