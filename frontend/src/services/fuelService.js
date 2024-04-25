import axios from "axios";

export const getAll = async () => {
  const { data } = await axios.get("/api/fuels");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/fuels/search/" + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("/api/fuels/tags");
  return data;
};

export const getAllByTag = async (tag) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("/api/fuels/tag/" + tag);
  return data;
};

export const getById = async (fuelId) => {
  const { data } = await axios.get("/api/fuels/" + fuelId);
  return data;
};
