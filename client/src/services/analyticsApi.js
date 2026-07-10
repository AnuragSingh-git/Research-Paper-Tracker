import api from "./api";

export const getSummary = () =>
    api.get("/analytics/summary");

export const getFunnel = () =>
    api.get("/analytics/funnel");

export const getScatter = () =>
    api.get("/analytics/scatter");

export const getDomainStage = () =>
    api.get("/analytics/domain-stage");