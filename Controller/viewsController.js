const DocumentModel = require("./../models/documentsModel");
const { getAllDocuments } = require("../utils/mainFunctions");
exports.getAllDocs = async (req, res) => {
  const docs = await DocumentModel.find();
  console.log(docs);

  res.render("index", {
    documents: docs,
  });
};
