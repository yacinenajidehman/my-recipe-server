const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');
const Comment = db.define('Comment', {
    content: {
        type: DataTypes.TEXT,
    },
})

Comment.associate = models => {
    Comment.belongsTo(models.User);
    Comment.belongsTo(models.Post);
}

module.exports = Comment