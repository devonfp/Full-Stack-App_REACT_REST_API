import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Header = () => {
    const { authUser } = useContext(UserContext);
    return (

        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"> <Link to="/">Courses</Link></h1>
                {authUser === null ?
                    <>
                        <nav>
                            <ul className="header--signedout">
                                <li><Link to="/signup">Sign up</Link></li>
                                <li><Link to="/signin">Sign in</Link></li>
                            </ul>
                        </nav>
                    </>
                    :
                    <>
                        <span>Welcome, {authUser.firstName} {authUser.lastName}!</span>
                        <Link className="signout" to="/signout">Sign out</Link>
                    </>
                }
            </div>
        </header>
    )
}

export default Header