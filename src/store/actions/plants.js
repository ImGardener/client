import { DEFAULT_ERROR } from "../../utils/errorCase";

// plansts
export const GET_PLANTS_REQUEST = "plants/get_plants_request";
export const GET_PLANTS = "plants/get_plants";
export const GET_PLANTS_ERROR = "plants/get_plants_error";
export const RESET_PLANTS = "plants/reset_plants";

export const getPlants = (payload) => {
  return {
    type: GET_PLANTS,
    payload,
  };
};

export const getPlantsRequest = () => {
  return {
    type: GET_PLANTS_REQUEST,
  };
};
export const getPlantError = (error) => {
  return {
    type: GET_PLANTS_ERROR,
    payload: error || DEFAULT_ERROR,
  };
};

export const resetPlants = () => {
  return {
    type: RESET_PLANTS,
  };
};
