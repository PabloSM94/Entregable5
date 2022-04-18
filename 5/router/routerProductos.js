const express = require('express')
const { Router } = express

const app = express()
const router = Router()
//const productos = '[{"title":"Sensor","price":3000,"thumbnail":"https://cdn2.iconfinder.com/data/icons/electronic-and-electric/47/Asset_30-512.png","id":1},{"title":"Transmisor","price":1500,"thumbnail":"https://cdn2.iconfinder.com/data/icons/electronic-and-electric/42/Asset_50-256.png","id":2},{"title":"Controlador","price":5000,"thumbnail":"https://cdn2.iconfinder.com/data/icons/electronic-and-electric/50/TV-256.png","id":4}]'
let productosJSON = []//[{title:"Sensor",price:3000,thumbnail:"https://cdn2.iconfinder.com/data/icons/electronic-and-electric/47/Asset_30-512.png",id:1},{title: "Transmisor",price:1500,thumbnail:"https://cdn2.iconfinder.com/data/icons/electronic-and-electric/42/Asset_50-256.png",id:2},{title:"Controlador",price:5000,thumbnail:"https://cdn2.iconfinder.com/data/icons/electronic-and-electric/50/TV-256.png",id:4}]// JSON.parse(productos)
const {cObjeto} = require('../manejoDeInformacion/manejodearchivos.js')

// GET '/api/productos' -> devuelve todos los productos.
router.get('/productos', (req, res) => {
    productosJSONOrdenados = productosJSON.sort(function(a, b) {return a.id - b.id})
    res.json(JSON.stringify(productosJSON))
    module.exports = {productosJSON}
 })

 // GET '/api/productos/:id' -> devuelve un producto según su id.
 router.get('/productos/:id', (req, res) => {
    const {params} = req
    let productoBuscado;
    let flag = 0;
    for (producto of productosJSON){
        if (producto.id == parseInt(params.id)){
            productoBuscado = JSON.stringify(producto)
            flag = 1            
        }          
    }
    if (flag == 1){
        res.json(productoBuscado)
    }
    else{
        res.send(`Error! el id: ${params.id} no se encuentra en la base de datos`) 
    }
    module.exports = {productosJSON}
 })
 // POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
 router.post('/productos', (req, res) => {
    const {body} = req
    //Recorrer objeto con el fin de encontrar id faltante
    let ids = [];
    for (elements of productosJSON){
        ids.push(elements.id)
    }
    let idsOrdenados = ids.sort(function(a, b) {return a - b})
    console.log(idsOrdenados)
    //Asignar id en funcion de la memoria
    let identificador = 1;
    while (identificador == idsOrdenados[identificador-1]){
        identificador++
    } 
    //Crear objeto con id
    const nuevoObjeto = new cObjeto(body.title,body.price,body.thumbnail, identificador)
    console.log("El id asignado es: "+identificador)

    //agregar al array de objetos
    productosJSON.push(nuevoObjeto)
    const productosN = JSON.stringify(productosJSON)
    //res.json(productosN)
    res.redirect('../')
    module.exports = {productosJSON}
    return productosJSON
 })

//Comprobacion de conjuntos vacios
function isObjEmpty(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
  
    return true;
  }

 // PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
 router.put('/productos/:id', (req, res) => {
    const {params} = req
    const {body} = req
    let productoModificado;
    let flag = 0;
    for (producto of productosJSON){
        if (producto.id == parseInt(params.id)){
            //Ejecutar modificaciones
            console.log(body.price)
            if (isObjEmpty(body.title)){
            } else {producto.title = body.title
            console.log("Se cambio producto, se debe cambiar imagen si no lo hizo")}
            if (isObjEmpty(body.price)){
            } else {producto.price = body.price}
            if (isObjEmpty(body.thumbnail)){
            } else {producto.thumbnail = body.thumbnail}
            console.log(body.price ==! "0")
            productoModificado = JSON.stringify(producto)
            flag = 1            
        }          
    }

    if (flag == 1){
        res.json(productoModificado)
    }
    else{
        res.send(`Error! el id: ${params.id} no se encuentra en la base de datos`) 
    }
    module.exports = {productosJSON}
    console.log(productosJSON)
    return(productosJSON)
 })
 // DELETE '/api/productos/:id' -> elimina un producto según su id.
 router.delete('/productos/:id', (req, res) => {
    const {params} = req
    let flag = 0;
    console.log(productosJSON)
//Comprobacion de que exista elemento
    for (producto of productosJSON){
        if (producto.id == parseInt(params.id)){
        flag = 1         
        }          
    }

    if (flag == 1){
        let nuevoArraydeProductos = productosJSON.filter((item) => item.id !== parseInt(params.id))
        const nuevoArrayJSON = JSON.stringify(nuevoArraydeProductos)
        res.json(nuevoArrayJSON)
        productosJSON = nuevoArraydeProductos
    }
    else {
        res.send(`Error! el id: ${params.id} no se encuentra en la base de datos`) 
    }
    module.exports = {productosJSON}
    return productosJSON
 })
 
 
 
 
 module.exports = {router,isObjEmpty,productosJSON}
 
 