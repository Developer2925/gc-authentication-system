import express from "express";
import cors from "cors";
import "dotenv/config.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is up and running!`));
