const express = require("express");
const path = require("path");
const app = express();
const indexRouter = require('./routes/index')

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/', indexRouter)

app.listen(3000, () => {
    console.log("application running at port 3000");
});
