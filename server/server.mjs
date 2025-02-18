import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";

dotenv.config();

// Web Server
const app = express();
const PORT = process.env.PORT || "8080";

// Mongoose and DB Connect
mongoose.connect("mongodb://127.0.0.1:27017/usertest"); // local db

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
import { configureRoutes } from "./config/routes.mjs";
configureRoutes(app);

// Create Web Server
let server = http.createServer(app);
server.listen(PORT);

server.on("listening", () => {
  console.log("Listening on PORT: " + PORT);
});
