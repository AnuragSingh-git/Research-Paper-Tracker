import express from "express";

import validate from "../middlewares/validate.middleware.js";

import verifyJWT from "../middlewares/auth.middleware.js";

import {
    createPaper,
    getAllPapers,
    getPaperById,
    updatePaper,
    deletePaper
} from "../controllers/paper.controller.js";

const router = express.Router();

router.use(verifyJWT);

router.route("/")
.post(validate,createPaper)
.get(getAllPapers);

router.route("/:id")
.get(getPaperById)
.patch(validate,updatePaper)
.delete(deletePaper);

export default router;