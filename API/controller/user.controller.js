import "../models/connection.js";
import jwt from "jsonwebtoken";
import rs from "randomstring";
import sendMail from "./email.controller.js";
import axios from "axios";
//to link users model
import UserSchemaModel from "../models/user.model.js";
import qs from "qs"; // install this

export const save = async (req, res) => {
  const users = await UserSchemaModel.find();
  const l = users.length;
  const _id = l == 0 ? 1 : users[l - 1]._id + 1;
  const userDetails = { ...req.body, _id: _id, status: 1, info: Date() };
  try {
    await UserSchemaModel.create(userDetails);
    sendMail(req.body.email, req.body.password);
    res.status(201).json({ status: true });
  } catch {
    res.status(500).json({ status: false });
  }
};

export const login = async (req, res) => {
  const { email, password, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ msg: "Captcha missing" });
  }

  try {
    const verifyRes = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      qs.stringify({
        secret: process.env.TURNSTILE_SECRET,
        response: captchaToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    if (!verifyRes.data.success) {
      return res.status(400).json({ msg: "Captcha failed" });
    }
    const userDetails = {
      email: req.body.email,
      password: req.body.password,
      status: 1,
    };
    const users = await UserSchemaModel.find(userDetails);

    if (users.length > 0) {
      const payload = users[0].email;
      const token = jwt.sign({ id: payload }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // ✅ Continue login
      return res
        .status(200)
        .json({ status: true, token: token, info: users[0] });
      // return res.json({ msg: "Login success" });
    }
  } catch (err) {
    console.error("LOGIN ERROR 👉", err.response?.data || err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};
export const fetch = async (req, res) => {
  var condition_obj = req.query;
  var userList = await UserSchemaModel.find(condition_obj);
  if (userList.length != 0)
    res.status(200).json({ status: true, info: userList });
  else res.status(404).json({ status: false });
};

export var deleteUser = async (req, res) => {
  try {
    let userDetails = await UserSchemaModel.findOne(req.body);
    if (userDetails) {
      await UserSchemaModel.deleteOne(req.body);
      var userList = await UserSchemaModel.find({ role: { $ne: "admin" } });

      if (userList.length != 0)
        res.status(200).json({ status: true, info: userList });
      else res.status(404).json({ status: false });
    } else res.status(404).json({ status: "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var update = async (req, res) => {
  try {
    let userDetails = await UserSchemaModel.findOne(req.body.condition_obj);
    if (userDetails) {
      await UserSchemaModel.updateMany(req.body.condition_obj, {
        $set: req.body.content_obj,
      });
      var userList = await UserSchemaModel.find({ role: { $ne: "admin" } });

      if (userList.length != 0)
        res.status(200).json({ status: true, info: userList });
      else res.status(404).json({ status: false });
    } else res.status(404).json({ status: "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};
