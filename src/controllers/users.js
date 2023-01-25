import CryptoJS from "crypto-js";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// development purpose only, it's not hardcoded in production
const PAS_SECRET = process.env.PAS_SECRET || "SuperStrongSecretKey";
const JWT_SEC = process.env.JWT_SEC || "JWTSecretKey";

export const getUsers = async (req, res) => {
  try {
    const response = await User.find({}, { password: 0 }); // this one reture everyfield except password, use 1 to include and use 0 to exclude
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const response = await User.findById(req.params.id, { password: 0 });
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const currentPassword = req.body.password;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User doesn't exists");
    //decrypt password
    const dec_password = CryptoJS.AES.decrypt(
      user.password,
      PAS_SECRET
    ).toString(CryptoJS.enc.Utf8);
    // validate password
    if (currentPassword != dec_password)
      return res.status(401).send("wrong credentials");
    const { password, ...others } = user._doc;
    const token = jwt.sign({ others }, JWT_SEC, { expiresIn: "12h" });
    res.send({ ...others, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { confirmPassword, ...others } = req.body;
    let currentPassword = req.body.password;
    if (currentPassword != confirmPassword)
      return res.status(400).send("passwords doesn't matched");
    const enc_password = CryptoJS.AES.encrypt(
      currentPassword,
      PAS_SECRET
    ).toString(); // Encrypt password
    const response = await User.create({ ...others, password: enc_password });
    const { password, ...data } = response._doc;
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!response) return res.status(404).send("user doesn't exixts");
    const { password, ...others } = response._doc;
    res.send(others);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    if (!response) return res.status(404).send("user doesn't exixts");
    const { password, ...others } = response._doc;
    res.send(others);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
