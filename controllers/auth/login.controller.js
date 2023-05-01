const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    try {
        //fetch user data
        const user = await Users.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).send({
                message: "email not found",
            });
            return;
        }

        // compare password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            res.status(403).send({
                message: "email or password is not correct",
            });
            return;
        }

        //generate token
        const token = jwt.sign(
            {
                name: user.name,
                role: user.role,
                age: user.age,
                email: user.email,
                phone: user.phone,
            },
            process.env.APP_JWT_KEY,
            {
                expiresIn: process.env.APP_JWT_EXP,
            }
        );

        // update last_login
        await Users.findOneAndUpdate(user._id.toString(), {
            last_login: new Date(),
        });

        let date = new Date();
        date.setDate(date.getDate() + 1);

        res.status(200).send({
            message: "login Success!",
            token,
            expiresIn: date,
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while trying to login.",
        });
    }
};
