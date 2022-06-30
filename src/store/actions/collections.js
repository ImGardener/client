// collections
export const ADD_COLLECTION = "collections/add_collection";
export const DELETE_COLLECTION = "collections/delete_collection";
export const GET_COLLECTIONS = "collections/get_collections";
export const REQUEST_COLLECTIONS = "collections/request_collections";
export const ERROR_COLLECTION = "collections/error_collection";

export const addCollection = (payload) => {
  return {
    type: ADD_COLLECTION,
    payload,
  };
};

export const getCollection = (payload) => {
  return {
    type: GET_COLLECTIONS,
    payload,
  };
};
export const deleteCollection = (payload) => {
  return {
    type: DELETE_COLLECTION,
    payload,
  };
};
export const requestCollection = (error) => {
  return {
    type: REQUEST_COLLECTIONS,
    payload: error || DELETE_COLLECTION,
  };
};

export const errorCollection = () => {
  return {
    type: ERROR_COLLECTION,
  };
};
