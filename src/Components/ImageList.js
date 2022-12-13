import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getImageList } from '../Redux/actions/action'
import SingleProduct from './SingleImage'

const ImageList = () => {
    let images = useSelector(state => state.imageReducer.imageData)
    // let globalSearch = useSelector(state => state.imageReducer.data)
    // console.log(globalSearch)
    let dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadMore = (e) => {
        // setCurrentPage(prev => prev + 1);
        //TODO: page change
    }

    useEffect(() => {
        dispatch(getImageList({ page: currentPage, search: "" }))
    }, [currentPage])

    return (
        <>
            <div className='imageContainer'>
                {images != undefined && images.length != 0 && images.map((image) => {
                    return <SingleProduct key={image?.id} image={image} />
                })}
            </div>
            <div className='mb-4'>
                {(images == undefined || images.length == 0) ? <h5 className='w-100 mx-auto'>No Images Found</h5> :
                    <Button variant='dark' onClick={handleLoadMore}>
                        Load More
                    </Button>}
            </div>
        </>

    )
}

export default ImageList