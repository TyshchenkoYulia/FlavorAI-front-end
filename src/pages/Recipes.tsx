import React, { useEffect, useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  description: string;
  author: string;
}

interface Props {
  user: { name: string; email: string };
}

const Recipes: React.FC<Props> = ({ user }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/recipes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch recipes');
        const data = await res.json();

        const mapped = data.map((r: any) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          author: r.user.name,
        }));
        setRecipes(mapped);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, [token]);

  const addRecipe = () => {
    if (!title || !description) return;
    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      description,
      author: user.name,
    };
    setRecipes([newRecipe, ...recipes]);
    setTitle('');
    setDescription('');
  };

  const userRecipes = recipes.filter((r) => r.author === user.name);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Recipes</h1>

      <div className="mb-6 rounded bg-gray-100 p-4">
        <h2 className="mb-2 text-xl font-semibold">Add a Recipe</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <button
          onClick={addRecipe}
          className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Add Recipe
        </button>
      </div>

      <h2 className="mb-2 text-2xl font-semibold">Your Recipes</h2>
      {userRecipes.map((r) => (
        <div key={r.id} className="mb-4 rounded bg-white p-4 shadow">
          <h3 className="text-xl font-bold">{r.title}</h3>
          <p>{r.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
