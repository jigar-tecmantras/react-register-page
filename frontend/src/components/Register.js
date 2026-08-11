
import React, { useState } from 'react';
import './Register.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const errors = {
    fullName: !formData.fullName.trim() ? 'Full name is required' : '',
    email: !formData.email.trim()
      ? 'Email address is required'
      : emailRegex.test(formData.email)
        ? ''
        : 'Email address is invalid',
    password: !formData.password
      ? 'Password is required'
      : formData.password.length < 8
        ? 'Password must be at least 8 characters'
        : '',
    confirmPassword: !formData.confirmPassword
      ? 'Please confirm your password'
      : formData.confirmPassword !== formData.password
        ? 'Passwords do not match'
        : ''
  };

  const isFormValid = Object.values(errors).every((error) => error === '');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    if (!isFormValid) {
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');

    setTimeout(() => {
      setSuccessMessage('Registration complete! Check your inbox for confirmation.');
      setSubmitting(false);
      setFormData(initialState);
      setTouched({});
    }, 900);
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <section className="register-card">
      <header className="register-card__header">
        <p className="register-eyebrow">Create your account</p>
        <h1>Register</h1>
        <p className="register-card__subheading">
          Tell us a bit about yourself to get started.
        </p>
      </header>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('fullName') ? 'input-error' : ''}
          />
          {showError('fullName') && <span className="field-error">{errors.fullName}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('email') ? 'input-error' : ''}
          />
          {showError('email') && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('password') ? 'input-error' : ''}
          />
          {showError('password') && <span className="field-error">{errors.password}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={showError('confirmPassword') ? 'input-error' : ''}
          />
          {showError('confirmPassword') && (
            <span className="field-error">{errors.confirmPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={!isFormValid || submitting}
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </section>
  );
}

export default Register;
