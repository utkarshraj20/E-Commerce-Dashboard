import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavB = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <>

            {auth ?
                <Navbar bg="warning" variant="tabs">
                
                    <Container>
                        <Navbar.Brand href="/home">GYP</Navbar.Brand>
                        <Nav variant="tabs" className='col-sm-11'>
                            <Nav.Link href="/">Search Product</Nav.Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link href="/add">Add Product</Nav.Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link href="/select">Update Product</Nav.Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link href="/signup" onClick={logout}>Logout({JSON.parse(auth).name})</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                :
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="/home">GYP</Navbar.Brand>
                        <Nav variant="tabs">
                            <Nav.Link href="/signup" >Sign Up</Nav.Link>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            }


        </>
    );
}

export default NavB;