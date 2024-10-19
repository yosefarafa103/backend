const express = require("express");
const {
  createSection,
  getSection,
  getSections,
} = require("../Controller/sectionsController");
const { staticsSections } = require("../Controller/documentController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();
router.post("/new", createSection);
router.use(validateToken);
router.get("/stats", staticsSections);
router.get("/:id", getSection);
router.get("/", getSections);
module.exports = router;
