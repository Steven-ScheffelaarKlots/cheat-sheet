import React from "react";
import "./shopping-cart.css";

// --- Data provided for the candidate ---

interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

// Exported so the candidate can use it in their implementation
export interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Dog Food", price: 29.99, emoji: "🦴" },
  { id: 2, name: "Cat Toy", price: 9.99, emoji: "🐱" },
  { id: 3, name: "Bird Cage", price: 49.99, emoji: "🐦" },
  { id: 4, name: "Fish Tank", price: 79.99, emoji: "🐟" },
  { id: 5, name: "Hamster Wheel", price: 14.99, emoji: "🐹" },
];

// --- TODO: Implement the ShoppingCart component ---
// See README.md for full requirements

const ShoppingCart: React.FC = () => {
  // TODO: Add state for the cart (CartItem[])

  // TODO: Implement addToCart(product: Product) — void
  // If product already in cart, increase quantity; otherwise add with quantity 1

  // TODO: Implement removeFromCart(productId: number) — void
  // Remove the item entirely from the cart

  // TODO: Implement updateQuantity(productId: number, quantity: number) — void
  // Update quantity; remove item if quantity drops to 0

  // TODO: Implement getTotal() — number
  // Sum of price * quantity for all cart items

  return (
    <div className="shop-layout">
      {/* --- Product List --- */}
      <section className="product-list">
        <h2 className="section-title">Products</h2>
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <span className="product-emoji">{product.emoji}</span>
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
            {/* TODO: Add "Add to Cart" button that calls addToCart */}
            <button className="btn btn-add">Add to Cart</button>
          </div>
        ))}
      </section>

      {/* --- Cart --- */}
      <section className="cart">
        <h2 className="section-title">Cart</h2>

        {/* TODO: Show "Your cart is empty." when no items */}
        <p className="empty-cart">Your cart is empty.</p>

        {/* TODO: Render cart items. Each item should show:
              - product name and emoji
              - quantity controls (- button, count, + button)
              - line total (price * quantity)
              - remove button
        */}

        {/* TODO: Show total and a "Checkout" button when cart has items */}
        <div className="cart-footer">
          <span className="cart-total">Total: $0.00</span>
          <button className="btn btn-checkout">Checkout</button>
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
