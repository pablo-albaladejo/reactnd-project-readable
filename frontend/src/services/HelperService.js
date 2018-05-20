class HelperService {
    static _instance = null;

    static getInstance() {
        if (this._instance == null) {
            this._instance = new HelperService();
        }
        return this._instance;
    }

    removeByKey(myObj, deleteKey) {
        //https://github.com/erikras/react-redux-universal-hot-example/issues/962#issuecomment-219354496
        return Object.keys(myObj)
            .filter(key => key !== deleteKey)
            .reduce((result, current) => {
                result[current] = myObj[current];
                return result;
            }, {});
    }

    isDevEnv() {
        //https://stackoverflow.com/a/35470995/3395884
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    }
}
export default HelperService;