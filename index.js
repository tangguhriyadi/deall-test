const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require("./routes/index");
const { checkConnectionDb } = require("./config/db.config");
const PORT = process.env.APP_PORT || 3000

require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

checkConnectionDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`application running at port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
