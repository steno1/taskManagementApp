// Importing necessary action types

import {
  CLEAR_ALERT,
  CLEAR_VALUES,
  CREATE_TASK_BEGIN,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DISPLAY_ALERT,
  EDIT_TASK,
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
  // General state
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user:user? JSON.parse(user):null,
  token:token, 
  isEditing:false,
  editTaskId:"",
  // Task form state
  Title:"",
  Description:"",
  statusTypeOption:['In-Progress', 'Completed', 'Abandoned'],
  status:'In-Progress',
  priorityTypeOption:['High', 'Average', 'Low'],
  priority:"Average",
  // Sidebar state
  showSideBar:false,
  // Tasks data
  tasks:[],
  totalTasks:0,
  numOfPages:1,
  page:1,
};


// Creating the application context using React.createContext()
const AppContext = React.createContext();

// Provider component to manage the application state and actions
const AppProvider = ({ children }) => {
  // Using useReducer to manage the state with the specified reducer and initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Creating an instance of axios for API requests with the provided base URL
  const authFetch=axios.create({
    baseURL:"/api/v1",
  });

  // Add request interceptors for attaching the token to outgoing requests
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptors to handle unauthorized (401) responses
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
  )

  // Action to display an alert message
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // Action to add user details to localStorage
  const addUserToLocalStorage=({user, token})=>{
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token)
  }
  
  // Action to remove user details from localStorage
  const removeUserFromLocalStorage=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token")
  }

  // Action to register a new user
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
    } catch (error) {
      console.log(error.response)
      dispatch({type:REGISTER_USER_ERROR,
        payload:{
          msg:error.response.data.msg
        }})
    }
    clearAlert()
  }

  // Action to log in a user
  const loginUser=async(currentUser)=>{
    console.log(currentUser)
    dispatch({type:LOGIN_USER_BEGIN})
    try {
      const response=await axios.post("/api/v1/auth/login", currentUser)
      const {user, token}=response.data
      dispatch({type:LOGIN_USER_SUCCESS, 
        payload:{
          user, token
        }
      })
      addUserToLocalStorage({user, token});
      clearAlert();
    } catch (error) {
      dispatch({type:LOGIN_USER_ERROR,
        payload:{
          msg:error.response.data.msg
        }
      })
    }
    clearAlert();
  }

  // Action to clear the alert after a specified time
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // Action to toggle the sidebar
  const toggleSideBar=()=>{
    dispatch({type:TOGGLE_SIDEBAR})
  }

  // Action to log out the user
  const logoutUser=()=>{
    dispatch({type:LOGOUT_USER})
    removeUserFromLocalStorage();
  }

  // Action to update user details
  const userUpdate=async (currentUser)=>{ 
    dispatch({type:UPDATE_USER_BEGIN})
    try {
      const {data}=await authFetch.patch('/auth/update',currentUser)
      const {user, token}=data
      dispatch({type:UPDATE_USER_SUCCESS, 
        payload:{
          user, token
        }
      });
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

  // Action to handle form input changes
  const handleChanges=({name, value})=>{
    dispatch({type:HANDLE_CHANGE, payload:{
      name, value
    }})
  }

  // Action to clear form input values
  const clearValues=()=>{
    dispatch({type:CLEAR_VALUES})
  }

  // Action to create a new task
  const createTask=async()=>{
    dispatch({type:CREATE_TASK_BEGIN})
    try {
      const {Title, Description, status, priority}=state;
      await authFetch.post(`/tasks/createTask`, {
        Title,
         Description,
          status, 
          priority
      })
      dispatch({type:CREATE_TASK_SUCCESS})
      dispatch({type:CLEAR_VALUES})
    } catch (error) {
      if(error.response.status===401) return
      dispatch({type:CREATE_TASK_ERROR, payload:{
        msg:error.response.data.msg
      }})
    }
    clearAlert();
  }

  // Action to get all tasks
  const getAllTask=async()=>{
    let url=`/tasks/getAllTask`
    dispatch({type:GET_TASK_BEGIN})
    try {
      const {data}=await authFetch.get(url)
      const {tasks,totalTasks, numOfPages}=data
      dispatch({type:GET_TASK_SUCCESS, payload:{
        tasks, totalTasks,numOfPages
      }})
    } catch (error) {
      console.log(error.response)
      //logoutUser()
    }
    clearAlert();
  }

  // Action to set a task in edit mode
  const setEditTask=async(id)=>{
    dispatch({type:EDIT_TASK, payload:{
      id
    }});
  }

  // Action to edit a task
  const editTask=async()=>{
    console.log("edit task")
  }

  // Action to delete a task
  const deleteTask=(id)=>{
    console.log(`delete task : ${id}`)
  }

  // Return the context provider with the state and actions as values
  return (
    <AppContext.Provider value={{ ...state, displayAlert,
     clearAlert, registerUser, loginUser,
      toggleSideBar, logoutUser, 
      userUpdate, handleChanges, clearValues,
      createTask, getAllTask, setEditTask,
      deleteTask, editTask }}>
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
