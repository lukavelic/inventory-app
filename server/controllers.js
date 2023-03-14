const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Category = require("./db/models/category");
const Item = require("./db/models/item");
const User = require("./db/models/user");

// bcrypt
const saltRounds = 10;

exports.category = async (req, res) => {
    console.log("hit category", req.params);

    const category = new Category({
        name: req.params.category,
    });

    category
        .save()
        .then((result) => {
            res.status(200).send({ msg: "Category created", result });
        })
        .catch((err) => {
            res.status(500).send({ msg: "Error creating category", err });
        });
};

exports.register = async (req, res) => {
    console.log("hit register", req.body);

    User.findOne({
        username: req.body.username,
    })
        .then((result) => {
            if (result) {
                res.status(208).send({
                    msg: "Username is taken",
                    result,
                });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            res.status(500).send({
                                msg: "Error hashing password",
                                err,
                            });
                        }

                        const user = new User({
                            username: req.body.username,
                            password: hash,
                        });

                        user.save()
                            .then((result) => {
                                res.status(201).send({
                                    msg: "User successfully created!",
                                    result,
                                });
                            })
                            .catch((err) => {
                                console.log({ err });
                                res.status(500).send({
                                    msg: "Error creating user",
                                    err,
                                });
                            });
                    });
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ err });
        });
};

exports.login = async (req, res) => {
    console.log("hit login", req.body);

    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                bcrypt.compare(
                    req.body.password,
                    user.password,
                    (err, result) => {
                        console.log("bcrypt compare");
                        console.log(result);
                        console.log(err);
                        if (result === true) {
                            console.log("true - passwords match");
                            const token = jwt.sign(
                                {
                                    userId: user._id,
                                    username: user.username,
                                },
                                process.env.privateKey,
                                { expiresIn: "30 days" }
                            );

                            res.status(200).send({
                                msg: "Login successful",
                                username: user.username,
                                userId: user._id,
                                token,
                            });
                        } else {
                            console.log("else - passwords do not match");
                            res.status(401).send({
                                msg: "Username/Password is incorrect",
                                err,
                            });
                        }
                    }
                );
                // .catch((err) => {
                //     console.log("err 500");
                //     res.status(500).send({
                //         msg: "Could not hash password",
                //         err,
                //     });
                // });
            } else {
                res.status(401).send({ msg: "Username/Password is incorrect" });
            }
        })
        .catch((err) => {
            res.status(500).send({ msg: "Could not access database", err });
        });
};

exports.dashboard = async (req, res) => {
    console.log("hit dashboard");

    const token = req.headers.authorization.slice(7);

    try {
        const tokenData = jwt.verify(token, process.env.privateKey);
        res.status(200).send({ msg: "You can view this page" });
    } catch (err) {
        res.status(401).send({
            msg: "You are not authorized to view this page",
            err,
        });
    }
};
