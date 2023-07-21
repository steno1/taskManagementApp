import { Alert, BlueLogo, FormRow } from '../components';
import { useEffect, useState } from 'react';

import React from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

// Initial state for the form inputs
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

// Register component
const Register = () => {
  // Get the navigate function from react-router-dom for navigation
  const navigate = useNavigate();

  // State for form inputs and other values
  const [values, setValues] = useState(initialState);

  // Access the app context using useAppContext hook
  const { isLoading, showAlert,
     displayAlert, registerUser,
      user, loginUser } = useAppContext();

  // Handle input changes
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    // Validate inputs before submitting the form
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }

    // Create user object from form values
    const currentUser = { name, email, password };

    // Register the user if it's a new user, otherwise log a message
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser);
    }
  };

  // Use useEffect to perform actions when the user state changes
  useEffect(() => {
    // Redirect to the home page after successful user registration
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  // Toggle between login and registration mode
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <div className='findLogo'>
          <BlueLogo />
        </div>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}

        {/* Render name input only for registration */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
            placeholder='name'
          />
        )}

        {/* Render email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
          placeholder='email'
        />

        {/* Render password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
          placeholder='password'
        />

        {/* Submit button */}
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>

        {/* Toggle between registration and login */}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type='button'
            onClick={toggleMember}
            className='member-btn'
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
