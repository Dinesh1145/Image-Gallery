import { GET_IMAGE_LIST, SET_PAGE, SET_SEARCH } from '../constants'

export const getImageList = (data) => {
    return {
        type: GET_IMAGE_LIST,
        data
    }
}
export const updateSearch = (data) => {
    return {
        type: SET_SEARCH,
        data
    }
}
export const updatePage = () => {
    return {
        type: SET_PAGE
    }
}