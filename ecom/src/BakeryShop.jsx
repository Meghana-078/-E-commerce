import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BakeryShop() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    alert('Added to cart!');
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.navbar}>
        <h1 style={styles.brand}>Sweet Treats</h1>
        <div style={styles.rightHeader}>
          {user && (
            <div style={styles.userBox}>
              <img
                src={`http://localhost:5000/${user.profile}`}
                alt="Profile"
                style={styles.userImage}
              />
              <span style={styles.userText}>Hi, {user.name}</span>
            </div>
          )}
          <Link to="/cart">
            <button style={styles.cartBtn}>🛒 Cart ({cartCount})</button>
          </Link>
          <Link to="/myorders">
            <button style={styles.orderBtn}>📜 View Orders</button>
          </Link>
        </div>
      </header>

      {/* Product List */}
      <div style={styles.productGrid}>
        {products.map(product => (
          <div key={product._id} style={styles.card}>
            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
              style={styles.image}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)} style={styles.btn}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: 'sans-serif',
    backgroundColor: '#fff8f0',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#ffe5ec',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: '28px',
    color: '#d63384',
    margin: 0,
  },
  rightHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  userImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #d63384',
  },
  userText: {
    fontWeight: 'bold',
    color: '#444',
  },
  cartBtn: {
    backgroundColor: '#ff69b4',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  orderBtn: {
    backgroundColor: '#6a5acd',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '40px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '200px',
    padding: '15px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  btn: {
    backgroundColor: '#ffa07a',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default BakeryShop;
