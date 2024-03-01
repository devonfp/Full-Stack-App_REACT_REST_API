import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // useParams Gets the course id from the URL
import ReactMarkdown from 'react-markdown';

//Passes user information down without using "Context.Consumer" or "props"
import { useContext } from "react";
import UserContext from "../context/UserContext";



// Code created with Copilot
// This function fetches a specific course id from the API and displays them
// It also creates the update/delete buttons and renders a detailed view of the specific course.
function CourseDetail() {
  const [course, setCourse] = useState([]); // We initialize the courses state to an empty array.
  const navigate = useNavigate();
  const { id } = useParams();
  const { authUser } = useContext(UserContext);


  // We use the useEffect hook to fetch the courses from the API.
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: {response.status}`);
        }
        return response.json();
      })
      .then(data => setCourse(data))
      .catch(error => console.log('There was a problem getting the courses:', error)
      );
  }, [id]);



  // Delete Button
  const handleDelete = async (event) => {

    // Server identifies the user to make sure they are the owner of the course before deletion.
    const username = authUser.username;
    const password = authUser.password;
    const encodedCredentials = btoa(`${username}:${password}`);

    // Server deletes the course and redirectes to home screen.
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encodedCredentials}`
      },
    });
    if (response.status === 204) {
      navigate("/");
    } else {
      throw new Error();
    }
  };


  // Update button takes user to update course page.
  const handleUpdate = (event) => {
    navigate(`/courses/${course.id}/update`);
  };


  //console.log(course.user);
  //console.log(authUser.userId);


  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">

          {/* checks if the currently authenticated user is the creator or owner of the current course. 
        If so, the update/delete buttons are rendered. */}
          {authUser && course && course.user && authUser.userId === course.user.id &&
            <>
              <button className="button" onClick={handleUpdate}>Update Course</button>
              <button className="button" onClick={handleDelete}>Delete Course</button>
            </>
          }
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>By {course.user && `${course.user.firstName} ${course.user.lastName}`}</p>
            <ReactMarkdown>{course.description}</ReactMarkdown>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
              <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CourseDetail;