import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const OrderHistoryContext = createContext();

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders/history');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderHistoryContext.Provider value={{ orders, fetchOrders }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
