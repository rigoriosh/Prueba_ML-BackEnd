import express, { Application } from 'express';  /* imortaci[on del paquete de express */
import rutasItems from '../rutas/ruta_Items'; /* llama al administrador de las rutas */
import cors from "cors"; /* para set las politicas de cors */

class Servidor {

    private app: Application; /* Servidor */
    private port: string; /* puerto en donde va a correo el servidor */
    private apiPaths = {
        items: '/api.mercadolibre.com' /* path inicial por donde escuchara las peticiones */
    }

    constructor(){
        this.app = express(); /* inatancia del servidor */
        this.port = process.env.PORT || '8000'; /* setea el puerto por donde correra el servidor */
        this.middlewars(); /* metodo por donde se manejaran los middlewars */
        this.routes(); /* metodo por donde ser configurará el manejo de las rutas */
    }
    middlewars(){
        // CORS
        this.app.use(cors()); /* configura el manejo de cors */
        // LECTURA DEL BODY
        // this.app.use(express.json());

        // CARPETA PUBLICA
        this.app.use(express.static('public')); /* configuración de la pagina estatica a ser mostrada */
    }
    routes(){
        this.app.use(this.apiPaths.items, rutasItems); /* configura el manejo de rutas se gun el path inicial y el dicionario de rutas */
    }

    listen(){ /* metedo por donde se despliega el servidor */
        /* Number(this.port => numero del puerto */
        this.app.listen(Number(this.port), ()=>{
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }

}

export default Servidor;
