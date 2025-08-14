import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-green-100">
      <div className="max-w-3xl p-8 text-center">
        <h1 className="mb-6 text-5xl font-extrabold text-green-800">Welcome to FlavorAI</h1>
        <p className="mb-4 text-xl text-green-700">
          Your smart recipe assistant! Discover and manage recipes effortlessly.
        </p>
        <p className="text-lg font-semibold text-orange-500">Let's cook something amazing today!</p>
      </div>
    </div>
  );
};

export default Home;
