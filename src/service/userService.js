import bcrypt from 'bcryptjs';
const mysql = require('mysql2');
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'project'
});

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}


const createNewUser = async (email, password, username) => {
    let lop = await db.Teacher.findAll({
        where: { id: 1 },
        include: { model: db.ClassRoom, attributes: ['id'], },

        raw: true,
        nest: true
    });
    console.log('>>>lop', lop[0].ClassRooms.id);
}

module.exports = {
    createNewUser,
}