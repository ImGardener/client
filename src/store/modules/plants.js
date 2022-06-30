import { getVarietyList } from "../../utils/search-apis";
import { getCollectionList } from "../../utils/collection-apis";
import { getCollection } from "../actions/collections";
import {
  getPlantError,
  getPlants,
  getPlantsRequest,
  GET_PLANTS,
  GET_PLANTS_ERROR,
  GET_PLANTS_REQUEST,
  RESET_PLANTS,
} from "../actions/plants";

const initialSearchState = {
  plants: [],
  totalCount: 0,
  loading: false,
  error: null,
};

const searchReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case GET_PLANTS_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_PLANTS: {
      return {
        ...state,
        plants: action.payload.plants,
        totalCount: action.payload.totalCount,
        loading: false,
      };
    }
    case GET_PLANTS_ERROR: {
      return {
        ...state,
        plants: null,
        totalCount: 0,
        loading: false,
        error: action.payload,
      };
    }
    case RESET_PLANTS: {
      return initialSearchState;
    }
    default:
      return state;
  }
};

export default searchReducer;

// searchList 초기검색용
export const searchThunk = (requestConfig) => {
  return async (dispatch, state) => {
    try {
      let searchResult;

      dispatch(getPlantsRequest());
      if (!state().auth.token) {
        searchResult = await getVarietyList(requestConfig);
      } else {
        let result = addCollection(
          await Promise.all([
            getVarietyList(requestConfig),
            await getCollectionList(),
          ])
        );
        dispatch(getCollection({ collections: result.collectionList }));
        searchResult = result.plantsInfo;
      }

      dispatch(getPlants({ ...searchResult }));
    } catch (error) {
      dispatch(getPlantError(error?.message));
    }
  };
};

// searchList 추가 로드
export const getMoreSearchThunk = (requestConfig) => {
  return async (dispatch, state) => {
    try {
      dispatch(getPlantsRequest());

      const searchResult = await getVarietyList(requestConfig);

      if (
        state().collections.collections &&
        state().collections.collections.length
      ) {
        addCollection([searchResult, state().collections.collections]);
      }
      const prevPlants = state().plants.plants;
      dispatch(
        getPlants({
          plants: [...prevPlants, ...searchResult.plants],
          totalCount: searchResult.totalCount,
        })
      );
    } catch (error) {
      dispatch(getPlantError(error?.message));
    }
  };
};

// add collection to plantsInfo
function addCollection([plantsInfo, collectionList]) {
  const plants = plantsInfo.plants;
  if (!plants || plants.length === 0) {
    return { plantsInfo, collectionList };
  }
  plants.forEach((plant) => {
    let findIdx = collectionList.findIndex((collection) => {
      return plant.plantId === collection.plantId;
    });
    if (findIdx !== -1) {
      plant.collectionId = collectionList[findIdx].collectionId;
    }
  });
  return { plantsInfo, collectionList };
}
