class APIService {

    static _instance = null;

    static getInstance() {
        if (this._instance == null) {
            this._instance = new APIService();
        }
        return this._instance;
    }

    request(endpoint, method, body) {
        return new Promise((resolve, reject) => {

            //https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js
            let token = localStorage.token;
            if (!token)
                token = localStorage.token = Math.random().toString(36).substr(-8)

            fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': token
                },
                body: body ? JSON.stringify(body) : null,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    resolve(responseJson);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    fixResult(result) {
        let items = {};
        //fixing data structure according denormalized data
        Object.keys(result).forEach(key => {
            let item = result[key];

            items[item.id] = item;
            delete items[item.id].id;
        });

        return items;
    }
}
export default APIService;