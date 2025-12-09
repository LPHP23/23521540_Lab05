import { useState } from "react";
import PropTypes from "prop-types";

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setSuccess(true);
      onSuccess?.({ email });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div role="alert" aria-live="polite">
        <h2>Welcome back!</h2>
        <p>You have successfully logged in.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Login form">
      <div>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={error && !validateEmail(email) ? "true" : "false"}
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            required
            aria-required="true"
            aria-invalid={error && password.length < 6 ? "true" : "false"}
            minLength={6}
          />
        </label>
      </div>

      {error && (
        <div role="alert" aria-live="assertive" style={{ color: "red" }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func,
};
