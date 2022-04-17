const { Router } = require("express");
const { User } = require("../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = Router();
const config = require('../config/config');
const logging = require("../middleware/middleware.log");

router.post(
"/login",
logging.log,  
[
  check('email', 'Uncorrect email').isEmail(),
],
async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logging.errorLog("Validation error", "Uncorrect email");
      response.status(400).json({
        errors: errors.array(), 
        message: "Uncorrect data" 
      });
      return;
    }

    const {email, password} = request.body;

    const user = await User.findOne({ email });
    if (!user) {
      logging.errorLog("Authorization error", "Wrong credentials - email");
      response.status(401).json({ message: "Not authorizied" });
      return;
    }

    const comparePasswords = await bcrypt.compare(password, user.password);
    if (!comparePasswords) {
      logging.errorLog("Authorization error", "Wrong credentials - password");
      response.status(401).json({ message: "Not authorizied." });
      return;
    }

    const token = jwt.sign(
      { username: user.username },
      config.secret,
      { expiresIn: '20min' }
    );

    response.json({ token: token, username: user.username, userId: user.id });
  } catch (e) {
    logging.errorLog("Unexpected error", e.message);
    response
      .status(500)
      .json({ message: "Something goes wrong! Please try again later." });
  }
});

module.exports = router;
