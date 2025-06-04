import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register:", formData);
    //     setError('');
    try {
      const res = await API.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-2xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            name="name"
            placeholder="Full Name"
            handleChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email Address"
            type="email"
            handleChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            handleChange={handleChange}
          />
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            handleChange={handleChange}
          />
          <Input
            name="phone"
            placeholder="Phone Number"
            handleChange={handleChange}
          />
          <Input
            name="address"
            placeholder="Address"
            handleChange={handleChange}
          />
          <Input name="city" placeholder="City" handleChange={handleChange} />
          <Input name="state" placeholder="State" handleChange={handleChange} />
          <Input
            name="zip"
            placeholder="ZIP Code"
            handleChange={handleChange}
          />
          <Input
            name="country"
            placeholder="Country"
            handleChange={handleChange}
          />

          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg font-semibold text-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const Input = ({ name, placeholder, type = "text", handleChange }) => (
  <input
    type={type}
    name={name}
    required
    onChange={handleChange}
    placeholder={placeholder}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
  />
);

export default Register;

// import { useState } from 'react';
// import API from '../api/axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const res = await API.post('/auth/register', form);
//       localStorage.setItem('token', res.data.token);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Register</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
//         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
//         <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;
