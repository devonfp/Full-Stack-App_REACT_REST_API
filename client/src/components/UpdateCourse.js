// Code from Github Copilot

import React, { useState } from "react";
import { useContext, useEffect } from "react";
import  UserContext, { UserProvider }  from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

const UpdateCourse = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        id: "",
        name: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        userId: ""
    });
    
   
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await api.getCourse(course.id);
            if (response.status === 200) {
                setCourse(response.data);
            } else {
                throw new Error();
            }
        };
        fetchCourse();
    }, [course.id]);

    const handlechange = (event) => {
        const { name, value } = event.target;
        setCourse({...course, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await api.updateCourse(course);
        if (response.status === 200) {
            console.log(`${course.name} is successfully updated`);
            navigate("/courses");
        } else if (response.status === 400) {
            const data = await response.json();
        } else {
            throw new Error();
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <div className="form--centered">
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={course.name}
                    onChange={handlechange}
                />
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={course.description}
                    onChange={handlechange}
                />
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={course.estimatedTime}
                    onChange={handlechange}
                />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <input
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    value={course.materialsNeeded}
                    onChange={handlechange}
                />
                <label htmlFor="userId">User ID</label>
                <input
                    id="userId"
                    name="userId"
                    type="text"
                    value={course.userId}
                    onChange={handlechange}
                />
                <button className="button" type="submit">Update Course</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}
export default UpdateCourse;
