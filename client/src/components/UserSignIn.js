import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';



const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  //State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});


  // Submit button
  const handleSubmit = async (event) => {
    event.preventDefault();

      // Validation errors. From Github Copilot
      const errors = [];

      if (!email) {
          errors.push('Please provide an email');
      }

      if (!password) {
          errors.push('Please provide a password');
      }
  
      if (errors.length > 0) {
          // If there are errors, we stop the execution of the function here and set the errors to state
          setErrors(errors);
          return;
      }

    // Gets the previous location the user was trying to access before they were redirected to the sign-in page   
    let from = '/';
    if (location.state) {
      from = location.state.from;
    }

    // Credentials object needed to sign in
    const credentials = {
      username: email,
      password,
    };


    // If the sign-in is successful, it navigates to the page the user was at previously.
    // Created with Copilot
    try {
      const user = await actions.signIn(credentials);
      if (user === null) {
        errors.push('User not found. Please try again.');
        setErrors(errors);
        return;
      } else {
        navigate(from);
      }
    } catch (error) {
      console.log(error);
      navigate('/error');
    }

  }


  // Cancel Button
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  }



  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <ErrorsDisplay errors={errors} />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="button" type="submit">Sign In</button>
          <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
      </div>
    </div>
  );
}

export default UserSignIn;
