import APIService from "./APIService";
import Endpoint from "../config/Endpoint";

class CategoryService {
    
    static _instance = null;

    static getInstance() {
        if (this._instance == null) {
            this._instance = new CategoryService();
        }
        return this._instance;
    }

    getAllCategories() {
        return new Promise((resolve, reject) => {
            APIService.getInstance().request(Endpoint.BASE_URL + Endpoint.CATEGORIES_URL, Endpoint.GET_METHOD, null)
                .then(result => {
                    resolve(result.categories);
                }).catch(err => {
                    console.warn(err);
                    reject(err);
                });
        });
    }
}
export default CategoryService;