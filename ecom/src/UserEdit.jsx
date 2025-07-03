import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:5000/api/users`);
      const data = await res.json();
      const user = data.find((u) => u._id === id);
      if (user) {
        setFormData({
          name: user.name,
          email: user.email,
          profile: null,
        });
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prev) => ({ ...prev, profile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.profile) {
      data.append('profile', formData.profile);
    }

    const res = await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'PUT',
      body: data,
    });

    const result = await res.json();
    alert(result.message || 'User updated');
    navigate('/userlist');
  };

  return (
    <div style={{ width: '350px', margin: '30px auto' }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />
        <input type="file" name="profile" onChange={handleChange} /><br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UserEdit;
