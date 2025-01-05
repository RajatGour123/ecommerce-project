import { useContext, useState } from 'react';
import axios from 'axios';
import { OrderHistoryContext } from '@/contexts/orderhistorycontext';

const Cart = ({ cart, customerId }) => {
  const [orderInfo, setOrderInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contact: '',
  });

  const { fetchOrders } = useContext(OrderHistoryContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    if (
      !orderInfo.firstName ||
      !orderInfo.lastName ||
      !orderInfo.email ||
      !orderInfo.address ||
      !orderInfo.contact
    ) {
      alert('Please fill out all order information fields.');
      return;
    }

    const order = {
      customerId: JSON.parse(localStorage.getItem("name")).customer_id, // Assuming customerId is stored in localStorage
      orderInfo,
      products: cart.map((item) => ({ productId: item.id, name: item.name, price: item.price })),
    };

    try {
      const response = await axios.post('http://localhost:3001/orders/checkout', order);
      alert(`Order placed: ${response.data.id}`);
      fetchOrders(); // Refresh order history
    } catch (error) {
      console.error('Failed to place order', error);
      alert('Failed to place order, please try again later.');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Cart</h1>
      <ul className="list-group mb-3">
        {cart.map((product, index) => (
          <li key={index} className="list-group-item">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>

      {cart.length > 0 && (
        <div className="mb-3">
          <h2>Order Information</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={orderInfo.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={orderInfo.lastName}
            onChange={handleChange}
            className="form-control mt-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={orderInfo.email}
            onChange={handleChange}
            className="form-control mt-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderInfo.address}
            onChange={handleChange}
            className="form-control mt-2"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={orderInfo.contact}
            onChange={handleChange}
            className="form-control mt-2"
            required
          />
        </div>
      )}

      <button className="btn btn-success" onClick={()=>{ if(localStorage.getItem("name") && JSON.parse(localStorage.getItem("name"))?.customer_id){
handleCheckout()
      }else{alert("Please Login as Customer")}} }>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
