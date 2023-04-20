import React, { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [cateogry, setCateogry] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    
    const addProduct = async () => {
        console.log(name, price, cateogry, company, userId);

        console.log(!name);
        if (!name || !price || !cateogry || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'));
        console.log(userId._id);

        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, cateogry, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    return (
        <div className="Product">
            <h1 className="adduphead">Add Product</h1>
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
            {error && !name && <span className='invalidInput'>Enter Valid Name</span>}
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
            {error && !price && <span className='invalidInput'>Enter Valid Price</span>}
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
            {error && !cateogry && <span className='invalidInput'>Enter Valid Cateogry</span>}
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
            <Button variant="secondary" size="lg" onClick={addProduct} className='appbutton'>Add</Button>
        </div >
    )
}

export default AddProduct;