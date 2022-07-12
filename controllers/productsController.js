const dbMariadb = require ("../src/db_config_mariadb");
const Contenedor = require('./Contenedor')
const isNumber = require('is-number');
const productosContenedor = new Contenedor(dbMariadb, "producto")


const getProductos = async (req, res) => {
    const verProductos= await productosContenedor.getAll()
    res.json(verProductos)
    // res.render('productos.hbs',{verProductos})
}

 const postProductos = async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body 
    const elemento = await productosContenedor.newProduct(title, description, code, price, thumbnail, stock)
    res.json(elemento)
    // res.redirect('/api/productos')
    // res.statusCode=201
}
const getProductoId = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = await productosContenedor.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    res.json(elemento)
}
const putProduct = async (req, res) => {
    const {title, description, code, price, thumbnail, stock} = req.body
    const id = Number(req.params.id)
    if(!isNumber(id)){return res.json({ error: "El parámetro no es un número" })}
    const elemento = await productosContenedor.getById(id)
    if(!elemento.length){return res.status(404).json({error: "Producto no encontrado"})}
    const elementChanged = await productosContenedor.update(id,title, description, code, price, thumbnail, stock)
    res.json(elementChanged)
    
}
const deleteProduct = async (req, res) => {
    const id = Number(req.params.id)
    if(!isNumber(id)|| !id){return res.json({ error: "El parámetro no es un número o el id no existe" })}
    await productosContenedor.deleteById(id)
    res.json(await productosContenedor.getAll())
}
// const mostrarForm =(req,res)=>{
//     res.render('form.hbs')
// }

module.exports = {
    getProductos,
    postProductos,
    getProductoId,
    putProduct,
    deleteProduct,
    productosContenedor
}
