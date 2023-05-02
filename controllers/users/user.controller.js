const { ObjectId } = require("mongoose").Types;
const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.fetchAll = async (req, res) => {
    try {
        const options = {
            page: req.query.page,
            limit: req.query.limit,
            select: 'name role email phone last_login'
        }
        const data = await Users.paginate({}, options);

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
        const user = {
            ...req.body,
            password: await bcrypt.hash(req.body.password, saltRounds),
        };

        const data = new Users(user);
        data.save(data)
            .then(() => res.status(201).send({ message:'create user success !', status: 201 }))
            .catch((err) => res.status(400).send({ error: err }));
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.fetchOne = async (req, res) => {
    try {
        const data = await Users.findById(req.params.id).select('name email phone last_login')
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
        await Users.findOneAndUpdate(req.params.id, req.body, {
            upsert: true,
        });
        res.status(200).send({ message: "Data user has been updated !", status: 200 });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while fetching data.",
        });
    }
};
exports.deleteOne = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);

        if (!user) {
            res.status(400).send({ message: `User not found` });
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
