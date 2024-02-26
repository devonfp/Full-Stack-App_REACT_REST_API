//  We preserve the user's state across each page by implementing a cookie that keeps track of (or "remembers") the authenticated user data while logged in.
import { createContext, useState } from "react";
import Cookies from "js-cookie"; // Cookie is a JavaScript library that makes it easy for us to create, read, and erase cookies. 
import { api } from "../utils/apiHelper";   

const UserContext = createContext(null); // We create a new context object and export it. We'll use this context object to share data that can be considered "global" for a tree of React components, such as the current authenticated user and the functions that allow them to interact with the REST API.

// We create a new React component that will be used as a provider for the context object.
export const UserProvider = (props) => {
const cookie = Cookies.get("authenticatedUser")
const [authUser, setAuthUser] = useState(cookie? JSON.parse(cookie) : null);

// We create a new React component that will be used as a provider for the context object.
const signIn = async (credentials) => {
    const response = await api("/users", "GET", null, credentials);
    if (response.status === 200) {
        const user = await response.json();
        user.password = credentials.password;
        setAuthUser(user);
        Cookies.set("authenticatedUser", JSON.stringify(user), {expires: 1})
        return user;
    } else if (response.status === 401) {
        return null; 
    } else {
        throw new Error("Something went wrong");
    }
}

// Code from Github Copilot
const signUp = async (user) => {
    const response = await api('/users', 'POST', user);
    if (response.status === 201) {
        return true;
    } else {
        throw new Error("Something went wrong");
    }
}

/*const createCourse = async (course, username, password) => {
    const response = await api('/courses', 'POST', course, { username, password });
    console.log(response)  
    if (response.status === 201) {
        return response.json(); 
} else {
        console.error(`Error status: ${response.status}`);
        console.error(`Response body: ${await response.text()}`);
    }
}*/

// We create a new React component that will be used as a provider for the context object.
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
          signUp,
          signOut,
/*          createCourse
*/        }
      }}>
        {props.children}
      </UserContext.Provider>
    );
}
export default UserContext;