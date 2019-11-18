import { articalConstants } from '../_constants';
import { articalService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const articalActions = {
    getAll,
    delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        articalService.getAll()
            .then(
              articals => dispatch(success(articals)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: articalConstants.GETALL_REQUEST } }
    function success(articals) { return { type: articalConstants.GETALL_SUCCESS, articals } }
    function failure(error) { return { type: articalConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        articalService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: articalConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: articalConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: articalConstants.DELETE_FAILURE, id, error } }
}