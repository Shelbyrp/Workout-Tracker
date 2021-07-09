const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const PORT = process.env.PORT || 8001;

const db = require("./models");


const app = express();

const databaseName = "workout_db"

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/WorkoutTracker", {
    useNewUrlParser: true,
    useFindAndModify: false
});


app.use("/api", require("./routes/api.js"));
app.use("/", require("./routes/html.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});