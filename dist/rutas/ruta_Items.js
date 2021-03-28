"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controler_Items_1 = require("../controllers/controler_Items");
var rutas = express_1.Router();
rutas.get('/sites/MLA/search', controler_Items_1.getItemsByQuery);
rutas.get('/items/:id', controler_Items_1.getItemById);
exports.default = rutas;
//# sourceMappingURL=ruta_Items.js.map