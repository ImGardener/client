const CHANGE_STATUS = "CHANGE_STATUS";
const initialStatusState = {
  status: "",
  message: null,
};
export function changeStatus(status, message = "") {
  return {
    type: CHANGE_STATUS,
    data: { status, message },
  };
}

const statusReducer = (state = initialStatusState, action) => {
  switch (action?.type) {
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.data.status,
        message: action.data.message,
      };

    default:
      return state;
  }
};

export default statusReducer;
