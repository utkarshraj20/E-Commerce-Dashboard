
import React from 'react';

import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav'

import Footer from './components/Footer';

import SignUp from './components/SignUp';

import AddProduct from './components/AddProduct';

import ProductList from './components/ProductList';

import UpdateProduct from './components/UpdateProduct';

import PrivateComponent from './components/PrivateComponent';

import Profile from './components/Profile';

import SelectProduct from './components/SelectProduct';

import Home from './components/Home';

import Login from './components/login';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element = {<PrivateComponent />}>
            <Route path = "/" element = {<ProductList />} />
            <Route path = "/add" element = {<AddProduct />} />
            <Route path = "/update/:id" element = {<UpdateProduct />} />
            <Route path = "/select" element = {<SelectProduct />} />
            <Route path = "/profile" element = {<Profile />} />
          </Route> 
          <Route path = "/home" element = {<Home />} />
          <Route path = "/signup" element = {<SignUp />} />
          <Route path = "/login" element = {<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
