import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(stored);

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserId(user._id);
  }, []);

  const updateCartInStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (index, qty) => {
    const updated = [...cartItems];
    updated[index].quantity = Math.max(1, parseInt(qty) || 1);
    updateCartInStorage(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    updateCartInStorage(updated);
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    const orderData = {
      userId,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount: getTotal(),
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();
      alert(result.message || "Order placed!");
      localStorage.removeItem("cart");
      setCartItems([]);
      navigate('/myorders');
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={styles.empty}>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} style={styles.item}>
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
                style={styles.image}
              />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  style={styles.qtyInput}
                />
                <button onClick={() => handleRemoveItem(index)} style={styles.deleteBtn}>🗑️</button>
              </div>
            </div>
          ))}

          <h3 style={styles.total}>Total: ₹{getTotal()}</h3>
          <button onClick={handleCheckout} style={styles.checkoutBtn}>✅ Place Order</button>
        </>
      )}
    </div>
  );
}


const styles = {
  container: {
    padding: '30px',
    maxWidth: '600px',
    margin: 'auto',
    background: '#fff8f0',
    borderRadius: '10px',
    boxShadow: '0 0 10px #f4dada',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
  },
  item: {
    display: 'flex',
    gap: '15px',
    padding: '10px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  qtyInput: {
    width: '50px',
    padding: '5px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  total: {
    textAlign: 'right',
    marginTop: '20px',
    fontSize: '18px',
  },
  checkoutBtn: {
    backgroundColor: '#ff69b4',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    float: 'right',
    marginTop: '10px',
  },
};

export default Cart;
