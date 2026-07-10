import api from "./api";

export const getDashboard = () =>
    api.get("/analytics/dashboard");