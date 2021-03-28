"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); /* imortaci[on del paquete de express */
var ruta_Items_1 = __importDefault(require("../rutas/ruta_Items")); /* llama al administrador de las rutas */
var cors_1 = __importDefault(require("cors")); /* para set las politicas de cors */
var Servidor = /** @class */ (function () {
    function Servidor() {
        this.apiPaths = {
            items: '/api.mercadolibre.com' /* path inicial por donde escuchara las peticiones */
        };
        this.app = express_1.default(); /* inatancia del servidor */
        this.port = process.env.PORT || '8000'; /* setea el puerto por donde correra el servidor */
        this.middlewars(); /* metodo por donde se manejaran los middlewars */
        this.routes(); /* metodo por donde ser configurará el manejo de las rutas */
    }
    Servidor.prototype.middlewars = function () {
        // CORS
        this.app.use(cors_1.default()); /* configura el manejo de cors */
        // LECTURA DEL BODY
        // this.app.use(express.json());
        // CARPETA PUBLICA
        this.app.use(express_1.default.static('public')); /* configuración de la pagina estatica a ser mostrada */
    };
    Servidor.prototype.routes = function () {
        this.app.use(this.apiPaths.items, ruta_Items_1.default); /* configura el manejo de rutas se gun el path inicial y el dicionario de rutas */
    };
    Servidor.prototype.listen = function () {
        var _this = this;
        /* Number(this.port => numero del puerto */
        this.app.listen(Number(this.port), function () {
            console.log('Servidor corriendo en puerto: ' + _this.port);
        });
    };
    return Servidor;
}());
exports.default = Servidor;
//# sourceMappingURL=server.js.map