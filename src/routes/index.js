const { Router } = require('express');
const router = Router()
const { getProductos, postProductos, getProductoId, 
            putProduct,deleteProduct} = require('../../controllers/productsController')
const { postCarrito, deleteCarrito, verCarrito, 
    insertProductoByIdToCart, deleteProductoCarrito} = require('../../controllers/cartController')

//Rutas Productos
router.get('/productos', getProductos)
router.get('/productos/:id', getProductoId)
// router.get('/productos', mostrarForm)

//Rutas Carrito
router.post('/carrito', postCarrito) 
router.delete('/carrito/:id', deleteCarrito )
router.get('/carrito/:id/productos', verCarrito)
router.post('/carrito/:id/productos', insertProductoByIdToCart)
router.delete('/carrito/:id/productos/:id_prod', deleteProductoCarrito)

const auth = (req, res, next)=>{
    const admin = true
    if(admin) {return next()} 
    else {
        let mensajeError={
            error : "-1",
            descripcion: `ruta: ${req.url} método: ${req.method} no autorizado`
        }
        res.status(401).json( mensajeError)
    }
}
//Rutas Productos sólo ADMIN
router.post('/productos',auth, postProductos)
router.put('/productos/:id',auth, putProduct)
router.delete('/productos/:id',auth, deleteProduct )

module.exports = router