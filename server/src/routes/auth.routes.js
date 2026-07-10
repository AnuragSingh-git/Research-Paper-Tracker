import express from "express";

import validate from "../middlewares/validate.middleware.js";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
} from "../controllers/auth.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate, registerUser);

router.post("/login", validate, loginUser);

router.post("/logout", verifyJWT, logoutUser);

router.post("/refresh-token", refreshAccessToken);

router.get("/me", verifyJWT, getCurrentUser);

export default router;