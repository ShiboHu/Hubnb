import { editSpot, oneSpot, userSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";

function EditSpotForm(){ 
    const { spotId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    let updateSpot = useSelector(state => state.spots.singleSpot)
    
    const { closeModal } = useModal();

    useEffect(() => { 
        dispatch(oneSpot(spotId))
    },[])

  
    const [name, setName] = useState(updateSpot.name);
    const [address, setAddress] = useState(updateSpot.address);
    const [state, setState] = useState(updateSpot.state);
    const [country, setCountry] = useState(updateSpot.country);
    const [city, setCity] = useState(updateSpot.city);
    const [price, setPrice] = useState(updateSpot.price);
    const [lat, setLatitude] = useState(updateSpot.lat);
    const [lng, setLongitude] = useState(updateSpot.lng);
    const [description, setDescription] = useState(updateSpot.description);
    const [errors, setErrors] = useState([]);

    
    const createName = (e) => setName(e.target.value);
    const createAddress = (e) => setAddress(e.target.value);
    const createCity = (e) => setCity(e.target.value);
    const createState = (e) => setState(e.target.value);
    const createCountry = (e) => setCountry(e.target.value);
    const createPrice = (e) => setPrice(e.target.value);
    const createLatitude = (e) => setLatitude(e.target.value);
    const createLongitude = (e) => setLongitude(e.target.value);
    const createDescription = (e) => setDescription(e.target.value);

    useEffect(() => { 
        const errors = [];
        
        if(name.length < 5 || name.length > 10)errors.push('Name must be between 5-10 characters')
        if(address.length < 5 || address.length > 30) errors.push('Address length must be between 5-30 characters')
        if(description.length < 30)errors.push('Descriptions need to be longer than 30 characters')
        if(!Number(price))errors.push('Price must be a number');
        if(!Number(lat))errors.push('Latitude must be a number');
        if(!Number(lng))errors.push('Longitude must be a number');
         setErrors(errors)

         
    },[name, address, city, state, lat, lng, price, description])
    
    

    const submit = async (e) => { 
        e.preventDefault();

        const payload = { 
            name,
            address,
            state,
            country,
            city,
            price,
            lat,
            lng,
            description,
        }

    
        await dispatch(editSpot(payload, spotId))
        .then(closeModal)
        history.push(`/spots/${spotId}`)
        
};


return (
    <div className="create-spot-form">
      <h1>Edit  Spot</h1>
      <form onSubmit={submit} className="create-spot-main-form">
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Name') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="Name of your spot"
              onChange={createName}
              value={name}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Street') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="Address"
              onChange={createAddress}
              value={address}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('City') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="City"
              onChange={createCity}
              value={city}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('State') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="State"
              onChange={createState}
              value={state}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Country') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="Country"
              onChange={createCountry}
              value={country}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Price') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="Price per night(USD)"
              onChange={createPrice}
              value={price}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Latitude') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="Latitude"
              onChange={createLatitude}
              value={lat}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Longitude') && <li>{error}</li>}
        </div>
        ))}
            <input
              id="input"
              placeholder="Longitude"
              onChange={createLongitude}
              value={lng}
              required
            />
        </label>
  
        <label>
        {errors.map((error, idx) => (
        <div className="signuppage-errors" key={idx}>
         {error.includes('Description') && <li>{error}</li>}
        </div>
        ))}
            <textarea
              className="input"
              rows={4}
              placeholder="Description"
              onChange={createDescription}
              value={description}
              required
            />
        </label>
  
  
        <button
          className="button-23"
          type="submit"
          onClick={submit}
          disabled={!!errors.length}
        >
          Edit Spot
        </button>
      </form>
    </div>
  );
}


export default EditSpotForm;
