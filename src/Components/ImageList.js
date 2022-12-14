import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getImageList, updatePage } from '../Redux/actions/action'
import SingleProduct from './SingleImage'

const ImageList = () => {
    let imageReducer = useSelector(state => state.imageReducer)
    let { imageData, pageSearch, isLoading } = imageReducer
    let dispatch = useDispatch()

    const handleLoadMore = () => {
        dispatch(updatePage())
    }

    useEffect(() => {
        dispatch(getImageList({ page: pageSearch?.page ?? 1, search: pageSearch?.search ?? "" }))
    }, [pageSearch])

    return (
        <React.Fragment>
            <div className='imageContainer'>
                {imageData !== undefined && imageData.length !== 0 && imageData.map((image) => {
                    return <SingleProduct key={image?.id} image={image} />
                })}
            </div>
            <div className='mb-4'>
                {isLoading ? <h6>loading....</h6> : (imageData === undefined || imageData.length === 0) ? <h5 className='w-100 mx-auto'>No Images Found</h5> :
                    (
                        imageData.length >= 10 &&
                        <Button variant='dark' onClick={handleLoadMore}>
                            Load More
                        </Button>
                    )
                }
            </div>
        </React.Fragment>

    )
}

export default ImageList