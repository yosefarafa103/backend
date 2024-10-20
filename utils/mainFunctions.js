const getDocument = (model) => async (req, res, next) => {
  const document = await model.find({ _id: req.params.id });

  // .populate("category");

  // console.log(document);
  res.status(200).json(document);
};
const getAllDocuments = (model) => async (req, res, next) => {
  try {
    const docs = await model.find();
    console.log(docs);
  } catch (err) {
    return next(err);
  }
};
const createDocument = (model) => async (req, res, next) => {
  try {
    const newDocument = await model.create(req.body);
    res.status(201).json(newDocument);
  } catch (err) {
    return next(err);
  }
};
const updateDocument = (model) => async (req, res, next) => {
  const doc = await model.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  console.log(doc);
  res.status(200).json(doc);
};
const deleteDocument = (model) => async (req, res, next) => {
  try {
    console.log(req.params.id);
    await model.findByIdAndDelete(req.params.id);
    console.log("deleted");
    res.status(204).send(null);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  getAllDocuments,
};
