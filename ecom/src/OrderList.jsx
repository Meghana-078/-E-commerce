import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}> Admin Order List</h2>

      {orders.map(order => (
        <div key={order._id} style={styles.card}>
          <div style={styles.row}>
            <strong>Order ID:</strong>
            <span>{order._id}</span>
          </div>

          <div style={styles.row}>
            <strong>User:</strong>
            <span>{order.userId?.name}</span>
          </div>

          <div style={styles.row}>
            <strong>Status:</strong>
            <span style={styles.status}>{order.status}</span>
          </div>

          <div style={styles.row}>
            <strong>Total Amount:</strong>
            <span>₹{order.totalAmount}</span>
          </div>

          <div>
            <strong>Items:</strong>
            <ul style={styles.itemList}>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.productId?.name} × {item.quantity} = ₹
                  {item.productId?.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => navigate(`/order/update/${order._id}`)}
            style={styles.editBtn}
          >
            Edit Order
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    width: '90%',
    maxWidth: '900px',
    margin: '30px auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    background: '#fffdfb',
  },
  title: {
    textAlign: 'center',
    color: '#5a5a5a',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#fff8f0',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '15px',
  },
  itemList: {
    paddingLeft: '20px',
    marginTop: '10px',
    marginBottom: '15px',
  },
  status: {
    color: '#ff6f61',
    fontWeight: 'bold',
  },
  editBtn: {
    backgroundColor: '#6a5acd',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default OrderList;
