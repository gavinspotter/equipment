const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const userRoutes = require("./routes/users-routes")
const companyRoutes = require("./routes/company-routes")


const HttpError = require("./models/HttpError")

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});

app.use("/api/company", companyRoutes)

app.use("/api/user", userRoutes)


app.use((req, res, next) => {
    const error = new HttpError("could not find this route", 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "an unknown error occured" });
});


mongoose
    .connect(
        "mongodb+srv://gavin:Password123@cluster0.d3tnt.mongodb.net/equipment?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
