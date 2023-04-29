var express = require("express");
var router = express.Router();
var API_ROUTER = require("./api");

router.get("/", (req, res) => {
    res.status(200).send({ status: 200, messange: "Wellcome to my project" });
});

router.use("/api/", API_ROUTER);

module.exports = router;
