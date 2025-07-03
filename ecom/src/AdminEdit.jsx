import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: '',
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin')
      .then(res => res.json())
      .then(data => {
        const selected = data.find(admin => admin._id === id);
        if (selected) {
          setFormData({
            name: selected.name,
            email: selected.email,
            profile: selected.profile,
          });
        }
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFile(files[0]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('email', formData.email);
    if (file) updatedData.append('profile', file);

    const res = await fetch(`http://localhost:5000/api/admin/${id}`, {
      method: 'PUT',
      body: updatedData,
    });

    const result = await res.json();
    alert(result.message);
    navigate('/AdminList');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Edit Admin</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            style={styles.input}
          />

          <input
            type="file"
            name="profile"
            onChange={handleChange}
            style={styles.input}
          />

          {formData.profile && (
            <img
              src={`http://localhost:5000/${formData.profile}`}
              alt="Admin"
              style={styles.image}
            />
          )}

          <button type="submit" style={styles.button}>Update</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '50vh',
  },
  card: {
    backgroundColor: '#cdb4db',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '60%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '10px auto',
  },
  button: {
    padding: '10px',
    backgroundColor: '#6a5acd',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default AdminEdit;
