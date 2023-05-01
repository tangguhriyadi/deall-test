const express = require("express");
const router = express.Router();

const { fetchAll, create } = require("../../../controllers/users/user.controller");

// API GET ALL
router.get("/users", fetchAll);

// API CREATE
router.post("/users", create);

module.exports = router;
