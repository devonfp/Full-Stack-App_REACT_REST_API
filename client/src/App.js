import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import PrivateRoute from './components/PrivateRoute';

//import logo from './logo.svg';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
      </Routes>
    </div>


    // Code from Github Co-Pilot
    /*
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
      fetch('http://localhost:5000/api/courses')
        .then(response => response.json())
        .then(data => setCourses(data));
    }, []);
    
    
    
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {courses.map(course => (
              <div key={course.id}>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
              </div>
            ))}
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </header>
        </div>
        */
  );
}

export default App;
