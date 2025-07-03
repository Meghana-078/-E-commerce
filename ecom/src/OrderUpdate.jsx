import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function OrderUpdate() {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/orders`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(o => o._id === id);
        setOrder(found);
        setStatus(found.status);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    alert(result.message || 'Order status updated');
  };

  if (!order) return <p>Loading order...</p>;

  return (
    <div style={{ width: '400px', margin: '30px auto' }}>
      <h2>Update Order Status</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>User:</strong> {order.userId?.name}</p>
      <p><strong>Current Status:</strong> {order.status}</p>

      <form onSubmit={handleUpdate}>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select><br /><br />
        <button type="submit">Update Status</button>
      </form>
    </div>
  );
}

export default OrderUpdate;
