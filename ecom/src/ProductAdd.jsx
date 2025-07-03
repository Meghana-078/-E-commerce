import React, { useState } from 'react';

function ProductAdd() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    isOffer: false,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('isOffer', formData.isOffer);
    data.append('image', formData.image);

    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert(result.message || 'Product added');
  };

  return (
    <div style={{ width: '400px', margin: '20px auto' }}>
      <h2>Add Bakery Product</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price ₹"
          value={formData.price}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br /><br />

        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          <option value="Cakes">Cakes</option>
          <option value="Pastries">Pastries</option>
          <option value="Cookies">Cookies</option>
          <option value="Snacks">Snacks</option>
        </select><br /><br />

        <label>
          <input
            type="checkbox"
            name="isOffer"
            checked={formData.isOffer}
            onChange={handleChange}
          />
          &nbsp; Mark as Today's Offer
        </label><br /><br />

        <input type="file" name="image" onChange={handleChange} required /><br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductAdd;
