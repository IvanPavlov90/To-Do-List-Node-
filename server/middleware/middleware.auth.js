const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../models/User");
const logging = require("./middleware.log");

module.exports = (request, response, next) => {
  if (request.method === "OPTIONS") {
    return next();
  }

  try {
    const token = request.headers.authorization.split(" ")[1];
    let isUserAuthorizied = false;

    if (!token) {
      return response.status(401).json({ message: "Not authorizied!" });
    }

    const decoded = jwt.verify(token, config.secret);

    const user = User.findOne({ username: decoded.username });

    if (user) {
      isUserAuthorizied = true;
    }

    if (isUserAuthorizied) {
      return next();
    } else {
      logging.errorLog("Authorization error", "Token isn't valid");
      return response.status(401).json({ message: "Not authorizied!" });
    }
  } catch (e) {
    logging.errorLog("Authorization error", "Token isn't valid");
    return response.status(401).json({ message: "Not authorizied!" });
  }
};
