import * as types from '../types/types';
const initialState = {
    loading: false,
    msgError: null,
    msgSuccess: null
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UISTARTLOADING:
            return {
                ...state,
                loading: true
            }
        case types.UIFINISHLOADING:
            return {
                ...state,
                loading: false
            }
        case types.UIERROR:
            return {
                ...state,
                msgError: action.payload
            }
        case types.UIREMOVEERROR:
            return {
                ...state,
                msgError: null
            }
        case types.UISUCCESS:
            return {
                ...state,
                msgSuccess: action.payload
            }
        case types.UIREMOVESUCCESS:
            return {
                ...state,
                success: null
            }
        default:
            return state
    }
}