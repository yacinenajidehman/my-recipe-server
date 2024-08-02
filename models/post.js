const { Sequelize, DataTypes } = require('sequelize');
const db = require('./database');
const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
    },
    contents: {
        type: DataTypes.TEXT,
    },
    steps: {
        type: DataTypes.JSON,
    },
    country: {
        type: DataTypes.STRING,
    },
    region: {
        type: DataTypes.STRING,
    }
})

Post.associate = models => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Post_Image);
    Post.hasMany(models.Comment);
}

module.exports = Post;
