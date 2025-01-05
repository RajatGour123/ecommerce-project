import { useState } from 'react';
import axios from 'axios';

const CreateCustomer = () => {
  const [customer, setCustomer] = useState({
    name: '',
    contact: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/customers', customer);
      alert('Customer created successfully!');
    } catch (error) {
      console.error('Failed to create customer', error);
      alert('Failed to create customer, please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Create Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact No</label>
          <input type="text" name="contact" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateCustomer;
