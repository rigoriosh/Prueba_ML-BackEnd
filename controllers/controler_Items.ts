import axios from "axios";
import { Request, Response } from "express";

const apiML = 'https://api.mercadolibre.com';
/* Autor */
const author = {name: 'Rigoberto', lastname: 'Rios Hueso'}


export const getItemsByQuery = (req: Request, resp: Response) => {
    const {query} = req; /* Extrae la palabra que el ciente digitó */
    /* do query at API https://api.mercadolibre.com/sites/MLA/search?q=apple#options */
    const res = axios.get(`${apiML}/sites/MLA/search?q=${query.q}`).then(({data}) => { /* realiza la consulta a la API de ML segun una palabra */
        const category = data.available_filters[0].values; /* extrae las categorias */
        const result = data.results; /* extrae los items retornados desde la API */
        const dataEnd = fixDataItemsByQuery(category, result); /*  dunción que realiza adecuación de la información a ser retornada al front */
        resp.json(dataEnd); /*  envia la data */
    }).catch(e => console.log(e))/* captura cualquier erroe en la consulta hacie la API */
}

export const getItemById = (req: Request, resp: Response) => {
    const id = req.query.q; /* extrae el id del producto que el cliente selecciono */

    axios.get(`${apiML}/items/${id}`)/* ejecuta la consulta a la API segun id de producto */
        .then(({data}) => {
            const dataEnd = fixDataItemById(data); /* extrae la información detalle del producto retornada de la API*/

            axios.get(`${apiML}/items/${id}/description`) /* ejecuta consulta para traer la descrición de un producto segunn ID */
                .then(({data: dataItem}) => {
                    dataEnd.item.description = dataItem.plain_text; /* extrae el texto descrición del producto */

                    axios.get(`${apiML}/categories/${data.category_id}`) /*  finalmente realiza la consulta de categorias a las que pertenece un producto segun id, para realizar el breadcrumb en el front */
                        .then(({data: dataCategories}) => {
                            const categories: string[] = []; /* para almacenar los strings de categorias y retornarlo al front como un areglo de strings */
                            dataCategories.path_from_root.forEach((category: { name: string; }) => {
                                categories.push(category.name); /* construlle el arreglo de categorias */
                            });
                            dataEnd.categories = categories; /* agrega en la variable dataEnd las categorias */
                            resp.json(dataEnd) /* envia la data ya ajusta al front */
                        })
                })
        })
        .catch(e => console.log(e)) /* captura cualquier error en la anterior lógica */
}

/* funcion para ajustar la información segun la consulta por palabra */
const fixDataItemsByQuery = (category: { name: string; }[], result: { id: any; title: any; seller_address: any; price: any; thumbnail: any; condition: any; shipping: { free_shipping: any; }; }[]) => {

    /* información Categorias */
    const categories: string[] = [];
    category.forEach((e: { name: string; }) => {
        categories.push(e.name);
    });
    /* información de los Items o productos traidos desde la API segun una palabra */
    let items: any[] = [];
    result.forEach(({id, title, seller_address, price, thumbnail, condition, shipping}) => { /* ajusta el objeto a retornar segun requerimiento */
        items.push(
            {
                id,
                title,
                price: {
                    currency: seller_address.state.name,
                    amount: price,
                    decimals: 0
                },
                picture: thumbnail,
                condition,
                free_shipping: shipping.free_shipping
            }
        );
    });
    items = items.splice(0,4); /* desja solo los primeros 4 elemntos para retornar al fron, (segun requerimiento) */

    return { author, categories, items}; /* retorna el objeto final con la info seteada segun requerimiento */
}

/* funcion para ajustar la información segun la consulta por id de un producto */
const fixDataItemById = (data: { id: any; title: any; seller_address: { state: { name: any; }; }; price: any; pictures: { url: any; }[]; condition: any; shipping: { free_shipping: any; }; sold_quantity: any; }) => {
    /* Item */
    const categories: string[] = []; /* Para almacenar array con strings de categorias */
    const item = { /* construcción de objeto con data segun requerimiento */
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
    }

    return {author, item, categories}; /* retorna el objeto final con la info seteada segun requerimiento */
}