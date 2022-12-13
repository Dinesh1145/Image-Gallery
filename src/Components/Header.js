import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, Navbar } from 'react-bootstrap';
import "./style.css"
import { FaSearch } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { updateSearch } from '../Redux/actions/action';

const Header = () => {
    let imageReducer = useSelector(state => state.imageReducer)
    const [search, setSearch] = useState(imageReducer?.data?.search ?? "");
    let dispatch = useDispatch();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch = () => {
        dispatch(updateSearch(search))
    }
    return (
        <Navbar bg="dark" variant="dark" className="header">
            <Container className='d-flex flex-wrap'>
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
                    <Button
                        variant="light"
                        onClick={handleSearch}
                    >
                        <FaSearch className='mt-0' />
                    </Button>
                </Navbar.Text>

            </Container>
        </Navbar>
    )
}

export default Header;