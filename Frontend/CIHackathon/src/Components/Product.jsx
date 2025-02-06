import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'

function ProductShow() {
 const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/productshow") // Update with your actual backend URL
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  console.log("products", products);

  return (
    <>
     <Navbar />
    <div className="min-h-screen bg-gray-100 p-8 bg-gradient-to-r from-green-200 to-blue-300">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
      <button 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            onClick={() => navigate('/addproduct')}
        >
            Add Product
        </button>  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg  rounded-xl p-4 transform transition duration-300 hover:scale-105"
          >
            <img
              src={`http://localhost:5000${product.image}`}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-3">
              {product.productName}
            </h2>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-green-600 font-bold">₹{product.productPrice}</p>
            <p className="text-gray-500 text-sm">📍 {product.address}</p>
            <p className="text-gray-500 text-sm">📞 {product.contactNumber}</p>
            <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              View Details
            </button>  
          </div>
        ))}
      </div>
    </div>
    </>
   
  );
}

export default ProductShow;