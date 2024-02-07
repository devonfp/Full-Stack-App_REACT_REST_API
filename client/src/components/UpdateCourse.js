// Code from Github Copilot

import React, { useState } from "react";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

const UpdateCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        id: "",
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
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
        setCourse({ ...course, [name]: value });
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

/*    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/');
    };*/

    return (
        <main>
            <div class="wrap">
                <h2>Update Course</h2>
                <form>
                    <div class="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" />

                            <p></p>

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description"></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                        </div>
                    </div>
                    <button class="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={event => { event.preventDefault(); navigate("/") }}>Cancel</button>
                </form>
            </div>
        </main>
    );
}
export default UpdateCourse;
