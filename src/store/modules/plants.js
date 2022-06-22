import { getVarietyList } from "../../utils/search-apis";
import { getBookmarkList } from "../../utils/bookmark-apis";

const GET_PLANTS_REQUEST = "search/get_plants_request";
const GET_PLANTS = "search/get_plants";
const GET_PLANTS_ERROR = "search/get_plants_error";

const initialSearchState = {
  plants: [],
  loading: false,
  error: null,
};
export const getPlants = (plants) => {
  return {
    type: GET_PLANTS,
    value: plants,
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
    value: error || "request is failed",
  };
};

const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case GET_PLANTS_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_PLANTS: {
      return { ...state, plants: action.value, loading: false };
    }
    case GET_PLANTS_ERROR: {
      return { ...state, plants: null, loading: false, error: action.value };
    }
    default:
      return state;
  }
};

export default searchReducer;

export const searchThunk = (requestConfig) => {
  return async (dispatch, state) => {
    try {
      dispatch(getPlantsRequest());
      const result = await getVarietyList(requestConfig);

      dispatch(getPlants(result));
    } catch (error) {
      dispatch(getPlantError(error?.message));
    }
  };
};
export const searchThunkWithBookmark = (requestConfig, token) => {
  return async (dispatch, state) => {
    try {
      dispatch(getPlantsRequest());
      const [plants, bookmarkList] = await Promise.all([
        getVarietyList(requestConfig),
        getBookmarkList(token),
      ]);

      if (bookmarkList.length && plants.length) {
        checkBookmarkOfPlant(bookmarkList, plants);
      }

      dispatch(getPlants(plants));
    } catch (error) {
      dispatch(getPlantError(error?.message));
    }
  };
};

function checkBookmarkOfPlant(bookmarkList, plants) {
  plants = plants.forEach((plant) => {
    let findIdx = bookmarkList.findIndex((bookmark) => {
      return plant.id === bookmark.plantId;
    });
    if (findIdx !== -1) {
      plant.bookmarkId = bookmarkList[findIdx].bookmarkId;
    }
  });
}
