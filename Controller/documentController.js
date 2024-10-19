const DocumentsModel = require("../models/documentsModel");
const Err = require("../err");
const documentModel = require("../models/documentsModel");
const SectionsModel = require("../models/sectionsModel");
const { getDocument } = require("../utils/mainFunctions");
const createDocument = async (req, res, next) => {
  try {
    const newDocument = await DocumentsModel.create(req.body);
    // console.log(newDocument);
    res.status(201).json(newDocument);
  } catch (err) {
    return next(err);
  }
};

const findDocument = getDocument(documentModel);

const getDocumentsInSection = async (req, res, next) => {
  try {
    const docs = await documentModel.find({ category: req.params.id });
    console.log(docs);
    res.status(200).json(docs);
  } catch (err) {
    return next(err);
  }
};
const staticsSections = async (req, res, next) => {
  const stats = await DocumentsModel.aggregate([
    {
      $match: {
        title: { $exists: true },
      },
    },
    {
      $group: {
        _id: "$category",
        numberOfSections: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        // numberOfSections: 1,
      },
    },
  ]);
  let arr = [];
  const stats2 = await SectionsModel.find({}, { name: 1, _id: 0 });
  stats2.forEach((obj) => {
    return arr.push(obj.name);
  });

  res.status(200).json({
    sectionsLength: stats.length,
    sections: arr,
  });
};

module.exports = {
  createDocument,
  findDocument,
  getDocumentsInSection,
  staticsSections,
};
