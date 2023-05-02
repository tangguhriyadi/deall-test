const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
    fetchAll,
    create,
    fetchOne,
    patch,
    deleteOne,
} = require("../../../controllers/users/user.controller");
const {
    validateToken,
    validateScope,
} = require("../../../middlewares/auth.middleware");
const { passwordRegex } = require("../../../utils/constant");

// API GET ALL
router.get( // method
    "/users", // endpoint
    validateToken, // token validation
    validateScope(["admin", "user"]), // role scope
    (req, res) => {
        
        // query validation
        const schemaQuery = Joi.object({
            page: Joi.number().required().default(1),
            limit: Joi.number().required().default(10),
        });

        const { error } = schemaQuery.validate(req.query);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        fetchAll(req, res); //controller
    }
);

// API CREATE
router.post(  // method
    "/users", // endpoint
    validateToken, // token validation
    validateScope(["admin"]), // role scope
    (req, res) => {

    // payload validation
    const schemaPayload = Joi.object({
        name: Joi.string().required(),
        role: Joi.string().default("user"),
        age: Joi.number().required(),
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
        phone: Joi.string()
            .pattern(/^[0-9]+$/)
            .min(10)
            .max(13)
            .required(),
        last_login: Joi.string().allow(null).default(null),
    });

    const { error } = schemaPayload.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    create(req, res) //controller
});

// API GET ONE
router.get(  // method
    "/users/:id", // endpoint
    validateToken, // token validation
    validateScope(["admin", "user"]), // role scope
    (req, res) => {

        // param validation
        const schemaParam = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schemaParam.validate(req.params);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        fetchOne(req, res); //controller
    }
);

// API UPDATE
router.patch(  // method
    "/users/:id", // endpoint
    validateToken, // token validation
    validateScope(["admin"]), // role scope
    (req, res) => {

        // param validation
        const schemaParam = Joi.object({
            id: Joi.string().required(),
        });

        // payload validation
        const schemaPayload = Joi.object({
            name: Joi.string(),
            role: Joi.string().default("user"),
            age: Joi.number(),
            email: Joi.string().email(),
            password: Joi.string()
                .regex(
                    passwordRegex,
                    "Password must have at least 8 characters, 1 uppercase letter, 1 digit, and 1 symbol"
                )
                .messages({
                    "string.pattern.base":
                        "Password must have at least 8 characters, 1 uppercase letter, 1 digit, and 1 symbol",
                    "any.required": "Password is required",
                }),
            phone: Joi.string()
                .pattern(/^[0-9]+$/)
                .min(10)
                .max(13),
            last_login: Joi.string().allow(null).default(null),
        });

        const { error } = schemaPayload.validate(req.body);

        const { errorParam } = schemaParam.validate(req.params);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        if (errorParam) {
            res.status(400).send(errorParam.details[0].message);
            return;
        }

        patch(req, res); //controller
    }
);

// API DELETE
router.delete(  // method
    "/users/:id", // endpoint
    validateToken, // token validation
    validateScope(["admin"]), // role scope
    (req, res) => {

        // param validation
        const schemaParam = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schemaParam.validate(req.params);

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        deleteOne(req, res); //controller
    }
);

module.exports = router;
