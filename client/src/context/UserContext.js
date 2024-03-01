//  We preserve the user's state across each page by implementing a cookie that keeps track of (or "remembers") the authenticated user data while logged in.
import { createContext, useState } from "react";
import Cookies from "js-cookie"; // Cookie is a JavaScript library that makes it easy for us to create, read, and erase cookies. 
import { api } from "../utils/apiHelper";

const UserContext = createContext(null); // We create a new context object and export it.
// We'll use this context object to share data that can be considered "global" for a tree of React components,
// such as the current authenticated user and the functions that allow them to interact with the REST API.

// This is a custom hook that allows us to share state and functionality throughout our React components.
export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser")
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    // This function signs the user in to the application.
    const signIn = async (credentials) => {
        const response = await api("/users", "GET", null, credentials);
        if (response.status === 200) {
            const user = await response.json();
            user.password = credentials.password;
            setAuthUser(user);
            Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 })
            return user;
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error("Something went wrong");
        }
    }

    // This function signs the user out of the application.
    const signOut = () => {
        setAuthUser(null);
        Cookies.remove("authenticatedUser");
    }

    // We return the provider component with the context object and the provider value.
    return (
        <UserContext.Provider value={{
            authUser,
            actions: {
                signIn,
                signOut,
            }
        }}>
            {props.children}
        </UserContext.Provider>
    );
}
export default UserContext;