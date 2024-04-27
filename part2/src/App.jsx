import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProduct from "./EditProduct.jsx";
import ProductList from "./ProductList.jsx";
import Product from "./Product.jsx";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/updateproduct/:productId" element={<EditProduct />} />
        </Routes>
      </Router>
    </div>
  );
}
