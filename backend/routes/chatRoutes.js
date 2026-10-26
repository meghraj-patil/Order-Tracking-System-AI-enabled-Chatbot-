const express = require("express");

const router = express.Router();

const { chat } = require("../controllers/chatController");

router.post("/message", chat);

module.exports = router;