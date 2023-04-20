import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [cateogry, setCateogry] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(params);

        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();

        setName(result.name);
        setPrice(result.price);
        setCateogry(result.cateogry);
        setCompany(result.company);
        // console.log(result);
    }
    const UpdateProduct = async () => {
        // console.log(name, price, cateogry, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({name, price, cateogry, company}),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/select');
    }
    return (
        <div className="Product">
            <h1 className="adduphead">Update Product</h1>
            <Col xs={7}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Product Name"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Product Name"
                        aria-describedby="Product Name"
                    />
                </FloatingLabel>
            </Col>
            
            <Col xs={7}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Product Price"
                    className="mb-3"
                >

                    <Form.Control
                        type="text"
                        value={price} onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Product Price"
                        aria-describedby="Price"
                    />
                </FloatingLabel>
            </Col>
            
            <Col xs={7}>
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Product Cateogry"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        value={cateogry} onChange={(e) => setCateogry(e.target.value)}
                        placeholder="Enter Product Cateogry"
                        aria-describedby="Cateogry"
                    />
                </FloatingLabel>
            </Col>
            
            <Col xs={7}>
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Product Company"
                    className="mb-3"
                >
                    <Form.Control
                        type="text"
                        value={company} onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter Product Company"
                        aria-describedby="Company"
                    />
                </FloatingLabel>
            </Col>
            <Button variant="secondary" size="lg" onClick={UpdateProduct} className='appbutton'>Update</Button>
        </div >
    )
}

export default UpdateProduct;