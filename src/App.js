import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Basic T-Shirt",
    description: "100% cotton, classic fit.",
    price: 19.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Denim Jeans",
    description: "Straight-leg cut, durable fabric.",
    price: 49.99,
    image: "https://via.placeholder.com/150",
  },
];

export default function OnlineStoreMVP() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div style={{ padding: "16px", maxWidth: "700px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Online Store MVP</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
          gap: "16px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", marginBottom: "8px" }}
            />
            <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{product.name}</h2>
            <p style={{ color: "#555" }}>{product.description}</p>
            <p style={{ fontWeight: "bold", margin: "8px 0" }}>${product.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "32px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "12px" }}>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div>
                  <p style={{ margin: 0 }}>
                    {item.name} x {item.quantity}
                  </p>
                  <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      marginRight: "8px",
                      padding: "4px 8px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <p style={{ fontWeight: "bold" }}>Total: ${total}</p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
