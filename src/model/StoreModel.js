import { DataTypes } from 'sequelize';
import db from './db.js';

const StoreModel = db.define("stores", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    store_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_store: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    opening_hours: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    services_offered: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price_range: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default StoreModel;
