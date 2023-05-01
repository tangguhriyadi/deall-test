const express = require("express");
const router = express.Router();

const { fetchAll, create, fetchOne } = require("../../../controllers/users/user.controller");

// API GET ALL
router.get("/users", fetchAll);

// API CREATE
router.post("/users", create);

// API GET ONE
router.get("/users/:id", fetchOne);

module.exports = router;
