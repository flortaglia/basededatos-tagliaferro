

class CarritoContainer{
    constructor(dbMariadb, tableName){
        try{
            this.dbMariadb=dbMariadb
            this.tableName=tableName
           dbMariadb.schema.hasTable(tableName).then(function(exists) {
            if (!exists) {
              return dbMariadb.schema.createTable(tableName, table=>{
                table.increments('id').primary()
                table.string('timestamp')
                table.jsonb('products')
              });
            }})  
            console.log('tabla creada carritos')
        }catch(err){
            console.log('error constructor',err)
        }
    }
   
    async getCartById(id){
        const carrito = await this.dbMariadb.from(this.tableName).where('id','=',id)
        console.log(carrito)
        return carrito    
    }
    async getAllCarts(){
        let rowsCart= await this.dbMariadb.from(this.tableName).select("*")
        rowsCart.forEach((article)=>{ console.log(`${article['id']}`) })
        return rowsCart
    }
        
    async deleteCartById(id){
        await this.dbMariadb.from(this.tableName).select("*").where('id' ,'=',id).del() 
    }
    // Falta para pensar un pocquitio más
    async deleteProductofCartById(id,id_prod){
        await this.dbMariadb.from(this.tableName).where('id' ,'=',id)
        const index=this.carts.findIndex(element=>element.id==id)
        const finalCart= this.carts[index].products.filter(item=>item.id!=id_prod)
        console.log(finalCart)
        this.carts[index].products=finalCart
        
    }
    async insertProductById(id,productInsert){
        
        const index=this.carts.findIndex(element=>element.id==id)
        this.carts[index].products.push(productInsert)
        
    }

    async newCart(){
       
        if(this.carts.length==0){
            const elemento = {
                timestamp:Date.now(), 
                id:1,
                products:[]
            }
            this.carts.push(elemento)
            
            return elemento
        }else{
           const lastIndex = this.carts[this.carts.length-1].id
           const Index= lastIndex + 1
           const elemento = {
            timestamp:Date.now(),
            id:Index,
            products:[]
            }
            this.carts.push(elemento)
            
            return elemento
        }
    }

}

module.exports= CarritoContainer