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