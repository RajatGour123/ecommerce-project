import { useState } from 'react';
import Cart from '@/component/cart';
import Header from '@/component/header';
import OrderHistory from '@/component/order-history';
import ProductList from '@/component/product-list';


const App = () => {
  const [cart, setCart] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [userName, setUserName] = useState('')

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
<div className="container"> 
<Header userName={userName} /> <div className="container"> <h1>Welcome to the Ecommerce Platform</h1> </div>
  <ProductList addToCart={addToCart} /> 
  <Cart cart={cart} customerId={customerId} /> 
  <OrderHistory customerId={customerId} />
   </div>
  );
};

export default App;
