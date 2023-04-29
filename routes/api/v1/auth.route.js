const express = require("express");
const router = express.Router();

router.get("/auth/login", (req, res) => {
    res.status(200).send({
        status: 200,
        message: "ok",
    });
});


module.exports = router;