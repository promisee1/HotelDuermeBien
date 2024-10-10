import React, { useState } from 'react';

function Login({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error de login');
        return;
      }

      const data = await response.json();
      console.log('Login exitoso:', data.user);
    } catch (error) {
      console.error('Error en la petición:', error);
      setError('Error de servidor');
    }
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-12">
          <div className="card p-4 shadow-lg">
            <h3 className="card-title text-center">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            {/* Botón de registro */}
            <div className="mt-3 text-center">
              <button className="btn btn-link" onClick={onRegister}>
                ¿No tienes una cuenta? Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
