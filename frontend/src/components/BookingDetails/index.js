import { useEffect, useState } from 'react';
import { createBookings } from '../../store/booking';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import moment from 'moment';

function CreateBooking( props ) {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errors, setErrors] = useState([]);

  const [price, setPrice] = useState(props.props)
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));
    const totalDays = duration.asDays();
    const totalPrice = totalDays * price;
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [price, startDate, endDate]);

  const handleDateClick = (date) => {
    calculateTotalPrice();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      startDate,
      endDate,
    };

    try {
      const newBook = await dispatch(createBookings(payload, spotId));

      if (newBook) {
        return history.push('/user/current/bookings');
      }
    } catch (err) {
      const data = await err.json();
      console.log(data.errors);
      if (data && data.errors) {
        setErrors(data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='calendar'>
      <div>
        <ul>
          {errors?.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type='date'
          id='startDate'
          name='startDate'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type='date'
          id='endDate'
          name='endDate'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

        {startDate && endDate ? (
      <div>
          <p>
            ${price} x{' '}
            {moment
              .duration(moment(endDate).diff(moment(startDate)))
              .asDays()}{' '}
            nights
          </p>
          <p>Total Price: ${totalPrice}</p>
      </div>
        ) : (
          <p>Please select start and end dates</p>
        )}

      <button className='button-23' type='submit'>
        Reserve
      </button>
    </form>
  );
}

export default CreateBooking;
