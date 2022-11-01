'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student_ClassRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Student_ClassRoom.init({
        studentId: DataTypes.INTEGER,
        classRoomId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Student_ClassRoom',
    });
    return Student_ClassRoom;
};