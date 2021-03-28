import { Router } from "express";
import { getItemById, getItemsByQuery} from '../controllers/controler_Items';

const rutas = Router();

rutas.get('/sites/MLA/search', getItemsByQuery);
rutas.get('/items/:id', getItemById);

export default rutas;