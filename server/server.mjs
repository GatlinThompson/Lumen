import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();

// Web Server
const app = express();
const PORT = process.env.PORT || "8080";
const backendURI = `mongodb+srv://mongoDBConnector:tn1gRXgaJeyQmvVW@lumenbackend.ldzcf.mongodb.net/?retryWrites=true&w=majority&appName=lumenBackend`;

// Mongoose and DB Connect
await mongoose.connect(backendURI);

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://lumen-ctt.netlify.app"
      : "http://127.0.0.1:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
import { configureRoutes } from "./config/routes.mjs";
configureRoutes(app);

// Create Web Server
let server = http.createServer(app);
server.listen(PORT);

app.use("/", function (req, res, next) {
  console.log(req.url);
  next();
});

server.on("listening", () => {
  console.log(
    `\n\x1b[1mLocal Backend:\x1b\[0m\t\x1b[34mhttp://localhost:${PORT}\x1b[39m`
  );
  console.log(`\x1b[30mListening on Port: ${PORT}\x1b[39m\n`);
});
