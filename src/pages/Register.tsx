import React, { useState } from 'react';

interface RegisterProps {
  onRegister: (user: { name: string; email: string }) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Registration failed');
      }

      const data: { token: string; user: { name: string; email: string } } = await res.json();
      localStorage.setItem('token', data.token);
      onRegister(data.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm p-4">
      <h2 className="mb-4 text-xl font-bold">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        className="mb-2 w-full border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="mb-2 w-full border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-2 w-full border p-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-green-500 px-4 py-2 text-white">
        Register
      </button>
    </form>
  );
};

export default Register;
