import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminList() {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const res = await fetch('http://localhost:5000/api/admin');
    const data = await res.json();
    setAdmins(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/admin/${id}`, { method: 'DELETE' });
    fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div>
      <h2>Admins</h2>
      {admins.map(admin => (
        <div key={admin._id}>
          <p>{admin.name} - {admin.email}</p>
          <img src={`http://localhost:5000/${admin.profile}`} width="100" /><br/>
          <Link to={`/AdminEdit/${admin._id}`}><button>Edit</button></Link>
          <button onClick={() => handleDelete(admin._id)}>Delete</button>
          
        </div>
      ))}
    </div>
  );
}

export default AdminList;
