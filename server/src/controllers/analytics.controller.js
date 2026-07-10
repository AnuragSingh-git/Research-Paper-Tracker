import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";

import {

summaryAnalytics,

funnelAnalytics,

scatterAnalytics,

domainStageAnalytics

} from "../services/analytics.service.js";

export const getSummary = asyncHandler(async(req,res)=>{

const data=await summaryAnalytics(req.user._id);

res.json(new ApiResponse(200,data));

});

export const getFunnel = asyncHandler(async(req,res)=>{

const data=await funnelAnalytics(req.user._id);

res.json(new ApiResponse(200,data));

});

export const getScatter = asyncHandler(async(req,res)=>{

const data=await scatterAnalytics(req.user._id);

res.json(new ApiResponse(200,data));

});

export const getDomainStage = asyncHandler(async(req,res)=>{

const data=await domainStageAnalytics(req.user._id);

res.json(new ApiResponse(200,data));

});