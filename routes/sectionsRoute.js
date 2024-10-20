const express = require("express");
const {
  createSection,
  getSection,
  getSections,
} = require("../Controller/sectionsController");
const { staticsSections } = require("../Controller/documentController");
const validateToken = require("../middleware/validateToken");
const { deleteAllDocs, deleteDocument } = require("../utils/mainFunctions");
const Section = require("../models/sectionsModel");
const router = express.Router();
router.post("/new", createSection);
// router.use(validateToken);
router.get("/stats", staticsSections);
router.get("/:id", getSection);
router.delete("/:id", deleteDocument(Section));
router.get("/", getSections);
router.delete("/", deleteAllDocs(Section));

module.exports = router;
