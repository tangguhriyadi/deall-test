const express = require("express");
const router = express.Router();
const API_AUTH = require('./v1/auth.route');
const API_USER = require('./v1/user.route')

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
router.use("/v1/", API_USER);
module.exports = router;
