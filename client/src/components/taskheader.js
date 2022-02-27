import React from 'react';

const taskheader = () => {
  return (
      <div className='taskheader'>
          <h2 >Task</h2>
          <h2 >Date <br/><small style={{fontSize:17}}>(DD/MM/YYYY)</small></h2>
          <h2 >Time</h2>
      </div>
  )
};

export default taskheader;
