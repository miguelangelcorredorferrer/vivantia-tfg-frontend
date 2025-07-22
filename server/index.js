import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { conectarDB } from './config/db.js'

//Variables de entorno
dotenv.config()

//configurar la app
const app = express()

//Leer datos via body
app.use(express.json())

// Conectar a BD
conectarDB()

//Configurar CORS
const whiteList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: (origin, callback) => {
        // Permitir peticiones sin origin (como Postman)
        if (!origin) return callback(null, true);
        
        if(whiteList.includes(origin)) {
            //Permite la conexión
            callback(null, true)
        } else {
            //No permite la conexión
            callback(new Error("Error de CORS"))
        }
    }
}

app.use(cors(corsOptions))

//Definir una ruta
app.get('/hola', (req, res) => {
    res.json({ msg: 'API funcionando correctamente' })
})

//Definir el puerto
const PORT = process.env.PORT || 3001

//Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue('El servidor está funcionando en el puerto:'), colors.blue.bold(PORT))
})

