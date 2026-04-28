import { DataTypes } from 'sequelize';
import db from './db.js';
import bcrypt from 'bcrypt';

const UserModel = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSaltSync();
            user.password = await bcrypt.hashSync(user.password, salt);
        },
    },
});

UserModel.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default UserModel;
