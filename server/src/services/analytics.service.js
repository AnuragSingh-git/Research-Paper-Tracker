import mongoose from "mongoose";
import Paper from "../models/Paper.js";

export const summaryAnalytics = async (userId) => {

  const totalPapers = await Paper.countDocuments({
    owner: userId,
  });

  const fullyRead = await Paper.countDocuments({
    owner: userId,
    readingStage: "Fully Read",
  });

  const stageSummary = await Paper.aggregate([

    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $group: {
        _id: "$readingStage",
        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },

  ]);

  const averageCitation = await Paper.aggregate([

    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $group: {
        _id: "$researchDomain",
        averageCitation: {
          $avg: "$citationCount",
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },

  ]);

  return {

    stageSummary,

    averageCitation,

    completionRate:
      totalPapers === 0
        ? 0
        : Number(((fullyRead / totalPapers) * 100).toFixed(2)),

  };

};

export const funnelAnalytics = async (userId) => {

  return await Paper.aggregate([

    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $group: {
        _id: "$readingStage",
        count: {
          $sum: 1,
        },
      },
    },

    {
      $project: {
        _id: 0,
        readingStage: "$_id",
        count: 1,
      },
    },

  ]);

};

export const scatterAnalytics = async (userId) => {

  return await Paper.find({

    owner: userId,

  }).select(

    "title citationCount impactScore"

  );

};

export const domainStageAnalytics = async (userId) => {

  const papers = await Paper.find({

    owner: userId,

  }).select("researchDomain readingStage");

  const stages = [

    "Abstract Read",

    "Introduction Done",

    "Methodology Done",

    "Results Analyzed",

    "Fully Read",

    "Notes Completed",

  ];

  const result = {};

  papers.forEach((paper) => {

    if (!result[paper.researchDomain]) {

      result[paper.researchDomain] = {

        _id: paper.researchDomain,

      };

      stages.forEach((stage) => {

        result[paper.researchDomain][stage] = 0;

      });

    }

    result[paper.researchDomain][paper.readingStage]++;

  });

  return Object.values(result);

};

export const dashboardAnalytics = async (userId) => {

  const papers = await Paper.find({

    owner: userId,

  }).sort({

    createdAt: -1,

  });

  const totalPapers = papers.length;

  const fullyRead = papers.filter(

    (paper) => paper.readingStage === "Fully Read"

  ).length;

  const totalCitation = papers.reduce(

    (sum, paper) =>

      sum + Number(paper.citationCount || 0),

    0

  );

  const averageCitation =

    totalPapers > 0

      ? Number((totalCitation / totalPapers).toFixed(1))

      : 0;

  const completionRate =

    totalPapers > 0

      ? Number(((fullyRead / totalPapers) * 100).toFixed(1))

      : 0;

  const recentPapers = papers.slice(0, 5);

  return {

    totalPapers,

    fullyRead,

    averageCitation,

    completionRate,

    recentPapers,

  };

};