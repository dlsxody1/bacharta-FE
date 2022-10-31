import { instance } from "./api";

export const getExchange = async () => {
  const { data } = await instance.get("/exchange");
  return data;
};
export const getCovid = async () => {
  const { data } = await instance.get("/covid");
  return data;
};
export const getCrime = async () => {
  const { data } = await instance.get("/crime");
  return data;
};
