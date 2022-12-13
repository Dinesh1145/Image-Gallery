import { SET_IMAGE_LIST, SET_SEARCH, SET_PAGE } from '../constants'

const initialState = {
    imageData: [],
    data: { page: 1, search: null }
}
export default function imageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE_LIST:
            if (state.data.page > 1) {
                return { ...state, imageData: [...state.imageData, ...action.data] }
            } else {
                return { ...state, imageData: [...action.data] }
            }
        case SET_SEARCH:
            return { ...state, data: { page: 1, search: action.data } }
        case SET_PAGE:
            return { ...state, data: { page: state.data.page + 1, search: state.data.search } }
        default:
            return state
    }
}