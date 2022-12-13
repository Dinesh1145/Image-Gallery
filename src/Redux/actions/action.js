import { GET_IMAGE_LIST, SET_IMAGE_LIST } from '../constants'

export const getImageList = (data) => {
    return {
        type: GET_IMAGE_LIST,
        data
    }
}

export const setImageList = (data) => {
    return {
        type: SET_IMAGE_LIST,
        data: data
    }
}