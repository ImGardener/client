const CHANGE_STATUS = "CHANGE_STATUS";
const initialStatusState = {
  status: "",
  message: null,
};
export function changeStatus(status, messge = "") {
  return {
    type: CHANGE_STATUS,
    data: { status, messge },
  };
}

const statusReducer = (state = initialStatusState, action) => {
  switch (action?.type) {
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.data.status,
        message: action.data.error,
      };

    default:
      return state;
  }
};

export default statusReducer;
