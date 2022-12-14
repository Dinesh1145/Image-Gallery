import { GET_IMAGE_LIST, SET_IMAGE_LIST, SET_LOADING } from "./constants";
import { takeEvery, put } from 'redux-saga/effects'


function* getImages(data) {
    try {
        const { page, search } = data.data
        let res
        if (search) {
            res = yield fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&page=${page}&query=${search}`);
        } else {
            res = yield fetch(`https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&page=${page}`);
        }
        res = yield res.json();
        yield put({ type: SET_IMAGE_LIST, data: search ? res?.results : res })
    } catch (err) {
        console.error("err", err)
        alert(err)
        yield put({ type: SET_LOADING, data: false })
    }
}


function* imageSaga() {
    yield takeEvery(GET_IMAGE_LIST, getImages)
}

export default imageSaga;