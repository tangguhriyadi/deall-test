const { ObjectId } = require("mongoose").Types;
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
        data.save(data).then(() => res.status(201).send({ data, status: 201 }));
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.fetchOne = async (req, res) => {
    try {
        const data = await Users.findById(req.params.id);
        res.status(200).send({ data });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.patch = async (req, res) => {
    try {

        const data = await Users.findOneAndUpdate(req.params.id, req.body, {
            upsert: true,
        });
        res.status(200).send({ data, status: 200 });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.deleteOne = async (req, res) => {
    try {

        const user = await Users.findById(req.params.id)

        if(!user) {
            res.status(400).send({message: `User not found`})
            return;
        }

        await Users.deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).send({
            message: `user with Id ${req.params.id} has been deleted`,
            status: 200,
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
