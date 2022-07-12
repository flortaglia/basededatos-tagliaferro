const fs =require('fs')
const path = require('path')


const escribir= async (filename,item)=>{
    try{
        console.log('esto es lo que traigo en item:',item)
        await fs.promises.writeFile(path.join(__dirname,`/${filename}`), JSON.stringify(item,null,'\t'))
        console.log('guardado')
    }catch(err){
        console.log('no se pudo guardar el producto', err)
    }

}
const leer = async (filename)=>{
    try{
        const data= await fs.promises.readFile(path.join(__dirname,`/${filename}`), 'utf-8')
        console.log(data)
        const contenido= JSON.parse(data)
        console.log('contenido es ',typeof(contenido))
        return contenido
        
    }catch(err){
        console.log('no se pudo leer el producto', err)
        return contenido=[]
    }

}


module.exports = {escribir,leer}