const jwt = require("jsonwebtoken");
const { Users } = require("../../models");

exports.fetchAll = async (req, res) => {
    try {
        const data = await Users.paginate({});
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.create = async (req, res) => {
    try {
       
        const data = new Users(req.body);
        data.save(data).then(() => res.status(201).send(data));
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.fetchOne = async (req, res) => {
    try {
        const data = await Users.findById(req.params.id)
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
