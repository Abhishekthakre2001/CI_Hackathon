import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios"; // Import axios
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Registration() {
     const navigate = useNavigate();
     
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        contact: "",
        termsAccepted: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            username,
            password,
            confirmPassword,
            email,
            contact,
            termsAccepted,
        } = formData;

        if (!username || !password || !confirmPassword || !email || !contact) {
            toast.error("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (!termsAccepted) {
            toast.error("You must accept the Terms and Conditions!");
            return;
        }

        try {
            // Send data to the backend API
            const response = await axios.post(
                "http://localhost:5000/register",
                formData
            );

            if (response.status === 201) {
                toast.success("Account created successfully!");
                navigate('/home'); 
            }
        } catch (error) {
            console.error("Error creating account:", error);
            toast.error("There was an error creating your account.");
        }
    };

    return (
        <>
            <Toaster />
            <div className="font-[sans-serif] bg-white md:h-screen">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                    <div className="max-md:order-1 p-4 bg-gray-50 h-full">
                        <img
                            src={logo}
                            className="max-w-[80%] w-full h-full aspect-square object-contain block mx-auto md:block hidden"
                            alt="login-image"
                        />
                    </div>

                    <div className="flex items-center p-6 h-full w-full">
                        <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
                            <div className="mb-8">
                                <h3 className="text-blue-500 text-2xl font-bold max-md:text-center">
                                    Create an account
                                </h3>
                            </div>

                            {/* Username */}
                            <div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="username"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                                    >
                                        Username*
                                    </label>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mt-6">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="password"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                                    >
                                        Password*
                                    </label>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="mt-6">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="confirmPassword"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                                    >
                                        Confirm Password*
                                    </label>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mt-6">
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                                    >
                                        Email*
                                    </label>
                                </div>
                            </div>

                            {/* Contact Number */}
                            <div className="mt-6">
                                <div className="relative">
                                    <input
                                        type="tel"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                    />
                                    <label
                                        htmlFor="contact"
                                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                                    >
                                        Contact Number*
                                    </label>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-center mt-6">
                                <input
                                    type="checkbox"
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-blue-500 border border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="termsAccepted"
                                    className="ml-2 text-sm text-gray-500"
                                >
                                    I accept the{" "}
                                    <a href="#" className="text-blue-500">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg"
                                >
                                    Register
                                </button>
                            </div>
                            <p className='p-4'>If have an account? <NavLink to="/">Login here</NavLink>.</p> {/* Registration link */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Registration;