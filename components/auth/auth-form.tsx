"use client";

import React, { useState } from "react";

export default function AuthForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isLogin: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const validateForm = () => {
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          isLogin: formData.isLogin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      setUserData(data.user);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setFormData((prev) => ({
      ...prev,
      isLogin: !prev.isLogin,
    }));
    setError(null);
    setSuccess(false);
  };

  if (success && userData) {
    return (
      <div className="auth-container">
        <div className="auth-form success-message">
          <div className="success-icon">✓</div>
          <h2>{formData.isLogin ? "Login Successful!" : "Account Created!"}</h2>
          {formData.isLogin ? <p>Welcome back, {userData.name}</p> : null}
          <button
            className="auth-button"
            onClick={() => {
              setSuccess(false);
              setUserData(null);
              setFormData({
                email: "",
                password: "",
                isLogin: formData.isLogin,
              });
            }}
          >
            Back to {formData.isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>{formData.isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="auth-subtitle">
          {formData.isLogin
            ? "Enter your credentials to access your account"
            : "Fill in the form below to create your account"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
                required
              />
            </div>
          </div>

          {error ? <div className="error-message">{error}</div> : null}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : formData.isLogin ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {formData.isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              className="switch-button"
              onClick={toggleAuthMode}
              disabled={loading}
            >
              {formData.isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
