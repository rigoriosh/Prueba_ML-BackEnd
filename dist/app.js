"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv")); /* Para administrar las variables de entorno */
var server_1 = __importDefault(require("./models/server")); /* importa la lógica del servidor */
dotenv_1.default.config(); /* ser la configuracion del dotenv */
var servidor = new server_1.default(); /* instancia del Servidor */
servidor.listen(); /*  llama al metodo listen del servidor */
//# sourceMappingURL=app.js.map