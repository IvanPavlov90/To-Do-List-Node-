const { validationResult } = require("express-validator");
const logging = require("./middleware.log");

module.exports = {
  validate: (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logging.errorLog("Validation error", "Wrong category text");
      return response.status(400).json({
        errors: errors.array(),
        message: "Uncorrect data",
      });
    } else {
      return next();
    }
  },
};
