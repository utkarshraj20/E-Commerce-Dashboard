import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom'
import { get } from 'request';
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {

            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();

        setProducts(result);
    }

    const deleteProduct = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'Delete',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();

        if (result) {
            getProducts();
            // alert("record is deleted");
        }
    }
    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });

            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else {
            getProducts();
        }


    }
    console.log("products", products);
    return (
        <>
            <h1 className='product-list'>Product List</h1>

            <Col xs={10}>
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Search Product"
                    className='SearchBox'
                >
                    <Form.Control
                        type="text"
                        onChange={searchHandle}
                        placeholder="Search Product"
                        aria-describedby="Search"
                    />
                </FloatingLabel>
            </Col>


            <div className='scrollit'>
                <Table striped className='product-list scrollit'>
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Cateogry</th>
                            <th>Company</th>

                        </tr>
                    </thead>
                    {products.length > 0 ? products.map((item, index) =>

                        <tbody key={item._id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.cateogry}</td>
                                <td>{item.company}</td>
                            </tr>
                        </tbody>
                    )
                        :
                        <tbody>
                            <tr><td colSpan={6}><h1 className='NotFound'>No Result Found!</h1></td></tr>
                        </tbody>
                    }
                </Table>
            </div>
        </>
    )
}

export default ProductList;