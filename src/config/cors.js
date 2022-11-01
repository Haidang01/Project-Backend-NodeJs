
require('dotenv').config();

const configCors = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,PATCH,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requesed-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    })
}
export default configCors;
