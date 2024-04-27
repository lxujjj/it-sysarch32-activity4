import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch products from backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
        setError("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);
      // Update local state after successful deletion
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error.message);
      setError("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                {/* Add more product details as needed */}
                <div className="d-flex flex-column">
                  {/* Edit button */}
                  <Link
                    to={`/updateproduct/${product._id}`}
                    className="btn btn-primary btn-sm w-100 mb-2"
                  >
                    Edit
                  </Link>
                  {/* Delete button */}
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
