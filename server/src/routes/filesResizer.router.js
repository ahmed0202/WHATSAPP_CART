const express = require("express");
const { resize } = require("../controllers/filesResizer.controller");

const router = express();

router.get("/:file_uri", resize());

module.exports = router;
