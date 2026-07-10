import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    summaryAnalytics,
    funnelAnalytics,
    scatterAnalytics,
    domainStageAnalytics,
    dashboardAnalytics
} from "../services/analytics.service.js";

export const getDashboard = asyncHandler(async (req, res) => {

    const data = await dashboardAnalytics(req.user._id);

    res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Dashboard Loaded Successfully"
        )
    );

});

export const getSummary = asyncHandler(async (req, res) => {

    const data = await summaryAnalytics(req.user._id);

    res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Summary Analytics"
        )
    );

});

export const getFunnel = asyncHandler(async (req, res) => {

    const data = await funnelAnalytics(req.user._id);

    res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Funnel Analytics"
        )
    );

});

export const getScatter = asyncHandler(async (req, res) => {

    const data = await scatterAnalytics(req.user._id);

    res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Scatter Analytics"
        )
    );

});

export const getDomainStage = asyncHandler(async (req, res) => {

    const data = await domainStageAnalytics(req.user._id);

    res.status(200).json(
        new ApiResponse(
            200,
            data,
            "Domain Stage Analytics"
        )
    );

});