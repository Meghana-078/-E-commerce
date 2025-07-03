import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    isOffer: false,
    image: null,
  });

  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:5000/api/products`);
    const data = await res.json();
    const product = data.find(p => p._id === id);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        isOffer: product.isOffer,
        image: null, 
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('isOffer', formData.isOffer);
    if (formData.image) data.append('image', formData.image);

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      body: data,
    });

    const result = await res.json();
    alert(result.message || 'Product updated');
    navigate('/admin/products');
  };

  return (
    <div style={{ width: '400px', margin: '20px auto' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleUpdate}>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        /><br /><br />

        <textarea
          name="description"
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

        <input type="file" name="image" onChange={handleChange} /><br /><br />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default ProductEdit;
