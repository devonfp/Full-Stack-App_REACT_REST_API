import { Link } from 'react-router-dom';

const Header = () => {
return (
    <div className="header"
      {authUser === null ?
        <>
          <Link className="signup" to="/signup">Sign up</Link>
          <Link className="signin" to="/signin">Sign in</Link>
        </>
        :
        <>
          <span>Welcome, {authUser.name}!</span>
          <Link className="signout" to="/signout">Sign out</Link>
        </>
     </div>
      }
  )
    };
export default Header