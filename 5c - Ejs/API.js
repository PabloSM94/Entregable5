// Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. En detalle, que incorpore las siguientes rutas:
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.

// Cada ítem almacenado dispondrá de un id numérico proporcionado por el backend, comenzando en 1, y que se irá incrementando a medida de que se incorporen productos. Ese id será utilizado para identificar un producto que va a ser listado en forma individual.
// Para el caso de que un producto no exista, se devolverá el objeto:
// { error : 'producto no encontrado' }
// Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
// Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
// Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
// El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
// Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.
//
const express = require('express')
const {router} = require('./router/routerProductos.js')

const app = express()


app.set("view engine", "ejs");

camposdeFormulario = () => [
    {nombreCampo: "Nombre Producto", type:"text", name:"title"},{nombreCampo: "Precio", type:"number", name:"price"},{nombreCampo: "URL Imagen", type:"text", name:"thumbnail"}
]
app.get("/", (req,res)=>{
   res.render("nuevoProducto.ejs", {productos: camposdeFormulario()})
})


const {isObjEmpty} = require("./router/routerProductos.js")
app.get("/productos", (req,res)=>{
    let {productosJSON} = require("./router/routerProductos.js")
    console.log(productosJSON)
    if(isObjEmpty(productosJSON)){
        res.render("visualizarProductos2")
    } else {
        res.render("visualizarProductos",{productos: productosJSON})
    }

})


//Extension para que Express reconozca los body
app.use(express.urlencoded({extended: true})) //Formularios
app.use(express.json()) //JSON

app.use('/api', router)
app.use(express.static('./'))

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))