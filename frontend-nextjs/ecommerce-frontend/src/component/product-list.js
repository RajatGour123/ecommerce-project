import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products'); 
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products, using static data', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name} - ${product.price}
            <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;


   