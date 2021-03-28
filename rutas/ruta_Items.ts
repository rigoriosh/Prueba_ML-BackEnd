import { Router } from "express";
import { getItemById, getItemsByQuery} from '../controllers/controler_Items'; /* importacion de metodo controladores */

const rutas = Router();

/* ejecuta el controlador corespondiente sgun url ingresada */
rutas.get('/sites/MLA/search', getItemsByQuery); /* ejecuta el controlador cuando el cliente digitó una palabra y ejecuto la consulta */
rutas.get('/items/:id', getItemById); /* ejecuta el controlador cuando el cliente solicita detalle de información de un producto */

export default rutas;