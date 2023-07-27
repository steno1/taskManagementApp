// Importing necessary dependencies and files

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
import React, { useContext, useReducer } from "react";

import axios from "axios";
import reducer from "./reducer";

const token=localStorage.getItem("token")
const user=localStorage.getItem("user")

// Initial state for the application context
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user:user? JSON.parse(user):null,
  token:token, 
  showSideBar:false
};


// Creating the application context using React.createContext()
const AppContext = React.createContext();

// Provider component to manage the application state and actions
const AppProvider = ({ children }) => {
  // Using useReducer to manage the state with the specified reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

//axios
const authFetch=axios.create({
  baseURL:"/api/v1",
  
})
//N/B from axios documentation
// Add a request interceptor
authFetch.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${state.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response)
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error);
  }
);


  // Action to display an alert message
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const addUserToLocalStorage=({user, token})=>{
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token)
  
  }
  
  const removeUserFromLocalStorage=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token")
  }

  const registerUser=async (currentUser)=>{
dispatch({type:REGISTER_USER_BEGIN})
try {
  const response=await axios.post("/api/v1/auth/register", currentUser)
  console.log(response)
  const {user, token}=response.data
  dispatch({
    type:REGISTER_USER_SUCCESS,
    payload:{
      user,
       token
    }
    
  })
  addUserToLocalStorage({user, token});
  clearAlert();
} catch (error) {
  console.log(error.response)
  dispatch({type:REGISTER_USER_ERROR,
  payload:{
    msg:error.response.data.msg
  }})
}
clearAlert()
  }

  const loginUser=async(currentUser)=>{
    console.log(currentUser)
dispatch({type:LOGIN_USER_BEGIN})
try {
  const response=await axios.post("/api/v1/auth/login", currentUser)
const {user, token}=response.data
dispatch({type:LOGIN_USER_SUCCESS, 
payload:{
  user, token
}})
addUserToLocalStorage({user, token});
  clearAlert();
} catch (error) {
  dispatch({type:LOGIN_USER_ERROR,
  payload:{
    msg:error.response.data.msg
  }})
}
clearAlert();
  }

  // Action to clear the alert after a specified time
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const toggleSideBar=()=>{
    dispatch({type:TOGGLE_SIDEBAR})
  }
  const logoutUser=()=>{
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage();
  }

  const userUpdate=async (currentUser)=>{ 
    dispatch({type:UPDATE_USER_BEGIN})
    try {
      const {data}=await authFetch.patch('/auth/update',currentUser)
      const {user, token}=data
      dispatch({type:UPDATE_USER_SUCCESS, 
      payload:{
        user, token
      },} );
      addUserToLocalStorage({user, token});
    } catch (error) {
     if(error.response.status !==401){
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        });
      
    }
  }
    clearAlert()
  }

  // Providing the state and actions to the child components through the context
  return (
    <AppContext.Provider value={{ ...state, displayAlert,
     clearAlert, registerUser, loginUser,
      toggleSideBar, logoutUser, userUpdate }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to conveniently access the application context
const useAppContext = () => {
  return useContext(AppContext);
};

// Exporting the necessary components and hooks
export { AppProvider, initialState, useAppContext };
