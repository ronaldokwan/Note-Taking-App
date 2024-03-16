"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      Note.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Note.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title cannot be null" },
          notEmpty: { msg: "Title cannot be empty" },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Content cannot be null" },
          notEmpty: { msg: "Content cannot be empty" },
        },
      },
      tag: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Tag cannot be null" },
          notEmpty: { msg: "Tag cannot be empty" },
        },
      },
      archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Default to false if not explicitly set
        validate: {
          notNull: { msg: "Archived cannot be null" },
          notEmpty: { msg: "Archived cannot be empty" },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "userId cannot be null" },
          isInt: { msg: "userId must be an integer" },
        },
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
