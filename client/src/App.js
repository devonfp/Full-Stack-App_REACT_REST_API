import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import './styles/global.css';

//Components
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';



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
  );
}

export default App;
