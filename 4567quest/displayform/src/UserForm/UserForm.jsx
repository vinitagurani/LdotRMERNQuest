
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './UserForm.css';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false); // State to manage success message
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, age: Number(age) };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]);
        setName('');
        setEmail('');
        setAge('');
        setIsSuccess(true); // Show success message

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          setIsSuccess(false); // Hide success message
          navigate('/'); // Redirect to home page
        }, 5000);
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {isSuccess && (
        <div style={{ color: 'green', fontSize: '24px' }}>
          ✔ User created successfully!
        </div>
      )}

      <h3>Users:</h3>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.email} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserForm;
