const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');
const models = require('.');
const bcrypt = require('bcryptjs');
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
}, {
    timestamps: false,
    hooks: {
        beforeSave: async (user, options) => {
            // Check if the password field is being changed
            if (user.changed('password')) {
                // Hash the password before saving
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
    },
})

User.associate = models => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
}


module.exports = User;