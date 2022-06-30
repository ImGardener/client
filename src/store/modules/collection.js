import { getCollectionList } from "../../utils/collection-apis";

import {
  errorCollection,
  requestCollection,
  getCollection,
  GET_COLLECTIONS,
  ADD_COLLECTION,
  DELETE_COLLECTION,
  ERROR_COLLECTION,
  REQUEST_COLLECTIONS,
} from "../actions/collections";

const initialSearchState = {
  collections: [],
  totalCount: 0,
  loading: false,
  error: null,
};

const collectionReducer = (state = initialSearchState, action) => {
  switch (action.type) {
    case GET_COLLECTIONS: {
      return {
        ...state,
        collections: action.payload.collections,
        totalCount: action.payload.totalCount,
        loading: false,
      };
    }
    case ADD_COLLECTION: {
      let newCollection = {
        ...state.collections,
        [action.payload.collectionId]: action.payload.collection,
      };
      return { ...state, collections: newCollection, loading: false };
    }
    case DELETE_COLLECTION: {
      let newCollection = {};
      for (let key of Object.keys(state.collections)) {
        if (key !== action.payload.collectionId)
          newCollection[key] = state.collections[key];
      }

      return { ...state, collections: newCollection, loading: false };
    }
    case REQUEST_COLLECTIONS: {
      return { ...state, loading: true };
    }

    case ERROR_COLLECTION: {
      return { ...state, plants: null, loading: false, error: action.payload };
    }
    default:
      return state;
  }
};

export default collectionReducer;

// collection 목록조회
export const getCollectionThunk = () => {
  return async (dispatch, state) => {
    try {
      dispatch(requestCollection());
      const collections = await getCollectionList();

      dispatch(getCollection({ collections }));
    } catch (error) {
      dispatch(errorCollection());
    }
  };
};
