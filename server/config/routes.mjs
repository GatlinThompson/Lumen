import express from "express";

// Define Router
let router = express.Router();

export function configureRoutes(app) {
  app.use("/", router);
}
