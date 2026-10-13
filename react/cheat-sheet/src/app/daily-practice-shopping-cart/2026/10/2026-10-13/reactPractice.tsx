"use client";

import React, { useState, useEffect } from "react";

//Endpoint with product data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ENDPOINT = "https://fakestoreapi.com/products";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface ShoppingCartItem {
    item: Product;
    quantity: number;
}

type ShoppingCartList = ShoppingCartItem[];

const ShoppingCart = () => {
    const [productList, setProductList] = useState<Product[]>([]);
    const [shoppingCartContents, setShoppingCartContents] =
        useState<ShoppingCartList>([]);

    const addItemToCart = (product: Product) => {
        if (shoppingCartContents.findIndex(item => item.item.id === product.id) !== -1) {
            increaseItemQuantity(product.id)
        } else {
            setShoppingCartContents(prev => [...prev, {quantity: 1, item: product}])
        }
    };

    const removeItemFromCart = (id: number) => {
        setShoppingCartContents((prev) =>
            prev.filter((item) => item.item.id !== id),
        );
    };

    const setItemQuantity = (id: number, quantity: number) => {
        if (quantity === 0) {
            removeItemFromCart(id);
        } else {
            // Productlist[2].quantity = 3
            const tempCart = [...shoppingCartContents];
            const index = tempCart.findIndex((item) => item.item.id === id);
            if (index !== -1) {
            tempCart[index] = {
                quantity: quantity,
                item: tempCart[index].item
            }
        }
            setShoppingCartContents(tempCart);
        }
    };

    const increaseItemQuantity = (id: number) => {
        const item = shoppingCartContents.find((item) => item.item.id === id);
        if (item) {
            setItemQuantity(id, item.quantity + 1);
        }
    }

    const decreaseItemQuantity = (id:number) => {
        const item = shoppingCartContents.find((item) => item.item.id === id);
        if (item) {
            if (item.quantity === 1) {
                removeItemFromCart(id)
            } else {
                setItemQuantity(id, item.quantity - 1);
            }
        }
    }

        const calculateCartTotal = () => {
            return shoppingCartContents.reduce((total, item) => total + item.quantity * item.item.price, 0)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await (await fetch(ENDPOINT)).json();
            setProductList(response);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div>
                <h1>Shopping Cart</h1>
                <div>
                    <h3>Items</h3>
                    {shoppingCartContents.map((item) => (
                        <div key={item.item.id}>
                            <div>{item.item.title}</div>
                            <div><button onClick={() => decreaseItemQuantity(item.item.id)}>-</button>{item.quantity}<button onClick={() => increaseItemQuantity(item.item.id)}>+</button></div>
                            <div>{(item.item.price * item.quantity).toFixed(2)}</div>
                            <button onClick={() => removeItemFromCart(item.item.id)}>Remove</button>
                        </div>
                    ))}
                    <div>Total: {calculateCartTotal().toFixed(2)}</div>
                </div>
            </div>
            
            <h1>Products</h1>
            {productList.map((product) => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>${product.price}</p>
                    <button onClick={() =>addItemToCart(product)}>Add to cart</button>
                </div>
            ))}
        </div>
    );
};

export default ShoppingCart;
