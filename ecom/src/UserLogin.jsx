import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from './assets/login.jpg'

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Login Successful');
      localStorage.setItem('user', JSON.stringify(result.user));
      navigate('/bakery');
    } else {
      alert(result.error || 'Login failed');
    }
  };

  return (
     <div
              style={{
                backgroundImage: `url(${login})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                textShadow: '1px 1px 5px #000',
               }}>
    <div style={styles.container}>
      <h2 style={styles.heading}> User Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        /><br /><br />
        <button type="submit" style={styles.loginBtn}>Login</button><br /><br />
        <Link to="/usersignup">
          <button style={styles.signupBtn}>Sign Up</button>
        </Link>
      </form>
    </div>
    </div>
  );
}

const styles = {
  container: {
    width: '360px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#efa6cf',  
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  heading: {
    color: '#FFFFFF', 
    marginBottom: '20px',
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid rgb(233, 237, 239)', 
    borderRadius: '8px',
    outline: 'none',
  },
  loginBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#474746', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  signupBtn: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#474746', 
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default UserLogin;
