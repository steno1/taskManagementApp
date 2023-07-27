// Importing necessary action types

import {
CLEAR_ALERT,
DISPLAY_ALERT,
LOGIN_USER_BEGIN,
LOGIN_USER_ERROR,
LOGIN_USER_SUCCESS,
LOGOUT_USER,
REGISTER_USER_BEGIN,
REGISTER_USER_ERROR,
REGISTER_USER_SUCCESS,
TOGGLE_SIDEBAR,
UPDATE_USER_BEGIN,
UPDATE_USER_ERROR,
UPDATE_USER_SUCCESS
} from "./action";

import { initialState } from "./appContext";

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

  if (action.type ===LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading:true,
     
    };
  }
  if (action.type ===LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user:action.payload.user,
      token:action.payload.token,
      isLoading:false,
      showAlert: true,
      alertType: "success",
      alertText: "successfully logged in...",
    };
  }

  if (action.type ===LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading:false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type ===TOGGLE_SIDEBAR) {
    return {
      ...state,
     showSideBar:!state.showSideBar
    };
  }
  if (action.type ===LOGOUT_USER) {
    return {
      ...initialState,
     user:null,
     token:null
    };
  }

  if (action.type ===UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading:true,
     
    };
  }
  if (action.type ===UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user:action.payload.user,
      token:action.payload.token,
      isLoading:false,
      showAlert: true,
      alertType: "success",
      alertText: "User profile successfully updated...",
    };
  }

  if (action.type ===UPDATE_USER_ERROR) {
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
