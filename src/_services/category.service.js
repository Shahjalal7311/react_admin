import { baseService } from './config/base.service';
import { categoryConstants } from '../_constants';
import { authHeader } from '../_helpers';

export const categoryService = {
    create,
    getAll,
    getTotal,
    getById,
    update,
    delete: _delete
};

let apiUrl = baseService();

function create(category) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };
    console.log(category,'category');
    return fetch(`${apiUrl}/categorycreate`, requestOptions).then(handleResponse);
}

function getAll(limit) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/categoryget/${limit}`, requestOptions).then(handleResponse);
}

function getTotal(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${apiUrl}/categorystotal`, requestOptions).then(handlecount);
}

 async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    // console.log(id,'idddd');
    const data = await fetch(`${apiUrl}/singlecategoryget/${id}`, requestOptions).then(handleResponseSing);
    return data.category;
}

function update(category) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    };
    return fetch(`${apiUrl}/singlecategoryupdate/${category._id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`${apiUrl}/categoryremove/${id}`, requestOptions).then(handleResponse);
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
            "categorys": data.categorys
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
        return data.categorys_total.length;
    });
}