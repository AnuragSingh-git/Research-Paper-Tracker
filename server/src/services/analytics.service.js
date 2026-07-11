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

  const papers = await Paper.find({
    owner: userId,
  }).select("readingStage");

  const counts = {
    "Abstract Read": 0,
    "Introduction Done": 0,
    "Methodology Done": 0,
    "Results Analyzed": 0,
    "Notes Completed": 0,
    "Fully Read": 0,
  };

  papers.forEach((paper) => {
    counts[paper.readingStage]++;
  });

  return [
    {
      stage: "Abstract Read",
      value:
        counts["Abstract Read"] +
        counts["Introduction Done"] +
        counts["Methodology Done"] +
        counts["Results Analyzed"] +
        counts["Notes Completed"] +
        counts["Fully Read"],
    },
    {
      stage: "Introduction Done",
      value:
        counts["Introduction Done"] +
        counts["Methodology Done"] +
        counts["Results Analyzed"] +
        counts["Notes Completed"] +
        counts["Fully Read"],
    },
    {
      stage: "Methodology Done",
      value:
        counts["Methodology Done"] +
        counts["Results Analyzed"] +
        counts["Notes Completed"] +
        counts["Fully Read"],
    },
    {
      stage: "Results Analyzed",
      value:
        counts["Results Analyzed"] +
        counts["Notes Completed"] +
        counts["Fully Read"],
    },
    {
      stage: "Notes Completed",
      value:
        counts["Notes Completed"] +
        counts["Fully Read"],
    },
    {
      stage: "Fully Read",
      value: counts["Fully Read"],
    },
  ];

};

export const scatterAnalytics = async (userId) => {

  const papers = await Paper.find({
    owner: userId,
  }).select(
    "title citationCount impactScore"
  );

  const impactY = {
    "Unknown": 1,
    "Low Impact": 2,
    "Medium Impact": 3,
    "High Impact": 4,
  };

  return papers.map(paper => ({
    title: paper.title,
    citationCount: Number(paper.citationCount),
    impactScore: paper.impactScore,
    y: impactY[paper.impactScore] || 1,
  }));
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

  const grouped = {};

  papers.forEach((paper) => {

    if (!grouped[paper.researchDomain]) {

      grouped[paper.researchDomain] = {
        domain: paper.researchDomain,
      };

      stages.forEach(stage => {
        grouped[paper.researchDomain][stage] = 0;
      });
    }

    grouped[paper.researchDomain][paper.readingStage]++;
  });

  return Object.values(grouped);
};

export const dashboardAnalytics = async (userId) => {

  const papers = await Paper.find({
    owner: userId,
  }).sort({
    createdAt: -1,
  });

  const totalPapers = papers.length;

  const fullyRead = papers.filter(
    paper => paper.readingStage === "Fully Read"
  ).length;

  const totalCitation = papers.reduce(
    (sum, paper) => sum + Number(paper.citationCount || 0),
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