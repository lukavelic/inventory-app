const routes = require("express").Router();
const { category, register, login, dashboard } = require("./controllers");

routes.get("/inventory/:category", category);
routes.post("/register", register);
routes.post("/login", login);
routes.get("/dashboard", dashboard);

module.exports = routes;
