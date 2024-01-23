"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./src/index");
var app = (0, express_1.default)();
var server = new index_1.default(app);
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app
    .listen(PORT, "localhost", function () {
    console.log("Server is running on port ".concat(PORT, "."));
})
    .on("error", function (err) {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
// import express, { Application } from "express";
// import cors, { CorsOptions } from "cors";
// import Routes from "./src/routes";
// const app:Application = express();
// // parse requests of content-type - application/json
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// const whitelist = ["http://localhost:4200"]; //Change to the port in which react app is running
// const corsOptions: CorsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };
// app.use(cors(corsOptions));
// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to fullstack application."});
// });
// //All users routes
// const {
//     addUser,
//     getUsers,
//     getUser,
//     updateUser,
//     deleteUser,
//     getEmployeeDays,
//     getEmployeeMonths
// } = require("./utils/queryHelpers");
// //GET all users
// app.get("/users", async function (request, response) {
//     try {
//         const [result] = await getUsers();
//         response.send({ success: true, result });
//     } catch (error) {
//         response.status(500).send({
//         success: false,
//         error: genericError,
//     });
//     }
// });
// //GET User
// app.get("/users/:id", async function (request, response) {
//     const { id } = request.params;
//     try {
//         const [result] = await getUser(id);
//         if (result.length > 0) {
//         response.send({ success: true, result: result[0] });
//         } else {
//         response.status(404).send({
//             success: false,
//             error: `No employee found with id ${id}`,
//         });
//         }
//     } catch (error) {
//             response.status(500).send({
//             success: false,
//             error: genericError,
//             });
//     }});
// //POST User
// app.post("/users", async function (request, response) {
// try {
//     const {name, country, city, salary } = request.body;
//     const [result] = await addUser(name, country, city, salary);
//     if (result.insertId) {
//         const [data] = await getUser(result.insertId);
//         response.send({ success: true, result: data[0] });
//     } else {
//         response.status(500).send({
//         success: false,
//         error: genericError,
//     });
//     }
// } catch (error) {
//     response.status(500).send({
//     success: false,
//     error: genericError,
//     });
// }});
// //Update User
// app.put("/users/:id", async function (request, response) {
// try {
//     const { name, country, city, salary } = request.body;
//     const { id } = request.params;
//     const [result] = await updateUser(id, name, country, city, salary);
//     if (result.affectedRows > 0) {
//     const [data] = await getUser(id);
//     response.send({ success: true, result: data[0] });
//     } else {
//         response.status(400).send({
//         success: false,
//         error: genericError,
//         });
//     }} catch (error) {
//     console.log(error);
//     response.status(500).send({
//     success: false,
//     error: genericError,
//     });
//     }});
// //Delete User
// app.delete("/users/:id", async function (request, response) {
// try {
//     const { id } = request.params;
//     const [result] = await deleteUser(id);
//     if (result.affectedRows > 0) {
//     response.send({ success: true });
//     } else {
//     response.status(400).send({
//         success: false,
//         error: genericError,
//     });
// }} catch (error) {
//     console.log(error);
//     response.status(500).send({
//     success: false,
//     error: genericError,
//     });
// }});  
// //Get day
// app.get("/days/:day", async function (request, response) {
//     const { day} = request.params;
//     try {
//         const [result] = await getEmployeeDays(day);
//         if (result.length > 0) {
//         response.send({ success: true, result: result[0] });
//         } else {
//         response.status(404).send({
//             success: false,
//             error: `No employee found with id ${day}`,
//         });
//         }
//     } catch (error) {
//             response.status(500).send({
//             success: false,
//             error: genericError,
//             });
//     }});
// //Get day
// app.get("/emails/:month", async function (request, response) {
//     const {month} = request.params;
//     try {
//         const [result] = await getEmployeeMonths(month);
//         if (result.length > 0) {
//         response.send({ success: true, result: result[0] });
//         } else {
//         response.status(404).send({
//             success: false,
//             error: `No employee found with id ${month}`,
//         });
//         }
//     } catch (error) {
//             response.status(500).send({
//             success: false,
//             error: genericError,
//             });
//     }});
// set port, listen for requests
// const PORT = process.env.BACK_PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
