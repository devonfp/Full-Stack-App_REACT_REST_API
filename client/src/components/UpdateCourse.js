// Code from Github Copilot

import React, { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ErrorsDisplay from "./ErrorsDisplay";


// This function stores state variables to react to user input (lines 23-30)
// Fetches course detail (35-45)
//Handles input changes (lines 50-53)
//Gives the "Update Course button it's functionality (lines 55-98)
// Renders the entire page (lines 102-132)
const UpdateCourse = () => {
    const navigate = useNavigate();
    const { authUser } = useContext(UserContext);
    const { id } = useParams();


    // State variables allow the application to react to user input and changes in real-time
    const [errors, setErrors] = useState({});
    const [course, setCourse] = useState({
        id: "",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
    });



    // Fetches the course detail from the API.
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: {response.status}`);
                }
                return response.json();
            })
            .then(data => setCourse(data))
            .catch(error => console.log('There was a problem getting the courses:', error));
    }, [id]);



    // Updates course state variables when the user enters input into the form fields.
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value });
    };

    // This function is triggered when the user clicks the "Update Course" button.
    const handleUpdate = async (e) => {
        e.preventDefault(); 

        // Checks if all the required fields are filled in.
        // If not, it adds the appropriate error messages to the errors state variable and stops execution. 
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
        }
        const username = authUser.username; 
        const password = authUser.password; 
        const encodedCredentials = btoa(`${username}:${password}`);
        // sends a PUT request to the API to update the course detail.
        const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${encodedCredentials}` // Use Basic Authentication
            },
            body: JSON.stringify(course)
        });
        if (response.status === 204) {
            navigate(`/courses/${id}`);
        } else {
            throw new Error();
        }
    };



    return (
        <main>
            <div class="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form>
                    <div class="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" onChange={handleInputChange} value={course.title} />

                            <p>By {course.user && `${course.user.firstName} ${course.user.lastName}`}</p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" onChange={handleInputChange} value={course.description} ></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleInputChange} value={course.estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleInputChange} value={course.materialsNeeded} ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={handleUpdate}>Update Course</button>
                    <button className="button button-secondary" onClick={event => { event.preventDefault(); navigate(`/courses/${id}`) }}>Cancel</button>
                </form>
            </div>
        </main>
    );
}
export default UpdateCourse;
