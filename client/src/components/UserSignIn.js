import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    // state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Event handlers 
const handleSubmit = async (event) => {
    event.preventDefault();
    let from = '/';
    if (location.state) {
      from = location.state.from;
    }
    
    const credentials = {
        username: email,
        password,
      };

      try {
        const user = await actions.signIn(credentials);
        if (user) {
          navigate(from);
        } else {
          console.log('Sign in failed');
        }
      } catch (error) {
        console.log(error);
        navigate('/error');
      }
    }

      
      const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
      }

      return (
        <div className="form--centered">
          <h2>Sign In</h2>
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
