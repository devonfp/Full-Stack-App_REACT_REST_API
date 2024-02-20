// Necessary dependencies
import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ErrorsDisplay from "./ErrorsDisplay";


// This function stores state variables to react to user input (lines 16-23). 
//Gives the "Create Course button it's functionality (lines 28-67). Handles input changes (lines 73-76).
// Renders the entire page (lines 77-107)
const CreateCourse = () => {
    // actions gives us access to the createCourse function from the UserContext
    const { authUser, actions } = useContext(UserContext);
    const navigate = useNavigate();

    // State variables allow the application to react to user input and changes in real-time. 
    const [errors, setErrors] = useState({});
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
        }


        // If there are no errors, the function executes and we can create the course
        try {
            // Use the createCourse function from the UserContext
            const newCourse = await actions.createCourse(course, authUser.username, authUser.password);
            // If the course was successfully created, redirect to the course detail page
            navigate(`/courses/${newCourse.id}`);
        } catch (error) {

            // Handle errors here
            setErrors(error.response.data);
            console.error(`Error creating course: ${error.message}`);
        }
    };



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
