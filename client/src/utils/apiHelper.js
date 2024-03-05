
export const api = (
    path, method = 'GET',
    body = null,
    credentials = null
) => {
    const url = 'https://full-stack-appreactrestapi-production.up.railway.app/api' + path;

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