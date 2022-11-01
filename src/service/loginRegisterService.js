import db from "../models";
import { createJWT } from '../middleware/JWTAction'
import jwt from 'jsonwebtoken'
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config()
const hanshUserPassword = (password) => {
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
const checkHashPass = async (email, password) => {
    let hash1 = await db.Student.findOne({
        where: { email: email },
        raw: true,
        nest: true
    })

    if (hash1) {
        let role = hash1.role
        let user = hash1;
        let check = bcrypt.compareSync(password, hash1.password);
        return { role, check, user }
    }
    let hash2 = await db.Teacher.findOne({
        where: { email: email },
        raw: true,
        nest: true
    })

    if (hash2) {
        let role = hash2.role;
        let user = hash2;

        let check = bcrypt.compareSync(password, hash2.password);
        return { role, check, user }
    }
    let hash3 = await db.Admin.findOne({
        where: { email: email },
        raw: true,
        nest: true
    })

    if (hash3) {
        let role = hash3.role
        let user = hash3;

        let check = password === hash3.password;
        return { role, check, user }
        // return bcrypt.compareSync(password, hash3.password);
    }

    return false
}
const checkEmailExist = async (email, role) => {
    if (role === 'Student') {
        let user = await db.Student.findOne({
            where: { email: email }
        })
        if (user) {
            console.log('dsfsf', user);
            return true
        } else {
            return false
        }
    }
    if (role === "Teacher") {
        let user = await db.Teacher.findOne({
            where: { email: email }
        })
        if (user) {
            return true
        } else {
            return false
        }
    }

}
const registerNewUser = async (data) => {
    try {
        // check eamil/ password/username exist
        let checkExist = await checkEmailExist(data.email, data.role)
        console.log(checkExist);

        if (checkExist === true) {
            return {
                EM: 'Email already exists ',
                EC: 1,
                DT: []
            }
        }
        // hash pass
        let hashPassword = hanshUserPassword(data.password);
        console.log(hashPassword);
        // create account
        if (data.role === 'Student') {
            await db.Student.create({
                email: data.email,
                username: data.username,
                password: hashPassword,
                role: data.role
            })
        }
        if (data.role === 'Teacher') {
            await db.Teacher.create({
                email: data.email,
                username: data.username,
                password: hashPassword,
                role: data.role
            })
        }
        return {
            EM: 'Create user success!',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log('>>> registerNewUser', error);
        return {
            EM: 'Error server',
            EC: 1,
            DT: []
        }
    }
}
const LoginUser = async (dataLogin) => {
    try {
        let checkPass = await checkHashPass(dataLogin.email, dataLogin.password);
        let email = dataLogin.email;
        let role = checkPass.role;
        let user = checkPass.user;
        const { password, id, ...others } = user;
        let payload = {
            email,
            role,
            id,
            expiresIn: process.env.JWT_EXPIRESIN
        }
        //create token 
        if (checkPass.check === true) {

            let token = await createJWT(payload);

            return {
                EM: 'Logged in successfully',
                EC: 0,
                DT: {
                    access_token: token,
                    role,
                    others,
                }
            }
        } else {
            return {
                EM: 'Incorrect account or password',
                EC: 1,
                DT: []
            }
        }


    } catch (error) {
        console.log('>>>loginUser', error);
        return {
            EM: 'Error server...',
            EC: 1,
            DT: []
        }
    }
}


module.exports = {
    registerNewUser,
    LoginUser,


}