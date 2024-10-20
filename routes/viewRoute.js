const express = require("express");
const { getAllDocs } = require("../Controller/viewsController");
const router = express.Router();

router.get("/", getAllDocs);
module.exports = router;
