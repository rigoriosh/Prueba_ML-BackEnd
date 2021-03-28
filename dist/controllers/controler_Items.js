"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemById = exports.getItemsByQuery = void 0;
var axios_1 = __importDefault(require("axios"));
var apiML = 'https://api.mercadolibre.com';
/* Autor */
var author = { name: 'Rigoberto', lastname: 'Rios Hueso' };
var getItemsByQuery = function (req, resp) {
    var query = req.query; /* Extrae la palabra que el ciente digitó */
    /* do query at API https://api.mercadolibre.com/sites/MLA/search?q=apple#options */
    var res = axios_1.default.get(apiML + "/sites/MLA/search?q=" + query.q).then(function (_a) {
        var data = _a.data;
        var category = data.available_filters[0].values; /* extrae las categorias */
        var result = data.results; /* extrae los items retornados desde la API */
        var dataEnd = fixDataItemsByQuery(category, result); /*  dunción que realiza adecuación de la información a ser retornada al front */
        resp.json(dataEnd); /*  envia la data */
    }).catch(function (e) { return console.log(e); }); /* captura cualquier erroe en la consulta hacie la API */
};
exports.getItemsByQuery = getItemsByQuery;
var getItemById = function (req, resp) {
    var id = req.query.q; /* extrae el id del producto que el cliente selecciono */
    axios_1.default.get(apiML + "/items/" + id) /* ejecuta la consulta a la API segun id de producto */
        .then(function (_a) {
        var data = _a.data;
        var dataEnd = fixDataItemById(data); /* extrae la información detalle del producto retornada de la API*/
        axios_1.default.get(apiML + "/items/" + id + "/description") /* ejecuta consulta para traer la descrición de un producto segunn ID */
            .then(function (_a) {
            var dataItem = _a.data;
            dataEnd.item.description = dataItem.plain_text; /* extrae el texto descrición del producto */
            axios_1.default.get(apiML + "/categories/" + data.category_id) /*  finalmente realiza la consulta de categorias a las que pertenece un producto segun id, para realizar el breadcrumb en el front */
                .then(function (_a) {
                var dataCategories = _a.data;
                var categories = []; /* para almacenar los strings de categorias y retornarlo al front como un areglo de strings */
                dataCategories.path_from_root.forEach(function (category) {
                    categories.push(category.name); /* construlle el arreglo de categorias */
                });
                dataEnd.categories = categories; /* agrega en la variable dataEnd las categorias */
                resp.json(dataEnd); /* envia la data ya ajusta al front */
            });
        });
    })
        .catch(function (e) { return console.log(e); }); /* captura cualquier error en la anterior lógica */
};
exports.getItemById = getItemById;
/* funcion para ajustar la información segun la consulta por palabra */
var fixDataItemsByQuery = function (category, result) {
    /* información Categorias */
    var categories = [];
    category.forEach(function (e) {
        categories.push(e.name);
    });
    /* información de los Items o productos traidos desde la API segun una palabra */
    var items = [];
    result.forEach(function (_a) {
        var id = _a.id, title = _a.title, seller_address = _a.seller_address, price = _a.price, thumbnail = _a.thumbnail, condition = _a.condition, shipping = _a.shipping;
        items.push({
            id: id,
            title: title,
            price: {
                currency: seller_address.state.name,
                amount: price,
                decimals: 0
            },
            picture: thumbnail,
            condition: condition,
            free_shipping: shipping.free_shipping
        });
    });
    items = items.splice(0, 4); /* desja solo los primeros 4 elemntos para retornar al fron, (segun requerimiento) */
    return { author: author, categories: categories, items: items }; /* retorna el objeto final con la info seteada segun requerimiento */
};
/* funcion para ajustar la información segun la consulta por id de un producto */
var fixDataItemById = function (data) {
    /* Item */
    var categories = []; /* Para almacenar array con strings de categorias */
    var item = {
        id: data.id,
        title: data.title,
        price: {
            currency: data.seller_address.state.name,
            amount: data.price,
            decimals: 0
        },
        picture: data.pictures[0].url,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        sold_quantity: data.sold_quantity,
        description: '' /* queda pendiente para la consulta a la API del texto descripcion del producto segun id */
    };
    return { author: author, item: item, categories: categories }; /* retorna el objeto final con la info seteada segun requerimiento */
};
//# sourceMappingURL=controler_Items.js.map