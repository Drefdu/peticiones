const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath= '/api/usuarios'
        //conectar a la base de datos
        this.conectarBD()
        this.middlewares()
        this.routes()
        this.listen()
    }
    async conectarBD() {
        await dbConnection()
    }
    middlewares(){
        this.app.use(express.static('public'))
        this.app.use(express.json())
        this.app.use(cors())
    }
    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
        
    }
    listen(){
        this.app.listen(process.env.PORT, () => { // Corrección: usa this.app en lugar de app
            console.log('Servidor corriendo en puerto:', process.env.PORT)
        })
    }
}
module.exports = Server
