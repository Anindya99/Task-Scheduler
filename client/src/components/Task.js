import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri'
import {FaPen} from 'react-icons/fa'

const Task = ({task,onDelete,onEdit}) => {
  const id=task._id
  const text=task.text
  const date=task.date
  const time=task.time
  const reminder=task.reminder
  const startEdit=(e)=>{
      e.preventDefault()
      onEdit({userId:task.userId,_id:id,text:text,date:date,time:time,reminder:reminder})
  }
  return (
  <div className={`task_bar ${task.reminder && 'reminder'}`} >
       <h4 >{task.text}</h4>
        <h4 ><i>on <u>{task.date}</u></i></h4>
        <h4 ><i>at <u>{task.time}</u> hrs</i></h4>
        <FaPen style={{ color: 'blue', cursor: 'pointer' }} size="50px" className='edit_icon'
        onClick={startEdit}/>
        <RiDeleteBin6Line style={{ color: 'red', cursor: 'pointer' }} size="50px" className='del_icon'
        onClick={()=>onDelete(task._id)}
        />
  </div>
  );
};

export default Task;
