import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams(); // Extract the product ID from URL params
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  // Fetch the product details based on ID when component mounts
  useEffect(() => {
    axios.get(`http://localhost:3001/product/${id}`)
      .then(response => {
        const { name, price } = response.data;
        setName(name);
        setPrice(price);
      })
      .catch(error => {
        console.error("Failed to fetch product:", error.message);
      });
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.put(`http://localhost:3001/product/${id}`, { name, price })
      .then(result => {
        console.log("Product updated successfully:", result.data);
        alert("Product updated successfully!");
        navigate('/productlist');
      })
      .catch(err => {
        console.error("Failed to update product:", err.message);
        setAuthError("Failed to update product. Please try again.");
      });
  };
  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Edit Product</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="form-control"
                    placeholder="Enter Price"
                    value={price}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
                {authError && (
                  <div className="alert alert-danger" role="alert">
                    {authError}
                  </div>
                )}
                <button type="submit" className="btn btn-primary w-100">
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
