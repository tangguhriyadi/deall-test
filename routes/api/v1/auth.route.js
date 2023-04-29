const express = require("express");
const router = express.Router();

const { login } = require("../../../controllers/auth/login.controller");

router.get("/auth/login", login);

module.exports = router;
