const CHANGE_STATUS = "CHANGE_STATUS";
const initialStatusState = {
  status: "",
  error: null,
};
export function changeStatus(status, error) {
  return {
    type: CHANGE_STATUS,
    data: { status, error },
  };
}

const statusReducer = (state = initialStatusState, action) => {
  console.log("incomiing  action ", action);
  switch (action?.type) {
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.data.status,
        error: action.data.error,
      };

    default:
      return state;
  }
};

export default statusReducer;
