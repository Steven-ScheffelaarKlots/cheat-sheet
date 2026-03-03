# React Interview — Shopping Cart

**Time:** 30–40 minutes
**File to edit:** `shopping-cart.tsx`

---

## Overview

Build a functional shopping cart in React. The product data, TypeScript interfaces, and CSS class names are already provided. Your job is to wire up the state and logic.

---

## What's Already Provided

| Thing | Description |
|---|---|
| `PRODUCTS` | Array of 5 pet-store products with `id`, `name`, `price`, `emoji` |
| `Product` interface | Type for a single product |
| `CartItem` interface | `{ product: Product; quantity: number }` |
| `shopping-cart.css` | All CSS — **do not modify**, just use the class names |
| JSX skeleton | Rough structure with `TODO` comments |

---

## Requirements

### 1. State
- Add a `cart` state variable — an array of `CartItem`.

### 2. `addToCart(product)`
- If the product is already in the cart, increment its quantity by 1.
- Otherwise, add a new `CartItem` with `quantity: 1`.

### 3. `removeFromCart(productId)`
- Remove that item from the cart entirely.

### 4. `updateQuantity(productId, quantity)`
- Set the item's quantity to the given value.
- If the new quantity is `0` or less, remove the item instead.

### 5. `getTotal()`
- Return the sum of `price × quantity` for every item in the cart.

### 6. Product list
- The "Add to Cart" button for each product should call `addToCart`.

### 7. Cart section
- Show **"Your cart is empty."** when the cart has no items.
- When items exist, render each `CartItem` showing:
  - Emoji + product name
  - `−` button → calls `updateQuantity(id, quantity - 1)`
  - Current quantity
  - `+` button → calls `updateQuantity(id, quantity + 1)`
  - Line total (`price × quantity`, formatted to 2 decimal places)
  - Remove button (`✕`) → calls `removeFromCart`
- Show the cart total and a **Checkout** button at the bottom (button can be a no-op for now).

---

## CSS Class Names Reference

```
.shop-layout          — outer grid wrapper
.product-list         — left column list
.product-card         — single product row
.product-emoji        — large emoji span
.product-info         — name + price column
.product-name         — product name span
.product-price        — price span
.cart                 — right column cart panel
.cart-items           — wrapper for cart item rows
.cart-item            — single cart item row
.cart-item-name       — name inside cart item
.cart-item-line-total — price × qty display
.quantity-controls    — wrapper for −/count/+ controls
.quantity-count       — the number between the buttons
.empty-cart           — "Your cart is empty." paragraph
.cart-footer          — total + checkout row
.cart-total           — total price span
.btn                  — base button class (always add this)
.btn-add              — blue "Add to Cart" button
.btn-qty              — grey quantity +/- button
.btn-remove           — red remove button
.btn-checkout         — green checkout button
```

---

## Stretch Goals *(if time allows)*

- Disable "Add to Cart" when the item is already in the cart (or change the button label to "In Cart").
- Show the number of items in the cart in the section heading, e.g. **Cart (3)**.
- Add a "Clear Cart" button that empties the cart.

---

## Hints

- `useState` is the only hook you need.
- Use `.map()` to render lists and `.find()` / `.filter()` for cart lookups.
- Keep all logic inside the component — no need for context or reducers.
