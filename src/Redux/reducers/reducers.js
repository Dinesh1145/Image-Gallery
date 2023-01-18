import { SET_IMAGE_LIST, SET_SEARCH, SET_PAGE, SET_LOADING } from '../constants'

const initialState = {
    imageData: [],
    pageSearch: { page: 1, search: "" },
    isLoading: true,
    total: 0
}
export default function imageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IMAGE_LIST:
            if (state.pageSearch.page > 1) {
                return { ...state, imageData: [...state.imageData, ...action.data], isLoading: false }
            } else {
                return { ...state, imageData: [...action.data], isLoading: false }
            }
        case SET_SEARCH:
            return { ...state, pageSearch: { page: 1, search: action.data }, isLoading: true }
        case SET_PAGE:
            return { ...state, pageSearch: { page: state.pageSearch.page + 1, search: state.pageSearch.search }, isLoading: true }
        case SET_LOADING:
            return { ...state, isLoading: action.data, pageSearch: { page: 1, search: "" } }
        default:
            return state
    }
}