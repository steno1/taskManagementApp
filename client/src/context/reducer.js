// Importing necessary action types

import {
CLEAR_ALERT,
DISPLAY_ALERT,
REGISTER_USER_BEGIN,
REGISTER_USER_ERROR,
REGISTER_USER_SUCCESS
} from "./action";

// Reducer function to manage the state based on different actions
const reducer = (state, action) => {
  // Handling the action to display an alert
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }
  
  // Handling the action to clear the alert
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading:true
     
    };
  }
  if (action.type ===REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user:action.payload.user,
      token:action.payload.token,
      isLoading:false,
      showAlert: true,
      alertType: "success",
      alertText: "user created! Redirecting...",
    };
  }

  if (action.type ===REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading:false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  
  // Throwing an error for an unknown action type
  throw new Error(`No such action: ${action.type}`);
};

// Exporting the reducer function as the default export
export default reducer;
