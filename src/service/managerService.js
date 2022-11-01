const db = require("../models");


const fetchDataUser = async (role, page, limit) => {
    try {
        let offset = (page - 1) * limit;
        if (role === 'Student') {
            const { count, rows } = await db.Student.findAndCountAll({
                order: [
                    ['id', 'DESC']
                ],
                offset: offset,
                limit: limit,
                raw: true
            })
            let totalPage = Math.ceil(count / limit)
            let data = {
                totalRows: count,
                totalPage: totalPage,
                users: rows
            };
            return {
                EM: '',
                EC: 0,
                DT: data
            }
        }
        if (role === 'Teacher') {
            const { count, rows } = await db.Teacher.findAndCountAll({
                order: [
                    ['id', 'DESC']
                ],
                offset: offset,
                limit: limit,
            })
            let totalPage = Math.ceil(count / limit)
            let data = {
                totalRows: count,
                totalPage: totalPage,
                users: rows
            };
            return {
                EM: '',
                EC: 0,
                DT: data
            }
        }
        if (role === 'Admin') {
            const { count, rows } = await db.Account.findAndCountAll({
                offset: offset,
                limit: limit,
            })
            let totalPage = Math.ceil(count / limit)
            let data = {
                totalRows: count,
                totalPage: totalPage,
                users: rows
            };
            return {
                EM: '',
                EC: 0,
                DT: data
            }
        }



    } catch (error) {
        console.log('>>>fetchDataUser', error);
        return {
            EM: 'Error server',
            EC: 1,
            DT: []
        }
    }
}
const deleteByEmail = async (role, email) => {
    try {
        if (role === "Student") {
            let user = await db.Student.findOne({
                where: { email: email }
            })
            if (user) {
                await user.destroy();
                return {
                    EM: 'Delete user Success!',
                    EC: 0,
                    DT: []
                }
            } else {
                return {
                    EM: "User don't exist!",
                    EC: 1,
                    DT: []
                }
            }
        }
        if (role === "Teacher") {
            let user = await db.Teacher.findOne({
                where: { email: email }
            })
            if (user) {
                await user.destroy();
                return {
                    EM: 'Delete user Success!',
                    EC: 0,
                    DT: []
                }
            } else {
                return {
                    EM: "User don't exist!",
                    EC: 1,
                    DT: []
                }
            }
        }
        console.log('hichichic');
    } catch (error) {
        console.log('>>>deleteByEmail', error);
        return {
            EM: 'Error server',
            EC: 1,
            DT: []
        }
    }
}
const updataStudent = async (data) => {
    try {
        let user = await db.Student.findOne({
            where: { email: data.email }
        })
        if (user) {
            user.update({
                username: data.username,
                phone: data.phone,
                address: data.address,
                sex: data.sex
            })
            return {
                EM: 'Successfully updated',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "User don't exist!",
                EC: 1,
                DT: []
            }
        }

    } catch (error) {
        console.log('>>>updataStudent', error);
        return {
            EM: 'Error server',
            EC: 1,
            DT: []
        }
    }
}
const updataTeacher = async (data) => {
    try {
        let user = await db.Teacher.findOne({
            where: { email: data.email }
        })
        if (user) {
            user.update({
                username: data.username,
                phone: data.phone,
                address: data.address,
                sex: data.sex
            })
            return {
                EM: 'Successfully updated',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "User don't exist!",
                EC: 1,
                DT: []
            }
        }


    } catch (error) {
        console.log('>>>updataStudent', error);
        return {
            EM: 'Error server',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    fetchDataUser,
    deleteByEmail,
    updataTeacher,
    updataStudent,
}