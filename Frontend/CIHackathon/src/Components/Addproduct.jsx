import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/images/logo.png";
import Navbar from './Navbar'

function Product() {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    category: "",
    image: null,
    contactNumber: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] }); // Store file object
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("productPrice", parseFloat(formData.productPrice));
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image); // File object
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("address", formData.address);

    try {
      await axios.post("http://localhost:5000/api/products", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully!");
      setFormData({
        productName: "",
        productPrice: "",
        category: "",
        image: null,
        contactNumber: "",
        address: "",
      });
    } catch (error) {
      toast.error("Error adding product");
      console.error("Error details:", error);
    }
  };

  return (
    <>
    <Navbar />
      <div className="font-[sans-serif] bg-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 justify-center p-4 bg-gray-50 h-full">
            <img
              src={logo}
              className="max-w-[80%] w-full h-full aspect-square object-contain block mx-auto md:block hidden"
              alt="login-image"
            />
          </div>

          <div className="flex items-center justify-center p-6 h-full w-full">
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <h1 className="text-center text-4xl font-bold text-blue-600">
                  Add Product
                </h1> 
              </div>

              {[
                { label: "Product Name*", name: "productName", type: "text" },
                {
                  label: "Product Price*",
                  name: "productPrice",
                  type: "number",
                },
                { label: "Category*", name: "category", type: "text" },
                { label: "Image*", name: "image", type: "file" },
                {
                  label: "Contact Number*",
                  name: "contactNumber",
                  type: "number",
                },
                { label: "Address*", name: "address", type: "text" },
              ].map((input) => (
                <div className="relative" key={input.name}>
                  <input
                    type={input.type}
                    name={input.name}
                    {...(input.type !== "file"
                      ? { value: formData[input.name] }
                      : {})}
                    onChange={handleChange}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">
                    {input.label}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;