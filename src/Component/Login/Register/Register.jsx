import React, { useState } from "react";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "../../../firebase/firebase.config";
import { Link } from "react-router-dom";
const auth = getAuth(app);
const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] =useState()

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('')
    setSuccess('')
    const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;


        if(!/^(?=.*[a-z])/.test(password)){
            setError('please add one loercase')
            return;
        }

    createUserWithEmailAndPassword(auth, email ,password)
    .then(result =>{
        const logger = result.user;
        // console.log(logger)
        setError('')
        event.target.reset()
        setSuccess('user login successfully')
        updateUserData(result.user, name);
    })
    .catch(error => {
        console.error(error.message);
        setError(error.message);
        setSuccess('')
    })
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
        displayName: name
    })
        .then(() => {
            console.log('user name updated')
        })
        .catch(error => {
            setError(error.message);
        })
}

  const handleEmailChange = (event) => {
    // setEmail(event.target.value);
  };

  const handlePasswordBlur = () => {};

  return (
    <div className="w-50 mx-auto">
      <h4>Please Register</h4>
      <form onSubmit={handleSubmit}>
      <input className='w-50 mb-4 rounded ps-2' type="text" name="name" id="name" placeholder='Your Name' required />
                <br />
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
          placeholder="type your email"
          required
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          id=""
          placeholder="password"
          required
        />
        <br />
        <br />
        <input onClick={handlePasswordBlur} type="submit" value="register" />
      </form>
      <p>already have register please <Link to={'/login'}>Login</Link></p>
      <p className="text-danger">{error}</p>
      <p className="text-primary">{success}</p>
    </div>
  );
};

export default Register;
