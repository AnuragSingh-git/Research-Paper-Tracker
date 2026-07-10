import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import paperRoutes from "./routes/paper.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(

cors({

origin:process.env.CLIENT_URL,

credentials:true

})

);

app.use("/api/auth", authRoutes);

app.use("/api/papers", paperRoutes);

app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Research Paper Tracker API"
    });

});

app.use(errorHandler);

export default app;