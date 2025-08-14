import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Recipes from '../src/pages/Recipes';
import Navbar from '../src/components/Navbar';

interface User {
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/recipes" /> : <Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/recipes" /> : <LoginWrapper setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/recipes" /> : <RegisterWrapper setUser={setUser} />}
        />
        <Route
          path="/recipes"
          element={user ? <Recipes user={user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={user ? '/recipes' : '/login'} />} />
      </Routes>
    </Router>
  );
};

// Обгортки для передачі setUser
const LoginWrapper: React.FC<{ setUser: (user: User) => void }> = ({ setUser }) => {
  return <Login onLogin={setUser} />;
};

const RegisterWrapper: React.FC<{ setUser: (user: User) => void }> = ({ setUser }) => {
  return <Register onRegister={setUser} />;
};

export default App;
