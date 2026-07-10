import jwt from "jsonwebtoken";

import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, res, next) => {

    const token = req.cookies.accessToken;

    if (!token) {

        throw new ApiError(

            401,

            "Unauthorized"

        );

    }

    const decoded = jwt.verify(

        token,

        process.env.ACCESS_TOKEN_SECRET

    );

    const user = await User.findById(decoded.id)

        .select("-password -refreshToken");

    req.user = user;

    next();

});

export default verifyJWT;