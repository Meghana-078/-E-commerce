import React, { useState } from 'react';
import login from './assets/login.jpg'

function UserSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, profile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profile', formData.profile);

    const res = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    alert(result.message || 'User created!');
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
      <h2 style={styles.title}>Create User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="file"
          name="profile"
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
    </div>
  );
}

const styles = {
  container: {
    width: '400px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#efa6cf', 
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#ffff', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#474746',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default UserSignup;
