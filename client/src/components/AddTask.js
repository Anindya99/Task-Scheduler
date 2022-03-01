import React from 'react';
import { useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import DateTimePicker from '@mui/lab/DesktopDateTimePicker';


const AddTask = ({onAdd,task}) => {
  
  const [text, setText] = useState(task.text)
  const [date, setDate] = useState(task.date)
  const [time, setTime] = useState(task.time)
  const [reminder, setReminder] = useState(task.reminder)
  const[day,setday]=useState(Date.now())

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }
    
    var d = new Date(day),
    month = '' + (d.getMonth() + 1),
    cday = '' + d.getDate(),
    year = d.getFullYear();
    const newDate= [cday,month,year].join('/');
    //console.log(newDate)

    var hrs = ''+ d.getHours(),
    min=''+ d.getMinutes();
    if(hrs.length<2) hrs='0'+hrs;
    if(min.length<2) min='0'+min;
    const newtime=[hrs,min].join(':');

    //console.log(day)
    //console.log(`${newDate} ${newtime}`)
    onAdd({userId:task.userId,_id:task._id, text:text, date:newDate, time:newtime, reminder:reminder })

    
    setText('')
    setDate(Date.now())
    setTime(Date.now())
    setReminder(true)
  }
  return (
  <form className='add-form' onSubmit={onSubmit}>
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
    {/* <div className='form-control'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                label="Date (MM/DD/YYYY)"
                value={date??" "}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} helperText={null}/>}
              />
            </LocalizationProvider>
       
    </div> */}
    <div className='form-control'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                            label="Date (MM/DD/YYYY) Time"
                            
                            value={day??" "}
                            onChange={(newValue) => {
                              setday(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} style = {{width: '70%',background:'white'}}/>}

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
    <input type='submit' value='Save Task' className='btn btn-block' />
  </form>
  
  );
};
AddTask.defaultProps={
  task:{_id:'',text:'',date:Date.now(),time:Date.now(),reminder:true},
  
}
export default AddTask;
