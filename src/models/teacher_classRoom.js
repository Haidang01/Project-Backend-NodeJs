'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_ClassRoom extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

        }
    }
    Teacher_ClassRoom.init({
        teacherId: DataTypes.INTEGER,
        classRoomId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Teacher_ClassRoom',
    });
    return Teacher_ClassRoom;
};