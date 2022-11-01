import express from 'express'
import initWebRouter from './routes/web'
import conficViewEngine from './config/viewEngine';
import bodyParser from 'body-parser';
require("dotenv").config();
import connection from './config/connectDB';
import initApiRouter from './routes/api';
// import configCors from './config/cors';
var cookieParser = require('cookie-parser')
// import cors from 'cors';
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cookieParser())

//confic cookieparse
// config view engine
conficViewEngine(app);

// config body-parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// configCors(app)

// test connection db
connection();



// config routes
initApiRouter(app)
initWebRouter(app);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
