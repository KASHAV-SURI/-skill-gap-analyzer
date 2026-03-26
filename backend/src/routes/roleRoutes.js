const express = require("express");
const { getAllRoles, getRoleBySlug } = require("../controllers/roleController");

const router = express.Router();

router.get("/", getAllRoles);
router.get("/:slug", getRoleBySlug);

module.exports = router;
