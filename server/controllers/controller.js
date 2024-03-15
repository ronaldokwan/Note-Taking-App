const { User, Note } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
// google login
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username) throw { name: "Username is required" };
      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const dataFind = await User.findOne({
        where: { email, provider: "manual" },
      });
      if (dataFind) throw { name: "Email already exist" };

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

      const data = await User.findOne({ where: { email, provider: "manual" } });
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
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience:
          "1012248528478-f2jn6iljb8d62k7q00i79v6piqp4km1b.apps.googleusercontent.com",
      });
      const { email, name } = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email, provider: "google" },
        defaults: {
          username: name,
          email,
        },
      });

      const payload = { id: user.id };
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
      const { title, content, tag } = req.body;
      const userId = req.user.id;
      const data = await Note.create({
        title,
        content,
        tag,
        userId,
      });

      res.status(201).json({
        id: data.id,
        title: data.title,
        content: data.content,
        tag: data.tag,
        userId: data.userId,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateNote(req, res, next) {
    try {
      const id = req.params.id;
      const { title, content, tag } = req.body;

      const data = await Note.findByPk(id);
      if (!data) throw { name: "Note not found" };

      data.title = title;
      data.content = content;
      data.tag = tag;
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
