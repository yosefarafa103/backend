const { Schema, model } = require("mongoose");
const SectionModel = require("./sectionsModel");
const documentsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "title of document is required"],
    },
    question: {
      type: String,
    },
    description: String,
    choices: [String],
    auther: {
      type: String,
      default: "user123",
    },
    category: [{ type: Schema.ObjectId, ref: SectionModel }],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true } },
  { toObject: { virtuals: true } }
);
const documentModel = model("documents", documentsSchema);
documentsSchema.pre("find", function (next) {
  // this.populate({ path: "category" });
  next();
});
// documentsSchema.virtual("section", {
//   ref: "sectionsSchema",
//   localField: "questions",
//   foreignField: "category",
// });

module.exports = documentModel;
