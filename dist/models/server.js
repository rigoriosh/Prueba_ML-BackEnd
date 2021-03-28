"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ruta_Items_1 = __importDefault(require("../rutas/ruta_Items"));
var cors_1 = __importDefault(require("cors"));
var Servidor = /** @class */ (function () {
    function Servidor() {
        this.apiPaths = {
            items: '/api.mercadolibre.com'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        this.middlewars();
        this.routes();
    }
    Servidor.prototype.middlewars = function () {
        // CORS
        this.app.use(cors_1.default());
        // LECTURA DEL BODY
        // this.app.use(express.json());
        // CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    };
    Servidor.prototype.routes = function () {
        this.app.use(this.apiPaths.items, ruta_Items_1.default);
    };
    Servidor.prototype.listen = function () {
        var _this = this;
        this.app.listen(Number(this.port), function () {
            console.log('Servidor corriendo en puerto: ' + _this.port);
        });
    };
    return Servidor;
}());
exports.default = Servidor;
//# sourceMappingURL=server.js.map