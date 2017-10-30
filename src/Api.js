import axios from 'axios';

export function postSecret2(secret) {
    axios.post('http://localhost:3434/secrets', secret)
    .then(function (response) {
        console.log('API: returning data: ' + JSON.stringify(response.data));
        return response.data;
    })
    .catch(function (error) {
        console.log('Some error when posting ' + error);
    });
}

export function postSecret(secret) {
    console.log('SAGA: Handling message: ' + secret.message);
    fetch("http://localhost:3434/secrets", {
        mode: 'cors',
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(secret)
    })
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            const contentType = response.headers.get('Content-Type') || '';
            if (contentType.includes('application/json')) {
                return response.json();
            }
            if (contentType.includes('text/html')) {
                return response.text();
            }
            return Promise.reject('Invalid content type: ' + contentType);
        }
        if (response.status === 404) {
            return Promise.reject('Page not found');
        }
        return Promise.reject(response.status);
    });
}

