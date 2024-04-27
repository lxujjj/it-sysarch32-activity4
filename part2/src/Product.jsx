import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Product() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post("http://localhost:3001/product", { name, price })
      .then(result => {
        console.log("Product added successfully:", result.data);
        alert("Product added successfully!");
        navigate('/productlist');
        // Clear form fields after successful submission
        setName("");
        setPrice("");
      })
      .catch(err => {
        console.error("Failed to add product:", err.message);
        setAuthError("Failed to add product. Please try again.");
      });
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Add Product</h5>
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
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
