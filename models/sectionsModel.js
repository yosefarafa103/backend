const { Schema, model } = require("mongoose");
const Docs = require("./documentsModel");

const sectionsSchema = Schema({
  name: {
    type: String,
    unique: [true, "section name must be unique!"],
    required: [true, "section must have name as (required)"],
  },
});
const sectionModel = model("section", sectionsSchema);
// sectionsSchema.virtual("quests", {
//   ref: "documentModel",
//   foreignField: "category",
//   localField: "_id",
// });

module.exports = sectionModel;
