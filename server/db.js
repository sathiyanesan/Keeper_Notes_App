const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize("KeeperNote", "postgres", "sathiya", { host: "localhost", dialect: "postgres" });

sequelize.authenticate().then(() => {
    console.log('Successfully connected to db');
}).catch((err) => {
    console.error(err.message);
})

const Notes = sequelize.define('Note', {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255)
    }
}, { freezeTableName: true });


module.exports={sequelize,Notes};