import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🧁 All Bakery Products</h2>
      {products.length === 0 ? (
        <p style={styles.noData}>No products found.</p>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <div key={product._id} style={styles.card}>
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                style={styles.image}
              />
              <h3>{product.name}</h3>
              <p><b>₹{product.price}</b></p>
              <p>{product.category}</p>
              <p style={styles.desc}>{product.description}</p>
              {product.isOffer && <p style={styles.offer}>🌟 Today's Offer</p>}
              <div style={styles.buttons}>
                <Link to={`/admin/edit-product/${product._id}`}>
                  <button style={styles.edit}>Edit</button>
                </Link>
                <button style={styles.delete} onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#fff7f0',
    minHeight: '100vh',
    padding: '40px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '30px',
    marginBottom: '30px',
    color: '#d35400',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '250px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  desc: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px',
  },
  offer: {
    color: 'green',
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  edit: {
    backgroundColor: '#6a5acd',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  delete: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  noData: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#777',
  },
};

export default ProductList;
