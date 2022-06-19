import { useCallback, useReducer } from "react";
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
        error: action.value,
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
  const requestHandler = useCallback(async (requestFunction, requestData) => {
    dispatch({ type: PENDING });
    try {
      const responseData = await requestFunction(requestData);
      dispatch({ type: SUCCESS, value: responseData });

      return responseData;
    } catch (error) {
      const errorMessage = error ? error.message : "request is failed";
      dispatch({ type: ERROR, value: errorMessage });
    }
  }, []);

  return {
    requestHandler: requestHandler,
    error: state.error,
    status: state.status,
    data: state.data,
  };
};
export default useHttp;
