import React, { useEffect, useState } from 'react';

function Courses() {
    const [courses, setCourses] = useState([]); // We initialize the courses state to an empty array.

    // We use the useEffect hook to fetch the courses from the API.
    useEffect(() => {
        fetch('/api/courses') 
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: {response.status}`);
            }
            return response.json();
        })
        .then(data => setCourses(data))
        .catch(error => console.log('There was a problem getting the courses:', error));
        }, []);

    return (
        <div>
            {courses.map(course => (
                <div key={course.id}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
}