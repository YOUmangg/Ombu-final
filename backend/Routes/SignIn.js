const express = require("express");
const Members = require("../Models/LoginModel");

const router = express.Router();

router.get("/", async (req, res) => {
    const newuser = await newusers.find({}).sort({ createdAt: -1 });
    res.status(200).json(newuser);
  });
