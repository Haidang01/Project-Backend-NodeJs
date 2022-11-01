import express from "express";
import apiController from '../controller/apiController';
import classController from '../controller/classController';
import { checkLoginJWT, checkRoleUser, } from '../middleware/JWTAction'
const router = express.Router();

const initApiRouter = (app) => {
    router.all('*', checkLoginJWT, checkRoleUser)
    router.post('/register', apiController.handleRegister);
    router.post('/login', apiController.handleLogin);
    router.post('/logout', apiController.handleLogout);

    //chung
    router.put('/admin/update-user', apiController.handleUpdateUser)
    router.post('/user/create-class', classController.handleCreateClass);
    router.post('/user/join-class', classController.handleJoinClass);
    router.get('/listClass', classController.handleListClass)
    router.get('/listCurrentUser', classController.handleListCurrentUser)
    router.delete('/teacher/delete-student', classController.handleDeleteStudent)
    //admin
    router.delete('/admin/delete-user', apiController.handleDeleteUser)
    router.get('/admin/read', apiController.fetchlistUser)
    router.get('/admin/class', classController.handleListClassAdmin)
    //teacher

    return app.use('/api/v1/', router);
}
export default initApiRouter;