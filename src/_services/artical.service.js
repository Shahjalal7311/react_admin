import { baseService } from './config/base.service';
import { userConstants } from '../_constants';
import { authHeader } from '../_helpers';

export const articalService = {
    create,
    getAll,
    getTotal,
    getById,
    update,
    delete: _delete
};

let apiUrl = baseService();

function create(artical) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(artical)
    };
    return fetch(`${apiUrl}/articalcreate`, requestOptions).then(handleResponse);
}

function getAll(limit) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/articalsget/${limit}`, requestOptions).then(handleResponse);
}

function getTotal(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/articalstotal`, requestOptions).then(handlecount);
}

 async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // console.log(id,'idddd');
    const data = await fetch(`${apiUrl}/singlearticalget/${id}`, requestOptions).then(handleResponseSing);
    return data.artical;
}

function update(artical) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(artical)
    };
    return fetch(`${apiUrl}/singlearticalupdate/${artical._id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${apiUrl}/articalremove/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                return response.status;
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        const res = {
            "articals": data.articals
        };
        return res;
    });
}

function handleResponseSing(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                return response.status;
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function handlecount(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                return response.status;
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // console.log(data,'hhhh');
        return data.articals_total.length;
    });
}