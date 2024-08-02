const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');
const models = require('.');
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    img_uri: {
        type: DataTypes.STRING,
    }
},{
    timestamps: false
})

User.associate = models => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
}

module.exports = User;