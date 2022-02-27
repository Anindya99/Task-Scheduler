import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Addbutton from './components/Addbutton';
import Tasks from './components/Tasks'
import { useState,useEffect ,useRef} from "react";
import AddTask from './components/AddTask';
import ModalForm from './components/ModalForm';
//import Login from './components/login/Login';
//import Register from './components/login/Register';
//BrowserRouter, Route, Routes,
//import { Link } from "react-router-dom";
import AuthStore from './middleware/AuthStore'
//import decode from 'jwt-decode';
//import  Cover from './components/Cover';
import CssBaseline from "@mui/material/CssBaseline";
import  Snackbars from './components/Snackbars';
import Axios from 'axios';

//#283593
//#1e88e5

const Dashboard = () => {

  const title="Task Scheduler"
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks,setTasks]=useState([])
  const [tasktoform,settasktoform]= useState({})
  const [bool_tasktoform,bool_settasktoform]=useState(false)
  const[bool_didMount,bool_setdidMount]=useState(true)
  const [currUser,setUser]=useState([])
  const [snackopen,setsnack]=useState(false)
  const [snackmsg,setsnackmsg]=useState('')
  const token = localStorage.getItem("jwtToken")

  const listRef = useRef();
  //const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const getListSize = () => {
    const newHeight = listRef.current.clientHeight;
    setHeight(newHeight);
    //console.log(newHeight)
  };
  useEffect(() => {
    getListSize();
  }, [tasks]);
  useEffect(() => {
    window.addEventListener("resize", getListSize);
  }, []);

  useEffect(() => {

    //console.log(token)
    
    Axios
    .get('/api/finduser',{ headers: {"x-auth-token" : `Bearer ${JSON.parse(token)}`} })
    .then(res=>{
        //console.log(res.data)
        const newuser= {userId:res.data._id,name:res.data.name};
        setUser(Object.assign({}, newuser))
        console.log(newuser)
    })
    .catch(err=>{
        if (err.response) {
            // Request made and server responded
            AuthStore.clearJWT();
            window.location.href = "/cover";
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
            AuthStore.clearJWT();
            window.location.href = "/cover";
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
            AuthStore.clearJWT();
            window.location.href = "/cover";
          }
    }) 
      
  },[token]);
    //convert day to date
  const daytoDate=(date)=>{
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  return [day,month,year].join('/');
  }
//convert day to time
  const daytoTime=(date)=>{
    var d = new Date(date),
    hrs = ''+ d.getHours(),
    min=''+ d.getMinutes(),
    time='';
    if(hrs.length<2) hrs='0'+hrs;
    if(min.length<2) min='0'+min;
    time=[hrs,min].join(':');
    return time;
  }

  
// To interact with backend and get the tasks
const didMount=()=>{
  
  Axios
    .get('/api/tasks',{ headers: {"x-auth-token" : `Bearer ${JSON.parse(token)}`} })
    .then(res=>{
      const allTask= res.data;
      const updallTask= allTask.map(task=>
        (Object.assign({},{userId:task.userId,_id:task._id,text:task.text,date:daytoDate(task.day),time:daytoTime(task.day),reminder:task.reminder}))
        );
      setTasks(updallTask);
    })
    .catch(err=>{
      if (err.response) {
          // Request made and server responded
          //console.log('going from didmount')
          AuthStore.clearJWT();
          window.location.href = "/cover";
        } else if (err.request) {
          // The request was made but no response was received
          console.log(err.request);
          AuthStore.clearJWT();
          window.location.href = "/cover";
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err);
          AuthStore.clearJWT();
          window.location.href = "/cover";
        }
    }) 
    bool_setdidMount(false)
}


//to jump to top of the page
/* const movtoTop=() =>{
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
} */
//Add task
const addTask=(task)=>{
    
    const date=''+task.date;
    const time=''+task.time+':00';
    const [d,m,y]=date.split('/');
    const day= ''+ [y,m,d].join('/')+' '+ time;//in database stored as YYYY/MM/DD
    const uday=new Date(day);
    const updTask= {userId:currUser.userId,text:task.text,day:uday,reminder:task.reminder};
    
    Axios
      .post('/api/tasks',updTask,{headers: {"x-auth-token" : `Bearer ${JSON.parse(token)}`}})
      .then(res=>{
        console.log(res.data._id);
        didMount();
        setsnackmsg('New Task Added !');
        setsnack(true);
      })
      .catch(err=>{
        if (err.response) {
            // Request made and server responded
            AuthStore.clearJWT();
            window.location.href = "/cover";
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
            AuthStore.clearJWT();
            window.location.href = "/cover";
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err);
            AuthStore.clearJWT();
            window.location.href = "/cover";
          }
    }) 
    
    bool_setdidMount(true)
    setShowAddTask(false)

}
 //delete task
 const delTask=(id)=>{
  Axios
  .delete(`/api/tasks/${id}`,{ headers: {"x-auth-token" : `Bearer ${JSON.parse(token)}`} })
  .then(res=>{
    console.log(id)
    setsnackmsg('Task Deleted !')
    setsnack(true)
  })
  .catch(err=>{
    if (err.response) {
        // Request made and server responded
        AuthStore.clearJWT();
        window.location.href = "/cover";
      } else if (err.request) {
        // The request was made but no response was received
        console.log(err.request);
        AuthStore.clearJWT();
        window.location.href = "/cover";
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', err);
        AuthStore.clearJWT();
        window.location.href = "/cover";
      }
  }) 
  
  setTasks(tasks.filter((task)=> task._id!==id));
 }
 //edit particular task
 const EditTask=(task)=>{
    
    bool_settasktoform(true)
    settasktoform(task)

 }
 const exitClicked=()=>{
    AuthStore.clearJWT()
    window.location.href = "/cover";
 }
 if(AuthStore.isAuthenticated()){
     return(
      
                <div className="container" ref={listRef}>
                <CssBaseline/>
                
                <>
                        {bool_didMount && didMount()}
                        <Header title={title} logout={exitClicked}/>
                        <Addbutton 
                        text={"Add"} 
                        onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}
                        />
                        {showAddTask && <AddTask onAdd={addTask}/>}

                    {bool_tasktoform && <ModalForm 
                        title={'Edit Task'}
                        close={()=> {
                        didMount()  
                        bool_settasktoform(false)
                        bool_setdidMount(true)
                        }}
                        task={tasktoform}
                        activatesnack={(msg)=>{
                          setsnackmsg(msg)
                          setsnack(true)
                        }}
                        /> }

                        
                        {tasks.length>0? (<Tasks tasks={tasks} onDelete={delTask} onEdit={EditTask} />)
                        :("No task scheduled .")}
                        {snackopen && <Snackbars msg={snackmsg} close={()=>{
                          setsnack(false)}
                        }/>}
                        
                         <Footer/>  
                         
                </>
              
            </div>
          
     )
 }
 else{
  return(
      <></>
  )
}
}

export default Dashboard