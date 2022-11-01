const { Sequelize } = require('sequelize');

// hàm kết nối
const sequelize = new Sequelize('project', 'root', null, {
    host: 'localhost',
    dialect: 'mysql'
});

//test connection
const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default connection;