const SectionModel = require("./../models/sectionsModel");

exports.createSection = async (req, res, next) => {
  try {
    const newSection = await SectionModel.create(req.body);
    res.status(201).json(newSection);
  } catch (err) {
    return next(err);
  }
};

exports.getSection = async (req, res, next) => {
  try {
    const newSection = await SectionModel.findById(req.params.id);
    res.status(200).json(newSection);
  } catch (err) {
    return next(err);
  }
};
exports.getSections = async (req, res, next) => {
  try {
    const newSection = await SectionModel.find();
    res.status(200).json(newSection);
  } catch (err) {
    return next(err);
  }
};
