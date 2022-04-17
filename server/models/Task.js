const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  _id: Types.ObjectId,
  header: {
    type: String,
    required: true,
  },
  category_id: String,
  isDone: Boolean,
  description: String, 
  data: Date,
});

module.exports = {
  Task: model("Task", schema),
};