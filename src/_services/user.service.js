import { baseService } from './config/base.service';
import { userConstants } from '../_constants';
import { authHeader } from '../_helpers';
import { configureFakeBackend } from '../_helpers';
configureFakeBackend();

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    updateUser,
    checkAuth,
    delete: _delete
};

let apiUrl = 'http://localhost:3000/';
let _apipath = baseService();

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function checkAuth() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`/checkauthenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.getItem('user', JSON.stringify(user));
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${_apipath}/usersget`, requestOptions).then(handleResponseOth);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${_apipath}/usercreate`, requestOptions).then(handleResponse);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // console.log(id,'idddd');
    const data = await fetch(`${_apipath}/userget/${id}`, requestOptions).then(handleResponse);
    return data.user;
}

function updateUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${_apipath}/userupdate/${user._id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${_apipath}/userremove/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function handleResponseOth(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        const res = data.users;
        return res;
    });
}