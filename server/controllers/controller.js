const { User, Note } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const data = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: data.id,
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const data = await User.findOne({ where: { email } });
      if (!data) throw { name: "Invalid email/password" };

      const checkPassword = comparePassword(password, data.password);
      if (!checkPassword) throw { name: "Invalid email/password" };

      const payload = { id: data.id };
      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
  static async home(req, res, next) {
    try {
      const data = await Note.findAll({
        where: {
          userId: req.user.id,
          archived: false,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async archived(req, res, next) {
    try {
      const data = await Note.findAll({
        where: {
          userId: req.user.id,
          archived: true,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async addNote(req, res, next) {
    try {
      const { title, content } = req.body;
      const userId = req.id;
      const data = await Note.create({
        title,
        content,
        userId,
      });

      res.status(201).json({
        id: data.id,
        title: data.title,
        content: data.content,
        userId: data.userId,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateNote(req, res, next) {
    try {
      const id = req.params.id;
      const { title, content } = req.body;

      const data = await Note.findByPk(id);
      if (!data) throw { name: "Note not found" };

      data.title = title;
      data.content = content;
      await data.save();

      res.status(200).json({ message: "Note has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteNote(req, res, next) {
    try {
      const id = req.params.id;

      const data = await Note.findByPk(id);
      if (!data) throw { name: "Note not found" };
      await data.destroy();

      res.status(200).json({ message: "Note has been deleted" });
    } catch (error) {
      next(error);
    }
  }
  static async updateArchived(req, res, next) {
    try {
      const id = req.params.id;
      const { archived } = req.body;

      const data = await Note.findByPk(id);
      if (!data) throw { name: "Note not found" };

      data.archived = archived;
      await data.save();

      res.status(200).json({ message: "Note has been archived" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
