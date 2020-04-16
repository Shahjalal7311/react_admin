import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    create,
    update,
    getById,
    getAll,
    getTotal,
    delete: _delete
};

function create(category) {
    return dispatch => {
			dispatch(request(category));
			categoryService.create(category)
				.then(
					category => { 
							dispatch(success());
							// history.push('/category');
							dispatch(alertActions.success('category added successful'));
					},
					error => {
							dispatch(failure(error.toString()));
							dispatch(alertActions.error(error.toString()));
					}
				);
    };

    function request(category) { return { type: categoryConstants.CREATE_REQUEST, category } }
    function success(category) { return { type: categoryConstants.CREATE_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.CREATE_FAILURE, error } }
}
function getAll(limit) {
    return dispatch => {
        dispatch(request());

        categoryService.getAll(limit)
            .then(
              categorys => dispatch(success(categorys)),
              error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categorys) { return { type: categoryConstants.GETALL_SUCCESS, categorys } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function getTotal(){
    return dispatch => {
        dispatch(request());

        categoryService.getTotal()
            .then(
            totalItems => dispatch(success(totalItems)),
              error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETTOTAL_REQUEST } }
    function success(totalItems) { return { type: categoryConstants.GETTOTAL_SUCCESS, totalItems } }
    function failure(error) { return { type: categoryConstants.GETTOTAL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.getById(id).then(
			(category) => {
                dispatch(success(category));
            });
    };

    function request(id) { return { type: categoryConstants.GET_REQUEST, id } }
    function success(category) { return { type: categoryConstants.GET_SUCCESS, category } }
    function failure(id, error) { return { type: categoryConstants.GET_FAILURE, id, error } }
}

function update(category){
    return dispatch => {
        dispatch(request(category));

        categoryService.update(category).then(
			(category) => {
                dispatch(success(category));
                history.push('/category');
            });
    };

    function request(category) { return { type: categoryConstants.UPDATE_REQUEST, category } }
    function success(category) { return { type: categoryConstants.UPDATE_SUCCESS, category } }
    function failure(category, error) { return { type: categoryConstants.UPDATE_FAILURE, category, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        categoryService.delete(id)
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

    function request(id) { return { type: categoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoryConstants.DELETE_FAILURE, id, error } }
}