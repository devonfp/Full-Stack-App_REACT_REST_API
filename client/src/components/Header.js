import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";

// This function renders the header for users logged in or logged out
const Header = () => {
    const { authUser } = useContext(UserContext);
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"> <Link to="/">Courses</Link></h1>

                {/* If the user isn't logged in, a sign in/sign up link displays. If the user is, a welcome message displays*/}
                {authUser === null ?
                        <nav>
                            <ul className="header--signedout">
                                <li><Link to="/signup">Sign up</Link></li>
                                <li><Link to="/signin">Sign in</Link></li>
                            </ul>
                        </nav>
                    : // shorthand for an if-else statement
                        <nav>
                            <ul className="header--signedin">
                                <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                                <Link className="signout" to="/signout">Sign out</Link>
                            </ul>
                        </nav>
                }
            </div>
        </header>
    )
}

export default Header