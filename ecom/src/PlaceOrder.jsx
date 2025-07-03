import React, { useEffect, useState } from 'react';

function PlaceOrder() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

   
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setUserId(user._id);
  }, []);

  const handleQuantityChange = (productId, qty) => {
    setQuantities({ ...quantities, [productId]: parseInt(qty) || 0 });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    const items = Object.keys(quantities)
      .filter(id => quantities[id] > 0)
      .map(id => ({
        productId: id,
        quantity: quantities[id],
      }));

    const totalAmount = items.reduce((sum, item) => {
      const product = products.find(p => p._id === item.productId);
      return sum + (product.price * item.quantity);
    }, 0);

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items, totalAmount }),
    });

    const result = await res.json();
    alert(result.message || 'Order placed!');
  };

  return (
    <div style={{ width: '600px', margin: '20px auto' }}>
      <h2>Place an Order</h2>
      <form onSubmit={handleOrder}>
        {products.map(product => (
          <div key={product._id} style={{ marginBottom: '10px' }}>
            <strong>{product.name}</strong> - ₹{product.price} &nbsp;
            <input
              type="number"
              min="0"
              placeholder="Qty"
              onChange={(e) => handleQuantityChange(product._id, e.target.value)}
            />
          </div>
        ))}
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default PlaceOrder;
