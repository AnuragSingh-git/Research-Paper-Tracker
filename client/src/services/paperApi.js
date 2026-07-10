import api from "./api";

export const getPapers = (params) =>
  api.get("/papers", { params });

export const addPaper = (data) =>
  api.post("/papers", data);

export const updatePaper = (id, data) =>
  api.patch(`/papers/${id}`, data);

export const deletePaper = (id) =>
  api.delete(`/papers/${id}`);