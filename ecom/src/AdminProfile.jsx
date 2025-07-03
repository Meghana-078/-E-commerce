import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminProfile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('admin'));
    if (!adminData) {
      navigate('/AdminLogin');
    } else {
      setAdmin(adminData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/AdminLogin');
  };

  if (!admin) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.profileCard}>
          <img
            src={`http://localhost:5000/${admin.profile}`}
            alt="Admin"
            style={styles.image}
          />
          <h2 style={styles.name}>{admin.name}</h2>
          <p style={styles.email}>{admin.email}</p>
          <button onClick={handleLogout} style={styles.logout}>🚪 Logout</button>
        </div>

        <div style={styles.actions}>
          <ActionButton to="/orderlist" label="📦 Orders" />
          <ActionButton to="/admin/products" label="🧁 Products" />
          <ActionButton to="/AdminSignup" label="➕ Add Admin" />
          <ActionButton to="/userlist" label="👥 Users" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ to, label }) {
  return (
    <Link to={to} style={styles.link}>
      <button style={styles.button}>{label}</button>
    </Link>
  );
}


const styles = {
  page: {
    background: '#fff0f5',
    minHeight: '100vh',
    padding: '20px',
  },
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  profileCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: '0.3s',
  },
  image: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid #ffb6c1',
    marginBottom: '15px',
  },
  name: {
    fontSize: '26px',
    margin: '5px 0',
    color: '#333',
  },
  email: {
    fontSize: '16px',
    color: '#777',
  },
  logout: {
    marginTop: '20px',
    background: '#e74c3c',
    color: 'white',
    padding: '10px 22px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: '0.3s',
  },
  actions: {
    marginTop: '40px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#dda0dd',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s ease',
  },
  link: {
    textDecoration: 'none',
  },
};

export default AdminProfile;
