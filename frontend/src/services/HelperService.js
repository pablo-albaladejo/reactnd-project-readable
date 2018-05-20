class HelperService {
    static _instance = null;

    static getInstance() {
        if (this._instance == null) {
            this._instance = new HelperService();
        }
        return this._instance;
    }

    removeByKey(myObj, deleteKey) {
        return Object.keys(myObj)
            .filter(key => key !== deleteKey)
            .reduce((result, current) => {
                result[current] = myObj[current];
                return result;
            }, {});
    }
}
export default HelperService;