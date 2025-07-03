import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user._id);
      fetch('http://localhost:5000/api/orders')
        .then(res => res.json())
        .then(data => {
          const userOrders = data.filter(order => order.userId._id === user._id);
          setOrders(userOrders);
        });
    }
  }, []);

  const handleDownloadPDF = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Sweet Treats - Order Receipt', 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 20, 35);
    doc.text(`Customer: ${order.userId?.name || 'Unknown'}`, 20, 45);
    doc.text(`Total Amount: ₹${order.totalAmount}`, 20, 55);
    doc.text(`Status: ${order.status}`, 20, 65);
    doc.text('Items:', 20, 80);

    let y = 90;
    order.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.productId?.name || 'Product'} × ${item.quantity}`, 25, y);
      y += 10;
    });

    doc.save(`order-${order._id}.pdf`);
  };

  return (
    <div style={styles.container}>
      <h2> My Orders</h2>
      {orders.length === 0 ? (
        <p style={styles.empty}>You haven’t placed any orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} style={styles.card}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> <span style={styles.status}>{order.status}</span></p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.productId?.name || 'Product'} × {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={() => handleDownloadPDF(order)} style={styles.downloadBtn}>
              📄 Download PDF
            </button>
          </div>
        ))
      )}
    </div>
  );
}


const styles = {
  container: {
    padding: '30px',
    maxWidth: '700px',
    margin: 'auto',
    fontFamily: 'sans-serif',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
  },
  card: {
    border: '1px solid #ccc',
    margin: '15px 0',
    padding: '15px',
    borderRadius: '10px',
    background: '#fffaf4',
    boxShadow: '0 0 8px rgba(0,0,0,0.05)',
  },
  status: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  downloadBtn: {
    backgroundColor: '#ff69b4',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default MyOrders;
