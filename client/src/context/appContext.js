
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
  SHOW_STAT_SUCCESS,
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

const initialState = {

  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user:user? JSON.parse(user):null,
  token:token, 
  isEditing:false,
  editTaskId:"",

  Title:"",
  Description:"",
  statusTypeOption:['InProgress', 'Completed', 'Abandoned'],
  status:'InProgress',
  priorityTypeOption:['High', 'Average', 'Low'],
  priority:"Average",
  search:"",
  searchStatus: "all",
  sort:"Latest",
  sortOptions:["Latest", "Oldest", "A-Z", "Z-A"],
  showSideBar:false,
  tasks:[],
  totalTasks:0,
  numOfPages:1,
  page:1,
  stat:[],
  monthlyApplication:[]
};


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
 
  const [state, dispatch] = useReducer(reducer, initialState);


  const authFetch=axios.create({
    baseURL:"/api/v1",
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

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

  const handleChanges=({name, value})=>{
    dispatch({type:HANDLE_CHANGE, payload:{
      name, value
    }})
  }

  const clearValues=()=>{
    dispatch({type:CLEAR_VALUES})
  }

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

  const getAllTask=async()=>{
 const {priority,search,searchStatus,sort,page}=state   
let url=`/tasks/getAllTask?page=${page}&status=${searchStatus}&priority=${priority}&sort=${sort}`
    if(search){
url=url+`&search=${search}`
    }
    
    dispatch({type:GET_TASK_BEGIN})
    try {
      const {data}=await authFetch.get(url)
      const {tasks,totalTasks, numOfPages}=data
      dispatch({type:GET_TASK_SUCCESS, payload:{
        tasks, totalTasks,numOfPages
      }})
    } catch (error) {
      logoutUser()
    }
    clearAlert();
  }

  const setEditTask=async(id)=>{
    dispatch({type:SET_EDIT_TASK, payload:{
      id
    }});
  }

  const editTask=async()=>{
    dispatch({type:EDIT_TASK_BEGIN});
   
    try {
      const {Title, Description, status, priority}=state;
      await authFetch.patch(`tasks/${state.editTaskId}`,{
        Title,
        Description, 
        status,
         priority
      })
      dispatch({type:EDIT_TASK_SUCCESS})
      dispatch({type:CLEAR_VALUES})
    } catch (error) {
      if(error.response.status===401)return
      dispatch({type:EDIT_TASK_ERROR,payload:{
        payload:{msg:error.response.data.msg}
      }})
    }
    clearAlert();
  }

 const deleteTask = async (jobId) => {
  dispatch({ type: DELETE_TASK_BEGIN });
  try {
    await authFetch.delete(`tasks/${jobId}`);
    getAllTask(); // Refresh the task list after deletion
  } catch (error) {
    logoutUser();
  }
  }
  const showStat=async()=>{
dispatch({type:SHOW_STAT_BEGIN});
try {
  const {data}=await authFetch.get(`tasks/stat`)
  dispatch({type:SHOW_STAT_SUCCESS, payload:{
    stat:data.defaultStats,
    monthlyApplication:data.monthlyApplication
  }})
} catch (error) {
  logoutUser();
}
clearAlert()
  }

  const clearFilters=()=>{
    dispatch({type:CLEAR_FILTERS})
  }

  const changePage=(page)=>{
    dispatch({type:CHANGE_PAGE,payload:{page}
  }
    )
  }

  return (
    <AppContext.Provider value={{ ...state, displayAlert,
     clearAlert, registerUser, loginUser, clearFilters,
      toggleSideBar, logoutUser, 
      userUpdate, handleChanges, clearValues,
      createTask, getAllTask, setEditTask,
      deleteTask, editTask, showStat, changePage }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
