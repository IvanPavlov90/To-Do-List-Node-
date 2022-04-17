const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  _id: Types.ObjectId,
  text: {
    type: String,
    required: true,
  },
  subcategory: [
    {
      type: String,
    },
  ],
  parentID: String || null,
  data: Date,
});

module.exports = {
  Category: model("Category", schema),
};
