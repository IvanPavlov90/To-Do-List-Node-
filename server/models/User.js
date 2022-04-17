const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  _id: Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = {
  User: model("User", schema),
};
