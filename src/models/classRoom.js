'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassRoom.belongsToMany(models.Student, { through: 'Student_ClassRoom', foreignKey: 'classRoomId' })
            ClassRoom.belongsToMany(models.Teacher, { through: 'Teacher_ClassRoom', foreignKey: 'classRoomId' })

        }
    }
    ClassRoom.init({
        className: DataTypes.STRING,
        password: DataTypes.STRING,
        teacherName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ClassRoom',
    });
    return ClassRoom;
};