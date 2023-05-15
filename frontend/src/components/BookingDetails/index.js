import { useState } from 'react'
import { createBookings } from '../../store/booking';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function CreateBooking(){ 
  const { spotId } = useParams(); 
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setstartDate] = useState(''); 
  const [endDate, setEndDate] = useState(''); 
  const [errors, setErrors] = useState([]); 


  const handleSubmit = async (e) => { 
    e.preventDefault();

    const payload = { 
      startDate, 
      endDate
    }

    try{ 
    const newBook = await dispatch(createBookings(payload, spotId));


      if(newBook){ 
        history.push('/user/current/bookings')
      }

    }catch (err) { 
      const data = await err.json()
      console.log(data.errors)
      if(data && data.errors){ 
        setErrors(data.errors)
      }
    }
    
  }


  return (
    <form onSubmit={handleSubmit}>

    <div>
      <ul>
        {errors?.map((error, i) => 
        <li key={i}>{error}</li>
        )}
      </ul>
    </div>


      <div>
        <label>Start Date:</label>
        <input type="date" 
        id="startDate" 
        name="startDate" 
        value={startDate} 
        onChange={(e) => setstartDate(e.target.value)} />
      </div>

      <div>
        <label >End Date:</label>
        <input type="date" 
        id="endDate"
        name="endDate"
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <button className='button-23' type="submit">Reserve</button>

    </form>
  );
}



export default CreateBooking;
