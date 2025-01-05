import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <form onSubmit={handleAdd}>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} value={newProduct.name} required />
        </div>
        <div className="form-group">
          <label>Product Price</label>
          <input type="number" name="price" className="form-control" onChange={handleChange} value={newProduct.price} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      <ul className="list-group mt-3">
        {products.map((product) => (
          <li key={product.id} className="list-group-item">
            {product.name} - ${product.price}
            <button className="btn btn-danger ml-3" onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
