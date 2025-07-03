import React, { useState } from 'react';
import admin from './assets/admin.jpg';
import adminbg from './assets/login.jpg';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function AdminSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profile: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profile', formData.profile);

    const res = await fetch('http://localhost:5000/api/admin/signup', {
      method: 'POST',
      body: data
    });

    const result = await res.json();
    alert(result.message || 'Signup successful');
    const navigate = useNavigate();
    navigate('/AdminLogin');

  };
   



  return (
    <div
          style={{
            backgroundImage: `url(${adminbg})`,
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
    <div className="main1">
      <form onSubmit={handleSubmit}>
        <center><strong>Admin SignUp</strong></center><br />
        <center><img src={admin} width="50px" height="50px" alt="admin" /></center>

        <div className="adminname">
          <label htmlFor="name">Name</label><br />
          <input type="text"
           name="name" 
           onChange={handleChange} required />
        </div>

        <div className="adminemail">
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" onChange={handleChange} required />
        </div>

        <div className="adminpassword">
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" onChange={handleChange} required />
        </div>

        <div className="adminphoto">
          <label htmlFor="profile">Profile</label><br />
          <input type="file" name="profile" onChange={handleChange} required />
        </div>

        <div className="loginpage">
        <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AdminSignup;
