import express from "express";
import { User } from "../models/user.mjs";
import { Role } from "../models/role.mjs";
import { createUser } from "../controllers/users.mjs";

// Define Router
let router = express.Router();

export const configureRoutes = (app) => {
  app.get("/api/createUser", createUser);
};
