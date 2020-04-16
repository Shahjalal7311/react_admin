import { categoryConstants } from '../_constants';

export function categorys(state = {}, action) {
  switch (action.type) {
    case categoryConstants.CREATE_REQUEST:
      return { 
        ...state,
        registering: true 
      };
    case categoryConstants.CREATE_SUCCESS:
      return {
        ...state,
      };
    case categoryConstants.CREATE_FAILURE:
      return {
        ...state,
      };
    case categoryConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.categorys
      };
    case categoryConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case categoryConstants.GETTOTAL_REQUEST:
      return {
        ...state
      };
    case categoryConstants.GETTOTAL_SUCCESS:
      return {
        ...state,
        totalItems: action.totalItems
      };
    case categoryConstants.GETTOTAL_FAILURE:
      return { 
        ...state,
        error: action.error
      };  
    case categoryConstants.GET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case categoryConstants.GET_SUCCESS:
      return {
        ...state,
        item: action.category
      };
    case categoryConstants.GET_FAILURE:
      return { 
        ...state,
        error: action.error
      };  
    // case categoryConstants.DELETE_REQUEST:
    //   // add 'deleting:true' property to user being deleted
    //   return {
    //     ...state,
    //     items: state.items.map(categorys =>
    //       category.id === action.id
    //         ? { ...categorys, deleting: true }
    //         : categorys
    //     )
    //   };
    // case categoryConstants.DELETE_SUCCESS:
    //   // remove deleted user from state
    //   return {
    //     ...state,
    //     items: state.items.filter(category => category.id !== action.id)
    //   };
    // case categoryConstants.DELETE_FAILURE:
    //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
    //   return {
    //     ...state,
    //     items: state.items.map(category => {
    //       if (category.id === action.id) {
    //         // make copy of user without 'deleting:true' property
    //         const { deleting, ...categoryCopy } = category;
    //         // return copy of user with 'deleteError:[error]' property
    //         return { ...categoryCopy, deleteError: action.error };
    //       }

    //       return category;
    //     })
    //   };
    default:
      return state
  }
}