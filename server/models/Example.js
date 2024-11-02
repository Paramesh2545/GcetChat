const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exSchema = new Schema({
  title: String,
  body: String,
});

const example = mongoose.model("example", exSchema, "self");
module.exports = example;
