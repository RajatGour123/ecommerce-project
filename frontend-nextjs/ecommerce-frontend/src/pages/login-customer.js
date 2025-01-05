import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginCustomer = ({ setUserName }) => {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/customers/login', credentials);
      localStorage.setItem("name",JSON.stringify({name:response.data.name,customer_id:response.data.id}))
      router.push('/');
    } catch (error) {
      console.error('Failed to log in', error);
      alert('Failed to log in, please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Log In Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
};

export default LoginCustomer;
