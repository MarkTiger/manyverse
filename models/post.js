'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "user_id"
      })

      Post.belongsToMany(models.User, {
        through: models.LikedPost,
        foreignKey: "post_id"
      })

      Post.hasMany(models.LikedPost, {
        foreignKey: "post_id"
      })
    }

    static getPostsWithLikeCount(User, LikedPost, userId) {
      const where = {}
      if (userId) {
        where.user_id = userId
      }
      return Post.findAll({
        where,
        attributes: {
          include: [
            [sequelize.fn("COUNT", sequelize.col("LikedPosts.id")), "likeCount"]
          ]
        },
        include: [
          {
            model: User,
            attributes: [
              "first_name",
              "last_name"
            ]
          },
          {
            model: LikedPost,
            attributes: []
          }
        ],
        group: ["Post.id", "User.id"],
        order: [
          ["updatedAt", "DESC"]
        ]
      })
    }
  };
  Post.init({
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Cover cannot be empty"
        },
        notNull: {
          msg: "Cover cannot be empty"
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Message cannot be empty"
        },
        notNull: {
          msg: "Message cannot be empty"
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};