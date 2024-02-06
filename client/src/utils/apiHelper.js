
export const api = (
    path, method = 'GET',
    body = null,
    credentials = null
) => {
    const url = 'http://localhost:5000/api' + path;

    const options = {
        method,
        headers: {}
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers['Content-Type'] = 'application/json; charset=UTF-8';
    }

    if (credentials) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options)
};

/*export const createCourse = async (course, user) => {
    console.log(course); // Log the course object
    console.log(user); // Log the user object
    const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${user.username}:${user.password}`)}`
        },
        body: JSON.stringify(course)
    });

    console.log(response); // Log the response here


    if (response.ok) {
        return response.json();
    }
    throw new Error('Error creating course');
};*/