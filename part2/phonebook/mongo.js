require('dotenv').config()
const mongoose = require("mongoose");

mongoose.set("strictQuery", false)

const url = process.env.MONGO_URI;

console.log("MongoDB URI: ", url);

mongoose.connect(url)
.then(() => {
    console.log("Connected to MongoDB!");
})
.catch((err) => {
    console.log("Error when connecting to mongodb: ", err.message);
})