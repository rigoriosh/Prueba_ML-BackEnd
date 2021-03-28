import express, { Application } from 'express';
import rutasItems from '../rutas/ruta_Items';
import cors from "cors";

class Servidor {

    private app: Application;
    private port: string;
    private apiPaths = {
        items: '/api.mercadolibre.com'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.middlewars();
        this.routes();
    }
    middlewars(){
        // CORS
        this.app.use(cors());
        // LECTURA DEL BODY
        // this.app.use(express.json());

        // CARPETA PUBLICA
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.apiPaths.items, rutasItems);
    }

    listen(){
        this.app.listen(Number(this.port), ()=>{
            console.log('Servidor corriendo en puerto: ' + this.port);
        });
    }

}

export default Servidor;
