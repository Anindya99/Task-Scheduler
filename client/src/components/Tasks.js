import Task from './Task'
import Taskheader from './taskheader'

const Tasks = ({tasks,onDelete,onEdit}) => {
    
  return (
      <div className='taskset'>
       <Taskheader className="taskheader"/>
      {
          tasks.map((task)=>(
              <div key={task._id}>
                 <Task task={task} onDelete={onDelete} onEdit={onEdit} />
              </div>
          ))
      }
      </div>
  );
};

export default Tasks;
