const express = require("express");
const router = express.Router();

const { login } = require("../../../controllers/auth/login.controller");
const Joi = require("joi");
const { passwordRegex } = require("../../../utils/constant");

router.get("/auth/login", (req, res) => {
    const schemaPayload = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string()
            .regex(
                passwordRegex,
                "Password must have at least 8 characters, 1 uppercase letter, 1 digit, and 1 symbol"
            )
            .required()
            .messages({
                "string.pattern.base":
                    "Password must have at least 8 characters, 1 uppercase letter, 1 digit, and 1 symbol",
                "any.required": "Password is required",
            }),
    });

    const { error } = schemaPayload.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    login(req, res);
});

module.exports = router;
