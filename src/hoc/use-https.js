import { useCallback, useReducer, useState } from "react";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";
const PENDING = "PENDING";

// http request hook
const useHttp = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const requestHandler = useCallback(async (requestFunction, requestData) => {
    setStatus(PENDING);
    setError(null);
    setData(null);

    try {
      const responseData = await requestFunction(requestData);
      setStatus(SUCCESS);
      setData(responseData);
      return responseData;
    } catch (error) {
      setStatus(ERROR);
      const errorMessage = error ? error.message : "request is failed";
      setError(errorMessage);
    }
  }, []);

  return {
    requestHandler: requestHandler,
    error: error,
    status: status,
    data: data,
  };
};
export default useHttp;
