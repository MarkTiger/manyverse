'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikedPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LikedPost.belongsTo(models.User, {
        foreignKey: "user_id"
      })

      LikedPost.belongsTo(models.Post, {
        foreignKey: "post_id"
      })

    }

    static likeThisYo(userId, postId) {
      const formData = {
        user_id: userId,
        post_id: postId
      }

      return LikedPost.findOne({
        where: formData
      })
        .then(foundPost => {
          if (foundPost) {
            return LikedPost.destroy({
              where: formData
            })
          } else {
            return LikedPost.create(formData)
          }
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  };
  LikedPost.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LikedPost',
  });
  return LikedPost;
};