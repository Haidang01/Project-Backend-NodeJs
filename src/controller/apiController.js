
import loginRegister from '../service/loginRegisterService'
import managerService from '../service/managerService'
const handleRegister = async (req, res) => {
    console.log('>>>..req', req.body);
    try {
        if (!req.body.email && !req.body.username && !res.body.password) {
            return res.status(200).json({
                EM: 'Error required',
                EC: 0,
                DT: []
            })
        }
        if (req.body.password.length < 3) {
            return res.status(200).json({
                EM: 'Your password must have more than 4 letters',
                EC: -1,
                DT: []
            })
        }
        let data = await loginRegister.registerNewUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (error) {
        console.log('>>>handleRegister ', error);
        return res.status(500).json({
            EM: 'ERROR from server',
            EC: -1,
            DT: []
        })
    }
}
const handleLogin = async (req, res) => {

    try {
        if (!req.body.email && !req.body.password) {
            return res.status(200).json({
                EM: 'Error data exist',
                EC: -1,
                DT: []
            })
        }
        let data = await loginRegister.LoginUser(req.body);

        //set cookie
        res.cookie('jwt', data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })

    } catch (error) {
        console.log('>>>>handleLogin', error);
        return res.status(500).json({
            EM: 'ERROR from server',
            EC: -1,
            DT: []
        })
    }
}
const fetchlistUser = async (req, res) => {

    try {
        if (req.query.role && req.query.page && req.query.limit) {
            let page = req.query.page;
            let role = req.query.role;
            let limit = req.query.limit;
            let data = await managerService.fetchDataUser(role, +page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } else {
            return res.status(200).json({
                EM: '',
                EC: -1,
                DT: []
            })
        }
        console.log(req.query);
    } catch (error) {
        console.log('>>>>fetchlistUser', error);
        return res.status(500).json({
            EM: 'ERROR from server',
            EC: -1,
            DT: []
        })
    }
}

const handleDeleteUser = async (req, res) => {
    try {
        console.log('ddddd', req.body);
        if (!req && !req.body.email && req.body.role) {
            return res.status(200).json({
                EM: 'Error data exist',
                EC: -1,
                DT: []
            })
        }
        let data = await managerService.deleteByEmail(req.body.role, req.body.email)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>fetchlistUser', error);
        return res.status(500).json({
            EM: 'ERROR from server',
            EC: -1,
            DT: []
        })
    }

}
const handleUpdateUser = async (req, res) => {
    try {

        if (!req && !req.body.email && req.body.role) {
            return res.status(200).json({
                EM: 'Error data exist',
                EC: -1,
                DT: []
            })
        }
        if (req.body.role === "Student") {
            let data = await managerService.updataStudent(req.body)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        if (req.body.role === "Teacher") {
            let data = await managerService.updataTeacher(req.body)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

    } catch (error) {
        console.log('>>>>fetchlistUser', error);
        return res.status(500).json({
            EM: 'ERROR from server',
            EC: -1,
            DT: []
        })
    }

}
const handleLogout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({
            EM: 'Logout success ',
            EC: 0,
            DT: []
        })
    } catch (error) {
        console.log('>>>>handleLogout', error);
        return res.status(500).json({
            EM: 'Logout fail...',
            EC: -1,
            DT: []
        })
    }
}
const handleChangePass = async (req, res) => {
    try {
        if (!req.body.password && !req.body.newPassword && !req.user) {
            return {
                EC: -1,
                DT: '',
                EM: 'Data not exists...'
            }
        }
        let data = await loginRegister.ChangePassword(req.body, req.user);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>handleChangePass', error);
        return res.status(500).json({
            EM: 'ChangePass faild...',
            EC: -1,
            DT: []
        })
    }
}
module.exports = {
    handleLogin,
    handleRegister,
    fetchlistUser,
    handleDeleteUser,
    handleUpdateUser,
    handleLogout,
    handleChangePass
}