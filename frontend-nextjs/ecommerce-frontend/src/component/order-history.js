import { useContext } from 'react';
import axios from 'axios';
import { OrderHistoryContext } from '@/contexts/orderhistorycontext';

const OrderHistory = () => {
  const { orders, fetchOrders } = useContext(OrderHistoryContext);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3001/orders/${orderId}`);
      alert('Order deleted successfully');
      fetchOrders(); // Refresh order history
    } catch (error) {
      console.error('Failed to delete order', error);
      alert('Failed to delete order, please try again later.');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Order History</h1>
      <ul className="list-group">
        {orders.map((order) => (
          <li key={order.id} className="list-group-item">
            <strong>Order ID: {order.id}</strong>
            <ul className="list-group list-group-flush">
              {order.products.map((product) => (
                <li key={product.productId} className="list-group-item">
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>
            <p>
              <strong>Customer Information:</strong>
              <br />
              id: {order?.customer.id}
              <br />
              Name: {order?.customer.name}
              <br />
              email: {order?.customer.email}
              <br />
            </p>
            <p>
              <strong>Order Information:</strong>
              <br />
              {order?.orderInfo?.firstName} {order?.orderInfo?.lastName}
              <br />
              Email: {order.orderInfo.email}
              <br />
              Address: {order.orderInfo.address}
              <br />
              Contact: {order.orderInfo.contact}
            </p>
            <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>Delete Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
