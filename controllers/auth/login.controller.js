const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const user = {
            id: 1,
            username: "tangguh",
            email: "mtangguh97@gmail.com",
        };

        //generate token
        const token = jwt.sign(user, process.env.APP_JWT_KEY, {
            expiresIn: process.env.APP_JWT_EXP,
        });

        let date = new Date();
        date.setDate(date.getDate() + 1);

        res.status(200).send({
            message: "login Success!",
            token,
            expiresIn:date,
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while trying to login.",
        });
    }
};
