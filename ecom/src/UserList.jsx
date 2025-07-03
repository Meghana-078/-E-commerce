import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
    fetchUsers(); 
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👥 All Users</h2>
      {users.map(user => (
        <div key={user._id} style={styles.card}>
          <div style={styles.row}>
            <div>
              <p style={styles.name}>{user.name}</p>
              <p style={styles.email}>{user.email}</p>
            </div>
            {user.profile && (
              <img
                src={`http://localhost:5000/${user.profile}`}
                alt="User"
                style={styles.profileImg}
              />
            )}
          </div>

          <div style={styles.actions}>
            <Link to={`/edituser/${user._id}`}>
              <button style={styles.editBtn}>✏️ Edit</button>
            </Link>
            <button onClick={() => handleDelete(user._id)} style={styles.deleteBtn}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: '90%',
    maxWidth: '800px',
    margin: '30px auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#d63384',
    marginBottom: '30px',
  },
  card: {
    background: '#fff0f5',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  email: {
    fontSize: '14px',
    color: '#555',
  },
  profileImg: {
    width: '70px',
    height: '70px',
    borderRadius: '10px',
    objectFit: 'cover',
    border: '2px solid #ffa07a',
  },
  actions: {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    backgroundColor: '#6a5acd',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default UserList;
