// Necessary dependencies
import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorsDisplay from "./ErrorsDisplay";
import { api } from "../utils/apiHelper";

// This function stores state variables to react to user input
//Gives the "Create Course button it's functionality
// Handles input changes
// Renders the entire page
const CreateCourse = () => {
    // actions gives us access to the createCourse function from the UserContext
    const { authUser } = useContext(UserContext);
    const username = authUser.username;
    const password = authUser.password;
    const navigate = useNavigate();

    // State variables allow the application to react to user input and changes in real-time. 
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: authUser.userId
    });




    // This function is triggered when the user clicks the "Create Course" button.
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevents the default form submission behavior

        /*
                // Validation errors
                const errors = [];
                
                if (!course.title) {
                    errors.push('Please provide a value for "Title"');
                }
        
                if (!course.description) {
                    errors.push('Please provide a value for "Description"');
                }
                if (!course.estimatedTime) {
                    errors.push('Please provide a value for "Estimated Time"');
                }
                if (!course.materialsNeeded) {
                    errors.push('Please provide a value for "Materials Needed"');
                }
        
                if (errors.length > 0) {
                    // If there are errors, we stop the execution of the function here and set the errors to state
                    setErrors(errors);
                    return;
                }*/



        // This try/catch block calls the API to create a new course.
        let response;
        try {
            response = await api('/courses', 'POST', course, { username, password });
            if (response.status === 201) {
                navigate(`/courses/${response.data.id}`);
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
                console.log(data);
            }
        } catch (error) {
            console.error(error);
            setErrors([error.message]); // Set the errors state to the error message
        }
    }


    // Updates course state variables when the user types in the input fields.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="title">Course Title</label>
                        <input id="title" name="title" type="text" onChange={handleInputChange}></input>

                        <p>By {authUser.firstName} {authUser.lastName}</p>

                        <label htmlFor="description">Course Description</label>
                        <textarea id="description" name="description" onChange={handleInputChange}></textarea>
                    </div>
                    <div>
                        <label htmlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInputChange}></input>

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInputChange}></textarea>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button>
                <button className="button button-secondary" onClick={event => { event.preventDefault(); navigate("/") }}>Cancel</button>
            </form>
        </main>
    );
};

export default CreateCourse;
