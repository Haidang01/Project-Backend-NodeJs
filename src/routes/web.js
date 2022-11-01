
import express from 'express';
import homeController from '../controller/homeController';

const router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.handleHelloWord);
    router.get('/user', homeController.handleUserPage);

    router.post('/user/create-user', homeController.handleCreateUser)
    return app.use('/', router);
}
export default initWebRouter;

