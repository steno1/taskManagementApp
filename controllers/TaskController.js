const createTask=async(req, res)=>{
    res.send("task created now")
    }
    
    const updateTask=async(req, res)=>{
        res.send("task updated")
        }
    
     const deleteTask=async(req, res)=>{
     res.send("task deleted")
     }
    
    const getAllTask=async(req, res)=>{
        res.send("task updated")
             }
    
    const showTaskStat=async(req, res)=>{
     res.send("show task stat")
         }
    
    export {updateTask, createTask, deleteTask, showTaskStat, getAllTask}