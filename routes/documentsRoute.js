const express = require("express");
const {
  createDocument,
  findDocument,
  getDocumentsInSection,
} = require("./../Controller/documentController");
const DocumentModel = require("../models/documentsModel");
const { updateDocument, deleteDocument } = require("../utils/mainFunctions");
const router = express.Router();

router.post("/new", createDocument);
router.get("/");
router.patch("/:id", updateDocument(DocumentModel));
router.get("/:id", findDocument);
router.delete("/:id", deleteDocument(DocumentModel));
router.get("/get-documents-section/:id", getDocumentsInSection);
module.exports = router;
