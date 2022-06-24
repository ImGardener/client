import { getVarietyList } from "../../utils/search-apis";
import { getBookmarkList } from "../../utils/bookmark-apis";
import { DEFAULT_ERROR } from "../../utils/errorCase";

const GET_PLANTS_REQUEST = "plants/get_plants_request";
const GET_PLANTS = "plants/get_plants";
const GET_PLANTS_ERROR = "plants/get_plants_error";
const RESET_PLANTS = "plants/reset_plants";

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
    value: error || DEFAULT_ERROR,
  };
};

export const resetPlants = () => {
  return {
    type: RESET_PLANTS,
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
    case RESET_PLANTS: {
      return initialSearchState;
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
export const searchThunkWithBookmark = (requestConfig) => {
  return async (dispatch, state) => {
    try {
      dispatch(getPlantsRequest());
      const [plants, bookmarkList] = await Promise.all([
        getVarietyList(requestConfig),
        getBookmarkList(),
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
  plants.forEach((plant) => {
    let findIdx = bookmarkList.findIndex((bookmark) => {
      return plant.plantId === bookmark.plantId;
    });
    if (findIdx !== -1) {
      plant.bookmarkId = bookmarkList[findIdx].bookmarkId;
    }
  });
}
