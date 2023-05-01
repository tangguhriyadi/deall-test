const express = require("express");
const router = express.Router();

const { fetchAll, create, fetchOne, update, deleteOne} = require("../../../controllers/users/user.controller");

// API GET ALL
router.get("/users", fetchAll);

// API CREATE
router.post("/users", create);

// API GET ONE
router.get("/users/:id", fetchOne);

// API UPDATE
router.put("/users/:id", update);

// API DELETE
router.delete("/users/:id", deleteOne);

module.exports = router;
