import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/users.js";

// setup instances
const app = express();

// setup middlewares
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173", // default url of React app(bootstraped with vite)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// initialize global variables
const PORT = process.send.PORT || 4000; // adding alternatives only for development purpose
const MONGO_URI = process.send.MONGO_URI || "mongodb://127.0.0.1:27017/users"; // adding alternatives only for development purpose

// connect with DB
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err.message));

// listening app
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

// setup routes
app.use("/api/users", router);
