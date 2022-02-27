import React,{useState} from "react";
import AuthStore from '../middleware/AuthStore'
import Axios from 'axios';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import DateTimePicker from '@mui/lab/DesktopDateTimePicker';

//isEmpty is to be used when add button is added in the header
const ModalForm = ({title,close,task,activatesnack,isEmpty}) => {
  const [text, setText] = useState(task.text)
  const [date, setDate] = useState(task.date)
  const [time, setTime] = useState(task.time)
  const [reminder, setReminder] = useState(task.reminder)

  const [d3,m2,y1]=date.split('/');//stored as DD/MM/YYYY
  const x4= ''+ [m2,d3,y1].join('/')+' '+ time;
  const x5=new Date(x4);
  const[curday,setcurday]=useState(x5)
  const token = localStorage.getItem("jwtToken")

  const [error,seterror]=useState([])




  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      //alert('Please add a task')
      seterror(['Please add task details'])
      return
    }
    /* if (!date) {
      alert('Please add a date')
      return
    }
    if (!time) {
      alert('Please add a time')
      return
    } */

    /* onAdd({_id:task._id, text:text, date:date, time:time, reminder:reminder }) */
    
    var d1 = new Date(curday),
    cmonth = '' + (d1.getMonth() + 1),
    cday = '' + d1.getDate(),
    cyear =  d1.getFullYear();
    const fldate= [cday,cmonth,cyear].join('/');

    var hrs = ''+ d1.getHours(),
    min=''+ d1.getMinutes();
    if(hrs.length<2) hrs='0'+hrs;
    if(min.length<2) min='0'+min;
    const fltime= [hrs,min].join(':')
     
    
      const id=task._id;
      const ndate=''+fldate;
      const ntime=''+fltime+':00';
      const [d,m,y]=ndate.split('/');
      const day= ''+ [y,m,d].join('/')+' '+ ntime;//in database stored as YYYY/MM/DD
      const uday=new Date(day);
      //console.log(uday)
      
      const updTask= {userId:task.userId,text:text,day:uday,reminder:reminder};
      Axios
      .put(`/api/tasks/${id}`,updTask,{ headers: {"x-auth-token" : `Bearer ${JSON.parse(token)}`} })
      .then(res=>console.log(res.data))
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
    
    seterror([])
    close();
    activatesnack('Task Edited !')
    setText('')
    setDate(Date.now())
    setTime(Date.now())
    setReminder(true)
  }
  const saveNew = (e) => {
    e.preventDefault();

    if (!text) {
      /* alert('Please add a task') */
      seterror(['Please add task details'])
      return
    }
    /* if (!date) {
      alert('Please add a date')
      return
    }
    if (!time) {
      alert('Please add a time')
      return
    } */

      var d1 = new Date(curday),
      cmonth = '' + (d1.getMonth() + 1),
      cday = '' + d1.getDate(),
      cyear = d1.getFullYear();
      const fldate= [cday,cmonth,cyear].join('/');


      var hrs = ''+ d1.getHours(),
      min=''+ d1.getMinutes();
      if(hrs.length<2) hrs='0'+hrs;
      if(min.length<2) min='0'+min;
      const fltime= [hrs,min].join(':')

      const ndate=''+fldate;
      const ntime=''+fltime+':00';
      const [d,m,y]=ndate.split('/');//in database stored as YYYY/MM/DD
      const day= ''+ [y,m,d].join('/')+' '+ ntime;
      const uday=new Date(day);
      const updTask= {userId:task.userId,text:text,day:uday,reminder:reminder};
      Axios
      .post('/api/tasks',updTask,{headers: {"x-auth-token" : `Bearer ${JSON.parse(token)}`}})
      .then(res=>console.log(res.data._id))
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
    
    seterror([])
    close();
    activatesnack('New Task Added !')
    setText('')
    setDate('')
    setTime('')
    setReminder(true)
  }


  const closeModal=(e)=>{
        e.preventDefault();
        seterror([])
        close();
  }
  return (
    <div className="modalBackground">
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="body">
                {error.length>0 &&
                <Alert severity="error">{error[0]}</Alert>
                }
            <div className='form-control'>
                <label>Task Details</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            <div className='form-control'>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                            label="Date (MM/DD/YYYY) Time"
                            
                            value={curday??" "}
                            onChange={(newValue) => {
                              setcurday(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} style = {{width: 646}}/>}

                          />
                  </LocalizationProvider>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input
                    type='checkbox'
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
                </div>
      </div>
      <div className="footer">
        {!isEmpty && <button
          onClick={saveNew}
          id="NewTaskBtn"
        >
          Save as New Task
        </button>}
        <button onClick={isEmpty?saveNew:onSubmit}>Save Task</button>
      </div>
    </div>
  </div>
  )
};
 ModalForm.defaultProps={
    task:{userId:'',_id:'',text:'',date:'',time:'',reminder:true},
    title:'',
    isEmpty:false
} 
export default ModalForm;
