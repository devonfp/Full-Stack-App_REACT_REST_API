import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/apiHelper';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";


import { useParams } from 'react-router-dom';



// Code below from Github Copilot

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
      .catch(error => console.log('There was a problem getting the courses:', error));
  }, []);




  const handleDelete = async (event) => {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 204) {
      console.log(`${course.name} is successfully deleted`);
      navigate("/");
    } else {
      throw new Error();
    }
  };



  const handleUpdate = (event) => {
    useNavigate.push(`/courses/${course.id}/update`);
  };




  /*  if (!course) {
      return <div>Loading...</div>;
    }*/

  console.log(course);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
        {authUser && authUser.id === course.id &&
    <>
        <a className="button" onClick={handleUpdate}>Update Course</a>
        <a className="button" onClick={handleDelete}>Delete Course</a>
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
            <p>By {course.author}</p>
            <p>{course.description}</p>
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
              <li>{course.materialsNeeded}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CourseDetail;



//  {authUser === null ?
//<>
//</>
//:
//<>
 // <a className="button" onClick={handleUpdate}>Update Course</a>
 // <a className="button" onClick={handleDelete}>Delete Course</a>
//</> } 