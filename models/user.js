'use strict';
const { hashPassword } = require("../helpers/hashPassword")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Post, {
        through: models.LikedPost,
        foreignKey: "user_id"
      })

      User.hasMany(models.LikedPost, {
        foreignKey: "user_id"
      })
    }

    getFullname() {
      return `${this.first_name} ${this.last_name}`
    }
  };
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First name cannot be empty"
        },
        notEmpty: {
          msg: "First name cannot be empty"
        }
      }
    },
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email cannot be empty"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.status = "Hey, there! I'm using Manyverse!"
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};