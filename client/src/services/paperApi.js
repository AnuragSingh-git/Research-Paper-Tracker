import api from "./api";

export const getPapers = (filters = {}) =>
  api.get("/papers", {
    params: filters,
  });

export const addPaper = (data) =>
  api.post("/papers", data);

export const updatePaper = (id, data) =>
  api.patch(`/papers/${id}`, data);

export const deletePaper = (id) =>
  api.delete(`/papers/${id}`);

export const getPaper = (id) =>
  api.get(`/papers/${id}`);