require("dotenv").config();
const { checkConnectionDb } = require("../config/db.config");
const { Users, Roles } = require("../models");
const fs = require("fs");
const bcrypt = require('bcrypt');
const saltRounds = 10;

checkConnectionDb();

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/user.seeder.json`, "utf-8")
);

const roles = JSON.parse(
    fs.readFileSync(`${__dirname}/role.seeder.json`, "utf-8")
);

const importData = async () => {
    try {
        const promiseUser = users.map(async (user) => ({
            ...user,
            password:await bcrypt.hash(user.password, saltRounds)
        }))
        const newUsers = await Promise.all(promiseUser)
        await Users.create(newUsers)
        await Roles.create(roles)
        console.log('success seed')
        process.exit()
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Users.deleteMany({});
        await Roles.deleteMany({})
        console.log("succes delete");
        process.exit(1);
    } catch (err) {
        console.log(err);
    }
};

if (process.argv[2] === "-i") {
    importData();
} else if (process.argv[2] === "-d") {
    deleteData();
}
