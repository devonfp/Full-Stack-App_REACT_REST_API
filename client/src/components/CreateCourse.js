// Necessary dependencies
import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
//import { api } from "../utils/apiHelper";


// Renders a form that allows a user to create a new course.
const CreateCourse = () => {
    const { authUser, actions } = useContext(UserContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState({ title: '', description: '', estimatedTime: '', materialsNeeded: '' });
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default form submission behavior
    
        try {
            // Use the createCourse function from the UserContext
            const newCourse = await actions.createCourse(course, authUser.username, authUser.password);
            // If the course was successfully created, redirect to the course detail page
            navigate.push(`/courses/${newCourse.id}`);
        } catch (error) {
            // Handle errors here
            console.error(`Error creating course: ${error.message}`);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourse(prevCourse => ({ ...prevCourse, [name]: value }));
    };

    return (
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
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
                    </div>
                </main>
    );
};

export default CreateCourse;
