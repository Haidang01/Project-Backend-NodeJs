import jwt from 'jsonwebtoken';
require('dotenv').config();
const nonSecurePath = ['/', '/login', '/register', '/logout', '/admin/update-user',];
const ADMIN = ['/admin/delete-user', '/admin/read', '/admin/delete-user', '/admin/class',];
const USER = ['/teacher/delete-student', '/listClass', '/user/create-class', '/user/join-class', '/listCurrentUser',];

const createJWT = (data) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(data, key);
        return token;

    } catch (error) {
        console.log('>>>createJWT', error);
    }
    return token;

}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        let decoded = jwt.verify(token, key);
        return decoded

    } catch (error) {
        console.log('>>>', error);
    }
    return decoded
}

const checkLoginJWT = (req, res, next) => {

    if (nonSecurePath.includes(req.path)) return next();
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        console.log('qua 1');

        let token = cookies.jwt
        let decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded;
            console.log('req.user', req.user);
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: 'Not authenticated the user.',
                DT: ''
            })
        }
    }

    else {
        return res.status(401).json({
            EC: -1,
            DT: [],
            EM: 'Not authenticatched the user'
        })
    }


}
const checkRoleUser = (req, res, next) => {
    console.log('qua 2', req.user);
    if (nonSecurePath.includes(req.path)) return next();
    console.log('qua 3', req.user);

    if (ADMIN.includes(req.path)) {
        console.log('qua admin');
        if (req.user) {
            let role = req.user.role;
            if (role === 'Admin') {
                return next()
            } else {
                res.status(401).json({
                    EC: -1,
                    EM: 'Not authenticated the user..',
                    DT: ''
                })
            }
        }

    }
    console.log('req.path', req.path);
    if (USER.includes(req.path)) {
        console.log('qua 4', req.user);


        if (req.user) {
            console.log('qua 5', req.user);

            let role = req.user.role;
            console.log('qua 6');
            if (role === 'Student' || role === 'Teacher') {
                console.log('qua 7');

                return next()
            } else {
                res.status(401).json({
                    EC: -1,
                    EM: 'Not authenticated the user...',
                    DT: ''
                })
            }
        }

    }

}

module.exports = {
    createJWT,
    verifyToken,
    checkLoginJWT,
    checkRoleUser,
}
