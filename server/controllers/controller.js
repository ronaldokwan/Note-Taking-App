const { User, Note, Order } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const axios = require("axios");
const midtransClient = require("midtrans-client");
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
        audience: process.env.GOOGLE_CLIENT_ID,
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
  static async anime(req, res, next) {
    const options = {
      method: "GET",
      url: `https://any-anime.p.rapidapi.com/v1/anime/gif/1`,
      headers: {
        "X-RapidAPI-Key": process.env.ANIME_API_KEY,
        "X-RapidAPI-Host": process.env.ANIME_API_HOST,
      },
    };
    try {
      const response = await axios.request(options);
      const data = response.data.images[0];
      console.log(data);
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
  static async trivia(req, res, next) {
    const axios = require("axios");
    const num = Math.floor(Math.random() * 10) + 1;
    const options = {
      method: "GET",
      url: `https://numbersapi.p.rapidapi.com/${num}/trivia`,
      params: {
        fragment: "true",
        notfound: "floor",
        json: "true",
      },
      headers: {
        "X-RapidAPI-Key": process.env.TRIVIA_API_KEY,
        "X-RapidAPI-Host": process.env.TRIVIA_API_HOST,
      },
    };
    try {
      const response = await axios.request(options);
      const text = response.data.text;
      const number = response.data.number;
      res.status(200).json({ text, number });
    } catch (error) {
      next(error);
    }
  }
  static async payment(req, res, next) {
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    const orderId = Math.random().toString();
    const amount = 10000;
    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: req.user.username,
        email: req.user.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    let transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);

    await Order.create({
      orderId,
      amount,
      userId: req.user.id,
    });
    res.status(200).json({ message: "success", transactionToken, orderId });
  }
  catch(error) {
    next(error);
  }

  static async upgrade(req, res, next) {
    const { orderId } = req.body;
    const order = await Order.findOne({ where: { orderId } });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.donated === "donated" || order.status === "paid") {
      return res.status(200).json({ message: "thx for the donation" });
    }

    const base64ServerKey = Buffer.from(process.env.SERVER_KEY + ":").toString(
      "base64"
    );
    const { data } = await axios.get(
      `
https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: {
          Authorization: `Basic ${base64ServerKey}`,
        },
      }
    );
    console.log(data);
    if (data.transaction_status === "capture" && data.status_code === "200") {
      await req.user.update({ donated: "donated" });
      await Order.update(
        { status: "paid", paidDate: new Date() },
        { where: { orderId } }
      );
      res.status(200).json({ message: "upgrade success" });
    } else {
      res.status(400).json({ message: "Upgrade failed" });
    }
  }
  catch(error) {
    console.log(error);
    next(error);
  }
}

module.exports = Controller;
