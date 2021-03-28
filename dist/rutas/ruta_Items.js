"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controler_Items_1 = require("../controllers/controler_Items"); /* importacion de metodo controladores */
var rutas = express_1.Router();
/* ejecuta el controlador corespondiente sgun url ingresada */
rutas.get('/sites/MLA/search', controler_Items_1.getItemsByQuery); /* ejecuta el controlador cuando el cliente digitó una palabra y ejecuto la consulta */
rutas.get('/items/:id', controler_Items_1.getItemById); /* ejecuta el controlador cuando el cliente solicita detalle de información de un producto */
exports.default = rutas;
//# sourceMappingURL=ruta_Items.js.map