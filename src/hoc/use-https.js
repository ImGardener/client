import { useReducer, useState } from "react";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const PENDING = "PENDING";

// reducer initial state
const initialState = { status: "", error: null, data: null };

// reducer
const httpRequestReducer = (state, action) => {
  switch (action.type) {
    case PENDING:
      return {
        data: null,
        error: null,
        status: PENDING,
      };
    case SUCCESS:
      return {
        data: action.value,
        error: null,
        status: SUCCESS,
      };
    case ERROR:
      return {
        data: null,
        error: action.value.error,
        status: ERROR,
      };
    default:
      return state;
  }
};

// http request hook
const useHttp = () => {
  const [state, dispatch] = useReducer(httpRequestReducer, initialState);

  // http request function
  const requestHandler = async (requestFunction, requestData) => {
    dispatch({ type: PENDING });
    try {
      const responseData = await requestFunction(requestData);

      // //if fail, throw error
      // if (!response.ok) {
      //   throw new Error(data?.message);
      // }
      //if success, update state status to SUCCESS and data
      dispatch({ type: SUCCESS, value: responseData });
      return responseData;
    } catch (error) {
      const errorMessage = error ? error : "request is failed";
      dispatch({ type: ERROR, value: errorMessage });
    }
  };

  return {
    requestHandler: requestHandler,
    error: state.error,
    status: state.status,
    data: state.data,
  };
};
export default useHttp;
