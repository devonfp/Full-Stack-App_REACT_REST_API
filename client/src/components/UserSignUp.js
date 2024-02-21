import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';

const UserSignUp = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();


   //State variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});


    // Sign up button
    const handleSubmit = async (event) => {
        event.preventDefault();


        // Validation errors. Created with Copilot
        const errors = [];

        if (!firstName) {
            errors.push('Please provide a first name');
        }

        if (!lastName) {
            errors.push('Please provide a last name');
        }
        if (!emailAddress) {
            errors.push('Please provide an email address');
        }
        if (!password) {
            errors.push('Please provide a password');
        }

        if (errors.length > 0) {
            // If there are errors, we stop the execution of the function here and set the errors to state
            setErrors(errors);
            return;
        }

        // creates user object with user input values
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        // Attempts to sign up the user
        try {
            const success = await actions.signUp(user);
            if (success) {
                console.log(`${firstName} ${lastName} is successfully signed up`);
                navigate("/signin"); // navigate to sign in page
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Cancel Button
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <div className="form--centered">
            <h2>Sign Up</h2>
            <ErrorsDisplay errors={errors} />
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        value={emailAddress}
                        onChange={(event) => setEmailAddress(event.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UserSignUp;
