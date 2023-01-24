import CryptoJS from "crypto-js";
import User from "../models/users.js";
import { validationResult } from "express-validator";

const PAS_SECRET = process.env.PAS_SECRET || "SuperStrongSecretKey"; // development purpose only, not included in production

export const getUsers = async (req, res) => {
  try {
    const response = await User.find()
    res.send(response)
  } catch (err) {
    res.status(500).send(err.message)
  }
};

export const getUser = async (req, res) => {
    try {
        const response = await User.findById(req.params.id)
        res.send(response)
      } catch (err) {
        res.status(500).send(err.message)
      }
};

export const loginUser = (req, res) => {
  res.send("login");
};

export const registerUser = async (req, res) => {
  try {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password, confirmPassword, ...others } = req.body;
    if (password != confirmPassword)
      return res.status(400).send("passwords doesn't matched");
    const enc_password = CryptoJS.AES.encrypt(password, PAS_SECRET).toString(); // Encrypt password
    const response = await User.create({ ...others, password: enc_password });
    res.status(201).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id,{ $set : req.body},{new : true})
    res.send(response)
  } catch (err) {
    res.status(500).send(err.message)
  }
};

export const deleteUser = async (req,res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id)
    res.send(response)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
