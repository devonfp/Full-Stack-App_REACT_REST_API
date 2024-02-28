
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
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {throw err;});
        }
        return response.json();
    });
};