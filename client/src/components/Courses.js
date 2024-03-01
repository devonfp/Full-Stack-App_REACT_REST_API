import React, { useEffect, useState } from 'react';


// Code created with Copilot
// This function fetches courses from the API and displays them.
function Courses() {
    const [courses, setCourses] = useState([]); // We initialize the courses state to an empty array.

    // We use the useEffect hook to fetch the courses from the API.
    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: {response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data from API:', data);
                setCourses(data);
            })
            .catch(error => console.log('There was a problem getting the courses:', error));
    }, []);



    return (
        <main>
            <div className="wrap main--grid">
                {courses.map(course => (
                    <div key={course.id}>
                        <a className="course--module course--link" href={`/courses/${course.id}`}>
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                        </a>
                    </div>
                ))}
                <a className="course--module course--add--module" href={`/courses/create`}>
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </span>
                </a>
            </div>
        </main>
    );
}

export default Courses;