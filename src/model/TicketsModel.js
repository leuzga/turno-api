import { DataTypes } from 'sequelize';
import db from './db.js';
import UserModel from './UserModel.js';
import StoreModel from './StoreModel.js';

const TicketsModel = db.define("tickets", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Creado", "Atendido", "Cancelado", "En Progreso"),
        allowNull: false,
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

UserModel.hasMany(TicketsModel, {
    foreignKey: { name: 'user_id', type: DataTypes.INTEGER, allowNull: false },
    onDelete: 'CASCADE',
});

StoreModel.hasMany(TicketsModel, {
    foreignKey: { name: 'store_id', type: DataTypes.INTEGER, allowNull: false },
    onDelete: 'CASCADE',
});

export default TicketsModel;
