"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Note, {
        foreignKey: "userId",
        as: "notes",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notNull: { msg: "Username cannot be null" },
          notEmpty: { msg: "Username cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notNull: { msg: "Email cannot be null" },
          notEmpty: { msg: "Email cannot be empty" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // Optional for social logins
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false, // Google, GitHub, manual
        defaultValue: "manual",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
