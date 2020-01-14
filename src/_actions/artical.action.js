import { articalConstants } from '../_constants';
import { articalService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const articalActions = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
};

function create(artical) {
    return dispatch => {
			dispatch(request(artical));
			articalService.create(artical)
				.then(
					artical => { 
							dispatch(success());
							history.push('/artical');
							dispatch(alertActions.success('Artical added successful'));
					},
					error => {
							dispatch(failure(error.toString()));
							dispatch(alertActions.error(error.toString()));
					}
				);
    };

    function request(artical) { return { type: articalConstants.CREATE_REQUEST, artical } }
    function success(artical) { return { type: articalConstants.CREATE_SUCCESS, artical } }
    function failure(error) { return { type: articalConstants.CREATE_FAILURE, error } }
}
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

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        articalService.getById(id).then(
			(artical) => {
                dispatch(success(artical));
            });
    };

    function request(id) { return { type: articalConstants.GET_REQUEST, id } }
    function success(artical) { return { type: articalConstants.GET_SUCCESS, artical } }
    function failure(id, error) { return { type: articalConstants.GET_FAILURE, id, error } }
}

function update(artical){
    return dispatch => {
        dispatch(request(artical));

        articalService.update(artical).then(
			(artical) => {
                dispatch(success(artical));
                history.push('/artical');
            });
    };

    function request(artical) { return { type: articalConstants.UPDATE_REQUEST, artical } }
    function success(artical) { return { type: articalConstants.UPDATE_SUCCESS, artical } }
    function failure(artical, error) { return { type: articalConstants.UPDATE_FAILURE, artical, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        articalService.delete(id)
					.then(
						artical => { 
							dispatch(success(id));
							window.location.reload();
							dispatch(alertActions.success('Artical delete successful'));
						},
						error => {
								dispatch(failure(id, error.toString()));
								dispatch(alertActions.error(id, error.toString()));
						}
					);
    };

    function request(id) { return { type: articalConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: articalConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: articalConstants.DELETE_FAILURE, id, error } }
}