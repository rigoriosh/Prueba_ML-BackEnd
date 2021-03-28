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
    var query = req.query;
    /* do query at API https://api.mercadolibre.com/sites/MLA/search?q=apple#options */
    var res = axios_1.default.get(apiML + "/sites/MLA/search?q=" + query.q).then(function (_a) {
        var data = _a.data;
        var category = data.available_filters[0].values;
        var result = data.results;
        var dataEnd = fixDataItemsByQuery(category, result);
        resp.json(dataEnd);
    }).catch(function (e) { return console.log(e); });
};
exports.getItemsByQuery = getItemsByQuery;
var getItemById = function (req, resp) {
    var id = req.query.q;
    axios_1.default.get(apiML + "/items/" + id)
        .then(function (_a) {
        var data = _a.data;
        var dataEnd = fixDataItemById(data);
        axios_1.default.get(apiML + "/items/" + id + "/description")
            .then(function (_a) {
            var dataItem = _a.data;
            dataEnd.item.description = dataItem.plain_text;
            axios_1.default.get(apiML + "/categories/" + data.category_id)
                .then(function (_a) {
                var dataCategories = _a.data;
                var categories = [];
                dataCategories.path_from_root.forEach(function (category) {
                    categories.push(category.name);
                });
                dataEnd.categories = categories;
                resp.json(dataEnd);
            });
        });
    })
        .catch(function (e) { return console.log(e); });
};
exports.getItemById = getItemById;
var fixDataItemsByQuery = function (category, result) {
    /* Categorias */
    var categories = [];
    category.forEach(function (e) {
        categories.push(e.name);
    });
    /* Items */
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
    items = items.splice(0, 4);
    return { author: author, categories: categories, items: items };
};
var fixDataItemById = function (data) {
    /* Item */
    var categories = [];
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
        description: ''
    };
    return { author: author, item: item, categories: categories };
};
//# sourceMappingURL=controler_Items.js.map