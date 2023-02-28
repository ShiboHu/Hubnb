import { editSpot, oneSpot, userSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";

function EditSpotForm( id ){ 
    const dispatch = useDispatch();
    const history = useHistory();
    let el = useSelector(state => state.spots.userSpot.Spots)
    const updateSpot = el.find(spot => spot.id === id.props)
    
    const { closeModal } = useModal();

    useEffect(() => { 
        dispatch(oneSpot(id.props))
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
        
        if(name.length < 5 || name.length > 10)errors.push('name must be between 5-10 characters')
        if(address.length < 5 || address.length > 30) errors.push('Adress length must be between 5-30 characters')
        if(!name) errors.push(`Name is required`);
        if(!address) errors.push(`Address is required`);
        if(!city) errors.push(`City is required`);
        if(!country) errors.push(`Country is required`);
        if(!state) errors.push(`State is required`);
        if(!lat) errors.push(`Latitude is required`);
        if(!lng) errors.push(`Longitude is required`);
        if(!price) errors.push(`Price is required`);
        if(!description) errors.push(`Description is required`);
        if(description.length < 30)errors.push('Descriptions need to be longer than 30 characters')
        if(!Number(price))errors.push('Price must be a number');

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

    
        await dispatch(editSpot(payload, id.props))
        .then(closeModal)
        history.push(`/spots/${id.props}`)
        
};


    return ( 
        <div className="create-spot-form">
        <h1>Edit a Spot</h1>
        <form onSubmit={submit}>
        <ul className="create-errors">
        {errors.map((error, idx) => 
          <li key={idx}>{error}</li>
          )}
        </ul>
        <label>
            <input id="input"
            placeholder="Name of your spot"
            onChange={createName}
            value={name}
            required
            >
            </input>
            <input id="input"
            placeholder="Address"
            onChange={createAddress}
            value={address}
            required
            >
            </input>
            <input id="input"
            placeholder="City"
            onChange={createCity}
            value={city}
            required
            >
            </input>
            <input id="input"
            placeholder="State"
            onChange={createState}
            value={state}
            required
            >
            </input>
            <input id="input"
            placeholder="Country"
            onChange={createCountry}
            value={country}
            required
            >
            </input>
            <input id="input"
            placeholder="Price per night(USD)"
            onChange={createPrice}
            value={price}
            required
            >
            </input>
            <input id="input"
            placeholder="Latitude"
            onChange={createLatitude}
            value={lat}
            required
            >
            </input>
            <input id="input"
            placeholder="Longitude"
            onChange={createLongitude}
            value={lng}
            required
            >
            </input>
            <textarea className="input" 
            rows={4}
            placeholder="Description"
            onChange={createDescription}
            value={description}
            required
            >
            </textarea>
        </label>
        </form>
        <button className="create-spot-button" type="submit" onClick={submit}>Update Spot</button>
        </div>
    )
}


export default EditSpotForm;
