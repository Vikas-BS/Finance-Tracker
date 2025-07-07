import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-white">
        {type === "login" ? "Login to your account" : "Create an account"}
      </h2>

      {type === "signup" && (
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md bg-slate-600"
          required
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md bg-slate-600 "
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md bg-slate-600"
        required
      />

      <button
        type="submit"
        className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        {type === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
