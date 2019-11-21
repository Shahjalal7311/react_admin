import { articalConstants } from '../_constants';

export function articals(state = {}, action) {
  switch (action.type) {
    case articalConstants.CREATE_REQUEST:
      return { registering: true };
    case articalConstants.CREATE_SUCCESS:
      return {};
    case articalConstants.CREATE_FAILURE:
      return {};
    case articalConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case articalConstants.GETALL_SUCCESS:
      return {
        items: action.articals
      };
    case articalConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case articalConstants.GET_REQUEST:
      return {
        loading: true
      };
    case articalConstants.GET_SUCCESS:
      return {
        item: action.artical
      };
    case articalConstants.GET_FAILURE:
      return { 
        error: action.error
      };  
    case articalConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(articals =>
          articals.id === action.id
            ? { ...articals, deleting: true }
            : articals
        )
      };
    case articalConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(artical => artical.id !== action.id)
      };
    case articalConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(artical => {
          if (artical.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...articalCopy } = artical;
            // return copy of user with 'deleteError:[error]' property
            return { ...articalCopy, deleteError: action.error };
          }

          return artical;
        })
      };
    default:
      return state
  }
}