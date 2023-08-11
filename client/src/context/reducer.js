// Importing necessary action types

import {
  CHANGE_PAGE,
  CLEAR_ALERT,
  CLEAR_FILTERS,
  CLEAR_VALUES,
  CREATE_TASK_BEGIN,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_BEGIN,
  DISPLAY_ALERT,
  EDIT_TASK_BEGIN,
  EDIT_TASK_ERROR,
  EDIT_TASK_SUCCESS,
  GET_TASK_BEGIN,
  GET_TASK_SUCCESS,
  HANDLE_CHANGE,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  SET_EDIT_TASK,
  SHOW_STAT_BEGIN,
  SHOW_STAT_ERROR,
  SHOW_STAT_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
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

  // Handling the action to begin user registration
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  // Handling the action when user registration is successful
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User created! Redirecting...",
    };
  }

  // Handling the action when user registration fails
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // Handling the action to begin user login
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  // Handling the action when user login is successful
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Successfully logged in...",
    };
  }

  // Handling the action when user login fails
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // Handling the action to toggle the sidebar
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar,
    };
  }

  // Handling the action to log out the user
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }

  // Handling the action to begin updating user details
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  // Handling the action when user details update is successful
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "User profile successfully updated...",
    };
  }

  // Handling the action when user details update fails
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // Handling the action to handle form input changes
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page:1,
      [action.payload.name]: action.payload.value,
    };
  }

  // Handling the action to clear form input values
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editTaskId: "",
      Title: "",
      Description: "",
    };
    return {
      ...state,
      ...initialState,
    };
  }

  // Handling the action to begin creating a new task
  if (action.type === CREATE_TASK_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  // Handling the action when a new task is successfully created
  if (action.type === CREATE_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New task created...",
    };
  }

  // Handling the action when task creation fails
  if (action.type === CREATE_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  // Handling the action to begin fetching all tasks
  if (action.type === GET_TASK_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }

  // Handling the action when fetching all tasks is successful
  if (action.type === GET_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      tasks: action.payload.tasks,
      totalTasks: action.payload.totalTasks,
      numOfPages: action.payload.numOfPages,
    };
  }

  // Handling the action to set a task in edit mode
  if (action.type ===SET_EDIT_TASK) {
    const task = state.tasks.find((task) => task._id === action.payload.id);
    const { _id, Title, Description, priority, status } = task;
    return {
      ...state,
      isEditing: true,
      editTaskId: _id,
      Title,
      Description,
      priority,
      status,
    };
  }
  if(action.type===DELETE_TASK_BEGIN){
return {
...state,
isLoading:true
}
  }

  if (action.type === EDIT_TASK_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_TASK_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Task successfully updated...",
    };
  }

  if (action.type === EDIT_TASK_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_STAT_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert:false
    };
  }

  if (action.type === SHOW_STAT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
  stat:action.payload.stat,
  monthlyApplication:action.payload.monthlyApplication
      
    };
  }

  if (action.type === SHOW_STAT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
     
      alertText: action.payload.msg,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      priority:"Average",
      search:"",
      searchStatus: "all",
      sort:"Latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
     page:action.payload.page
    };
  }
  
  // Throwing an error for an unknown action type
  throw new Error(`No such action: ${action.type}`);
};

// Exporting the reducer function as the default export
export default reducer;
