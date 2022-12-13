import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, Navbar } from 'react-bootstrap';
import "./style.css"
import { FaSearch } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { getImageList } from '../Redux/actions/action';

const Header = () => {
    let { globalSearch } = useSelector(state => state.imageReducer.data)
    const [search, setSearch] = useState(globalSearch ?? "");
    let dispatch = useDispatch();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        dispatch(setSearch(search))
    }

    useEffect(() => {
        dispatch(getImageList({ page: 1, search: search }))
    }, [search])

    return (
        <Navbar bg="dark" variant="dark" className="header">
            <Container>
                <Navbar.Brand>
                    <a href="#">Image Gallery</a>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <FormControl
                        style={{ width: 500 }}
                        type="search"
                        name="search"
                        value={search}
                        onChange={handleChange}
                        placeholder="Search For Photos.."
                        className="m-auto"
                        aria-label="Search"
                    />
                </Navbar.Text>
                <Button
                    variant="light"
                    onClick={handleSearch}
                >
                    <FaSearch className='mt-0' />
                </Button>
            </Container>
        </Navbar>
    )
}

export default Header;