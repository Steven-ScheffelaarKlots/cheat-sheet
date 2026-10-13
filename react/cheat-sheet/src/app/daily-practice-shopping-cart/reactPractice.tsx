'use client'

import React from 'react';

//Endpoint with product data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENDPOINT = "https://fakestoreapi.com/products"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ShoppingCart = () => {


    return (
        <div>This is a practice component</div>
    )
}


export default ShoppingCart
