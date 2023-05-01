const express = require("express");
const router = express.Router();

const { fetchAll } = require("../../../controllers/users/user.controller");

router.get("/users", fetchAll);

module.exports = router;
