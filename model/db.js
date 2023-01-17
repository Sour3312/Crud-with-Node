const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
});

const MyModel = new mongoose.model("MyModel", schema);

module.exports = MyModel;
