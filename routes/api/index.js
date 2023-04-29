const express = require("express");
const router = express.Router();
const API_AUTH = require('./v1/auth.route');

router.use(
    "/v1",
    router.get("", (req, res) => {
        res.send({
            message: "Welcome to Improvement API",
            version: "v1.0.0",
        });
    })
);

router.use("/v1/", API_AUTH);
module.exports = router;
