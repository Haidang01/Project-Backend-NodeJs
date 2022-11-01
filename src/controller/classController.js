import classService from '../service/classService'
const handleCreateClass = async (req, res) => {
    try {
        if (!req.body.className && !req.body.password && !req.body.user) {
            return {
                EM: ' Data not exists ',
                EC: -1,
                DT: []
            }
        }
        let data = await classService.CreateClass(req.body, req.user)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>handleCreateClass', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}
const handleListClass = async (req, res) => {
    try {
        let teacherId = req.user.id;
        let data = await classService.fetchListClass(teacherId, req.user.role)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>handleListClass', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}
const handleJoinClass = async (req, res) => {
    console.log('USER ', req.user, 'body', req.body);
    try {
        if (!req.body.className && !req.body.password && !req.user) {
            return {
                EM: ' Data not exists ',
                EC: -1,
                DT: []
            }
        }
        let data = await classService.JoinClass(req.body, req.user)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>handleJoinClass', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}
const handleListClassAdmin = async (req, res) => {
    console.log('USER ', req.user, 'body', req.body);
    try {
        if (!req.body.className && !req.body.password && !req.user) {
            return {
                EM: ' Data not exists ',
                EC: -1,
                DT: []
            }
        }
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let role = req.user.role;
            let limit = req.query.limit;
            let data = await classService.getClassAllAdmin(role, + page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (error) {
        console.log('>>>>handleListClassAdmin', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}

const handleListCurrentUser = async (req, res) => {
    try {
        const classId = req.query.classId;
        if (!classId) {
            return {
                EM: 'Data not exists...',
                EC: -1,
                DT: []
            }
        }
        console.log('classId', classId);
        let data = await classService.getDataUserCurrent(classId);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>handleListCurrentUser', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }

}
const handleDeleteStudent = async (req, res) => {
    try {
        console.log('chekc');
        if (!req.body.studentId && !req.body.classId) {
            return {
                EM: 'Data not exists...',
                EC: -1,
                DT: []
            }
        }
        let data = await classService.deleteStudent(req.body.studentId, req.body.classId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log('>>>>handleDeleteStudent', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}
module.exports = {
    handleCreateClass,
    handleListClass,
    handleJoinClass,
    handleListClassAdmin,
    handleListCurrentUser,
    handleDeleteStudent
}