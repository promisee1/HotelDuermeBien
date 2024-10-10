// src/App.js
import React, { useState } from 'react';
import Login from './login/login';
import Register from './login/registrar';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterClick = () => setIsRegistering(true);
  const handleBackToLogin = () => setIsRegistering(false);

  return (
    <div className="App container">
      {isRegistering ? (
        <Register onBackToLogin={handleBackToLogin} />
      ) : (
        <Login onRegister={handleRegisterClick} />
      )}
    </div>
  );
}

export default App;
