import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(false);

  useEffect(() =>  {
    setDisabled(credential.length < 4 || password.length < 6)
  },[credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }
  
  const demoLogin = () => {
    dispatch(sessionActions.login(
      {credential:'john', password:'password2'}
      ))
      .then(closeModal)
}
 
  return (
    <div className="main-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='form'>
      <ul className="login-errors">
        {errors.map((error, idx) => 
          <li key={idx}>{error}</li>
          )}
      </ul>
        <label>
          <input className="input-box"
          placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input className="input-box"
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

    <div style={{display:"flex", gap:'10px'}}>    
        <button className="button-23" type="submit" disabled={disabled}>Log In</button>
    <button className="button-23" onClick={demoLogin}>Demo</button>
    </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
