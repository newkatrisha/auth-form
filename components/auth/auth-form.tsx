"use client";

import React, { useState } from "react";
import "@/styles/auth-form.css";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const validateForm = () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    return true;
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
          email,
          password,
          isLogin,
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
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(false);
  };

  if (success && userData) {
    return (
      <div className="auth-container">
        <div className="auth-form success-message">
          <div className="success-icon">✓</div>
          <h2>{isLogin ? "Login Successful!" : "Account Created!"}</h2>
          {isLogin ? <p>Welcome back, {userData.name}</p> : null}
          <button
            className="auth-button"
            onClick={() => {
              setSuccess(false);
              setUserData(null);
              setEmail("");
              setPassword("");
            }}
          >
            Back to {isLogin ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
        <p className="auth-subtitle">
          {isLogin
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
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
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
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
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
            ) : isLogin ? (
              "Log In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="switch-button"
              onClick={toggleAuthMode}
              disabled={loading}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
