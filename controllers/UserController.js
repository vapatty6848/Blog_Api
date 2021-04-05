const express = require('express');
// const jwt = require('jsonwebtoken');
const rescue = require('express-rescue');
const { User } = require('../models');

const router = express.Router();
const CREATED = 201;

router.post('/user', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = {
    displayName,
    email,
    password,
    image,
  };

  return User.create(newUser).then((user) => res.status(CREATED).json(user));
}));
