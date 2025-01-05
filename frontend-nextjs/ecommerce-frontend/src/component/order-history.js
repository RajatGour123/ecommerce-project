import { OrderHistoryContext } from '@/contexts/orderhistorycontext';
import { useContext } from 'react';

const OrderHistory = () => {
  const { orders } = useContext(OrderHistoryContext);

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
              Name: {JSON.parse(order?.customerId).name}
              <br />
              id: {JSON.parse(order?.customerId).customer_id}
              <br />
              {/* Email: {order.customer.email} */}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
