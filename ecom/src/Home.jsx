import React from 'react';
import { Link } from 'react-router-dom';
import bakeryBg from './assets/bake.jpg'; 

function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${bakeryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff',
        textShadow: '1px 1px 5px #000',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to Sweet Treats </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
        Freshly baked delights delivered to your doorstep!
      </p>
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/AdminLogin">
          <button style={buttonStyle}>Admin Login</button>
        </Link>
        <Link to="/UserLogin">
          <button style={buttonStyle}>User Login</button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '12px 30px',
  fontSize: '16px',
  backgroundColor: '#ff69b4',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  color: 'white',
  boxShadow: '2px 2px 8px rgba(0,0,0,0.3)',
};

export default Home;
