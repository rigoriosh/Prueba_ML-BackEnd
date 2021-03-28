import axios from "axios";
import { Request, Response } from "express";

const apiML = 'https://api.mercadolibre.com';
/* Autor */
const author = {name: 'Rigoberto', lastname: 'Rios Hueso'}


export const getItemsByQuery = (req: Request, resp: Response) => {
    const {query} = req;
    /* do query at API https://api.mercadolibre.com/sites/MLA/search?q=apple#options */
    const res = axios.get(`${apiML}/sites/MLA/search?q=${query.q}`).then(({data}) => {
        const category = data.available_filters[0].values;
        const result = data.results;
        const dataEnd = fixDataItemsByQuery(category, result);
        resp.json(dataEnd);
    }).catch(e => console.log(e))
}

export const getItemById = (req: Request, resp: Response) => {
    const id = req.query.q;

    axios.get(`${apiML}/items/${id}`)
        .then(({data}) => {
            const dataEnd = fixDataItemById(data);

            axios.get(`${apiML}/items/${id}/description`)
                .then(({data: dataItem}) => {
                    dataEnd.item.description = dataItem.plain_text;

                    axios.get(`${apiML}/categories/${data.category_id}`)
                        .then(({data: dataCategories}) => {
                            const categories: string[] = [];
                            dataCategories.path_from_root.forEach((category: { name: string; }) => {
                                categories.push(category.name);
                            });
                            dataEnd.categories = categories;
                            resp.json(dataEnd)
                        })
                })
        })
        .catch(e => console.log(e))
}


const fixDataItemsByQuery = (category: { name: string; }[], result: { id: any; title: any; seller_address: any; price: any; thumbnail: any; condition: any; shipping: { free_shipping: any; }; }[]) => {

    /* Categorias */
    const categories: string[] = [];
    category.forEach((e: { name: string; }) => {
        categories.push(e.name);
    });
    /* Items */
    let items: any[] = [];
    result.forEach(({id, title, seller_address, price, thumbnail, condition, shipping}) => {
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
    items = items.splice(0,4);

    return { author, categories, items};
}

const fixDataItemById = (data: { id: any; title: any; seller_address: { state: { name: any; }; }; price: any; pictures: { url: any; }[]; condition: any; shipping: { free_shipping: any; }; sold_quantity: any; }) => {
    /* Item */
    const categories: string[] = [];
    const item = {
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
    }

    return {author, item, categories};
}