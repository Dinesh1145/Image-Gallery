import React, { useEffect, useRef } from 'react'
import { Button, Container, FormControl, Navbar } from 'react-bootstrap';
import "./style.css"
import { FaSearch } from "react-icons/fa"
import { useDispatch } from 'react-redux';
import { updateSearch } from '../Redux/actions/action';
import menu from '../menu.json'

const Header = () => {
    const searchRef = useRef()
    let dispatch = useDispatch();
    console.log(menu)


    useEffect(() => {
        // fetch("../Data/menu.JSON")
        //     .then(res => res.json())
        //     .then(res => console.log(res)).catch(err => console.log(err))

        function getData() {
            try {
                const response = fetch('/menu.json', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then(result => {
                    console.log(result);
                    return result.json();
                }).then(res => console.log("res:", res))
            } catch (err) {
                return err
            }
        }
        const data = getData()
        // console.log(data)

    }, [])


    function  myDebounce (cb, delay){
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args);
            }, delay);
        };
    };

    function callback(e) {
        dispatch(updateSearch(e.target.value))
    } 

    const handleChange = myDebounce(callback, 800);

    const handleSearch = () => {
        dispatch(updateSearch(searchRef.current.value))
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
                        ref={searchRef}
                        onChange={handleChange}
                        placeholder="Search For Photos.."
                        className="m-auto search_input"
                        aria-label="Search"
                    />
                    <Button
                        variant="light"
                        onClick={handleSearch}
                    >
                        <FaSearch />
                    </Button>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Header;