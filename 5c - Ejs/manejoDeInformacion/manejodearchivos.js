// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.

// [{"title":"Sensor","price":3000,"thumbnail": "","id":1},{"title":"Transmisor","price":1500,"thumbnail": "","id":2},{"title":"Controlador","price":5000,"thumbnail": "","id":3}]

const fs = require('fs');

let cObjeto = class {
    constructor (title, price, thumbnail,id){
        this.title = title
        this.price = price
        this.thumbnail = thumbnail
        this.id = id
    }
}

function getById(n){
    fs.promises.readFile("./datosGuardados/productos.txt", "utf-8")
        .then (contenido => {
            let flag = 0;
            const objetoBD = JSON.parse(contenido)
            for (let i=0;i<objetoBD.length;i++) {
                if (objetoBD[i].id === n) {console.log(objetoBD[i])
                flag = 1}
            }
            if (flag ==! 1){
                console.log ("no existe ID registrado")
            }
        }   
        )
        .catch (err => {console.log("Error de lectura, ",err)})
}

function deleteAll(){
    fs.promises.writeFile("./datosGuardados/productos.txt","[]", "utf-8")
        .then (console.log("Datos borrados"))
        .catch (err => {console.log("Error de borrado, ",err)})
}

function getAll(){
    fs.promises.readFile("./datosGuardados/productos.txt", "utf-8")
    .then (contenido => {
        const objetoBD = JSON.parse(contenido)
        console.log(objetoBD)
    }
        )
}

function deleteById(n){
    fs.promises.readFile("./datosGuardados/productos.txt", "utf-8")
    .then (contenido => {
        const objetoBD = JSON.parse(contenido)
        const objetoBDnuevo = objetoBD.filter((item)=> item.id !== n)
        console.log(objetoBDnuevo)
    }   
    )
    .catch (err => {console.log("Error de ejecución, ",err)})
}

function save(objeto){
    //Leer datos guardados
    fs.promises.readFile("./datosGuardados/productos.txt", "utf-8")
        .then (contenido => {
            const objetoBD = JSON.parse(contenido)
    //Recorrer objeto con el fin de encontrar id faltante
            let ids = [];
            for (elements of objetoBD){
                ids.push(elements.id)
            }
           // console.log(ids)
    //Asignar id en funcion de la memoria
            let identificador = 1;
            while (identificador == ids[identificador-1]){
                identificador++
            } 
    //Crear objeto con id
            const nuevoObjeto = new cObjeto(objeto[0],objeto[1],identificador)
            console.log("El id asignado es: "+identificador)
            //console.log(nuevoObjeto)
    //agregar al array de objetos
            objetoBD.push(nuevoObjeto)
    //guardar archivo
            nuevoBD = JSON.stringify(objetoBD)
            return nuevoBD
        })
        .then ( resultado => {
            fs.promises.writeFile("./datosGuardados/productos.txt",resultado, "utf-8")
            console.log()
        })
        
    .catch (err => {console.log("No se pudo guardar, ",err)})
}

module.exports = {getAll,getById,deleteAll,save,deleteById,cObjeto}

//const {getAll,getById,deleteAll,save,deleteById} = require('../manejoDeInformacion/manejodearchivos.js')