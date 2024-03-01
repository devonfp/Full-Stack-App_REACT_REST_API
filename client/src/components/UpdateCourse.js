// Code created with Github Copilot

import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import ErrorsDisplay from "./ErrorsDisplay";


// - This function stores state variables to react to user input 
// - Fetches course detail 
//- Handles input changes 
//- Gives the "Update Course button it's functionality 
// - Renders the entire page
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

        // Server identifies the user to make sure they are the owner of the course before updating.
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
        try {
            if (response.status === 204) {
                navigate(`/courses/${id}`);
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



    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                <form>
                    <div className="main--flex">
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
