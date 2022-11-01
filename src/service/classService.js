import db from "../models"


const fucClassAll = async (userId, role) => {
    if (role === 'Teacher') {

        let classAll = await db.ClassRoom.findAll({
            attributes: ['className', 'id', 'teacherName'],
            order: [
                ['id', 'DESC']
            ],
            include: { model: db.Teacher, where: { id: userId }, attributes: ['email', 'username'], },
            raw: true,
            nest: true,
        })

        return classAll.map(item => {
            return {
                className: item.className,
                id: item.id,
                teacherName: item.teacherName
            }
        })
    }
    if (role === 'Student') {
        let classAll = await db.ClassRoom.findAll({
            attributes: ['className', 'id', 'teacherName'],
            order: [
                ['id', 'DESC']
            ],
            include: { model: db.Student, where: { id: userId }, attributes: ['email', 'username'], },
            raw: true,
            nest: true,
        })

        return classAll.map(item => {
            return {
                className: item.className,
                id: item.id,
                teacherName: item.teacherName
            }
        })
    }


}
const CreateClass = async (dataBody, dataUser) => {
    console.log('dataUser', dataBody.user.username);
    try {
        let userId = dataUser.id;
        let role = dataUser.role;
        if (role === "Teacher") {
            console.log('vao1');
            // get class by user
            let classUser = await fucClassAll(userId, dataUser.role)
            let classroom = classUser.map((item, index) => {
                return item.className;
            })
            // check class exist
            let checkClass = classroom.includes(dataBody.className);
            if (checkClass === true) {
                return {
                    EM: 'Class name already exists ',
                    EC: -1,
                    DT: []
                }
            } else {
                await db.ClassRoom.create({
                    className: dataBody.className,
                    password: dataBody.password,
                    teacherName: dataBody.user.username
                })
                let classNew = await db.ClassRoom.findOne({
                    where: { className: dataBody.className },
                    raw: true
                })
                await db.Teacher_ClassRoom.create({
                    teacherId: dataUser.id,
                    classRoomId: classNew.id,
                })
                return {
                    EC: 0,
                    EM: 'Successfully Created',
                    DT: []
                }
            }

        }
    } catch (error) {
        console.log('>>>CreateClass', error);
    }

}
const JoinClass = async (dataBody, dataUser) => {
    try {
        if (dataBody && dataUser) {
            let className = dataBody.className;
            let password = dataBody.password;
            // let listClass = await fucClassAll(i);
            let allClass = await fucClassAll(dataUser.id, dataUser.role)
            console.log('databody', dataBody, 'user', dataUser);
            console.log('ssjshs', allClass);
            let checkExist = allClass.includes(item => item === dataBody.className);
            if (checkExist) {
                return {
                    EC: 0,
                    EM: 'Class already exists',
                    DT: []
                }
            } else {
                let checkClass = await db.ClassRoom.findOne({
                    where: { className: className, password: password },
                    nest: true,
                    raw: true,
                    attributes: ['id']
                })
                console.log('check class', checkClass);
                if (checkClass === null) {
                    return {
                        EM: 'The class does not exist or the class name or password is incorrect...',
                        EC: 1,
                        DT: []
                    }
                } else {
                    await db.Student_ClassRoom.create({
                        studentId: dataUser.id,
                        classRoomId: checkClass.id
                    })
                    return {
                        EC: 0,
                        EM: 'Successful',
                        DT: []
                    }
                }
            }
            return
            if (!listClass) {
                return {
                    EM: '',
                    EC: 0,
                    DT: []
                }
            } else {
                return {
                    EM: '',
                    EC: 0,
                    DT: listClass
                }
            }
        }
    } catch (error) {
        console.log('>>>fetchListClass', error);

    }
}

const fetchListClass = async (id, role) => {
    try {
        console.log(role);
        if (id) {
            let listClass = await fucClassAll(id, role);
            console.log('lop', listClass);

            if (!listClass) {
                return {
                    EM: '',
                    EC: 0,
                    DT: []
                }
            } else {
                return {
                    EM: '',
                    EC: 0,
                    DT: listClass
                }
            }
        }
    } catch (error) {
        console.log('>>>fetchListClass', error);

    }
}
const getClassAllAdmin = async (role, page, limit) => {
    console.log(role, page, limit);
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.ClassRoom.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            offset: offset,
            limit: limit,
            raw: true
        })
        let totalPage = Math.ceil(count / limit)

        let map = rows.map(item => item.id)
        console.log('ddddd', map);
        let students = [];
        for (let i = 0; i < map.length; i++) {
            let student = await db.Student.findAll({
                attributes: ['username', 'id', 'email'],
                include: { model: db.ClassRoom, where: { id: map[i] }, },
                raw: true,
                nest: true,
            })
            students.push(student)
        }
        let data = {
            totalRows: count,
            totalPage: totalPage,
            listClass: rows,
            students: students
        };
        return {
            EM: '',
            EC: 0,
            DT: data
        }


    } catch (error) {
        console.log('>>>getClassAllAdmin', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })

    }
}

const getDataUserCurrent = async (classId) => {
    console.log('student', classId);
    try {
        let student = await db.Student.findAll({
            attributes: ['username', 'id', 'email', 'address', 'sex', 'phone', 'role'],
            include: { model: db.ClassRoom, where: { id: classId }, attributes: ['className', 'teacherName', 'id'] },
            raw: true,
            nest: true,
        })
        console.log('student', student);
        if (!student) {
            return {
                EM: '',
                EC: 1,
                DT: []
            }
        } else {
            return {
                EM: '',
                EC: 0,
                DT: student
            }
        }

    } catch (error) {
        console.log('>>>>getDataUserCurrent', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}
const deleteStudent = async (studentId, classId) => {
    try {
        let user = await db.Student_ClassRoom.findOne({
            where: {
                studentId: studentId,
                classRoomId: classId
            }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'Delete student Success!',
                EC: 0,
                DT: []
            }
        } else {
            return {
                EM: "Server error",
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        console.log('>>>deleteStudent', error);
        return res.status(500).json({
            EM: 'ERROR SERVER -1 ',
            EC: -1,
            DT: []
        })
    }
}
module.exports = {
    getDataUserCurrent,
    CreateClass,
    fetchListClass,
    JoinClass,
    getClassAllAdmin,
    deleteStudent
}