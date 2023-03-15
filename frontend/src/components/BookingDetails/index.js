import { useState } from 'react'
import { createBooking } from '../../store/booking';
import { useParams } from 'react-router-dom';


function CreateBooking(){ 

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date:</label>
        <input type="date" 
        id="startDate" 
        name="startDate" 
        value={startDate} 
        onChange={createStartDate} />
      </div>
      <div>
        <label >End Date:</label>
        <input type="date" 
        id="endDate"
        name="endDate"
        value={endDate} 
        onChange={createEndDate} />
      </div>
      <button type="submit">Reserve</button>
    </form>
  );
}



// export default CreateBooking;
