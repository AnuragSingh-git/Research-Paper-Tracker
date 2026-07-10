import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

import ApiError from "../utils/ApiError.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/generateTokens.js";

import {
    accessCookieOptions,
    refreshCookieOptions
} from "../utils/cookieOptions.js";

import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

        throw new ApiError(400, "All fields are required");

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

        throw new ApiError(409, "User already exists");

    }

    const user = await User.create({

        name,

        email,

        password

    });

    return res.status(201).json(

        new ApiResponse(

            201,

            user,

            "User Registered Successfully"

        )

    );

});

export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

        throw new ApiError(404, "User not found");

    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {

        throw new ApiError(401, "Invalid Credentials");

    }

    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;

    await user.save();

    res
        .status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .json(

            new ApiResponse(

                200,

                {

                    user

                },

                "Login Successful"

            )

        );

});

export const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(

        req.user._id,

        {

            refreshToken: null

        }

    );

    res

        .clearCookie("accessToken")

        .clearCookie("refreshToken")

        .json(

            new ApiResponse(

                200,

                null,

                "Logout Successful"

            )

        );

});

export const refreshAccessToken = asyncHandler(async (req, res) => {

    const token = req.cookies.refreshToken;

    if (!token) {

        throw new ApiError(401, "Refresh Token Missing");

    }

    const decoded = jwt.verify(

        token,

        process.env.REFRESH_TOKEN_SECRET

    );

    const user = await User.findById(decoded.id);

    if (!user) {

        throw new ApiError(404, "User Not Found");

    }

    if (token !== user.refreshToken) {

        throw new ApiError(401, "Invalid Refresh Token");

    }

    const accessToken = generateAccessToken(user._id);

    res

        .cookie(

            "accessToken",

            accessToken,

            accessCookieOptions

        )

        .json(

            new ApiResponse(

                200,

                null,

                "Token Refreshed"

            )

        );

});

export const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

        .select("-password -refreshToken");

    res.status(200).json(

        new ApiResponse(

            200,

            user

        )

    );

});