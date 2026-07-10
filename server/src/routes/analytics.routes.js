import express from "express";

import verifyJWT from "../middlewares/auth.middleware.js";

import {
    getSummary,
    getFunnel,
    getScatter,
    getDomainStage
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/summary", getSummary);

router.get("/funnel", getFunnel);

router.get("/scatter", getScatter);

router.get("/domain-stage", getDomainStage);

export default router;