import React, { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  rating: number;
  author: string;
}

interface Props {
  user: { name: string; email: string };
}

const Recipes: React.FC<Props> = ({ user }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const addRecipe = () => {
    const newRecipe: Recipe = {
      id: Date.now(),
      title,
      ingredients,
      instructions,
      rating: 0,
      author: user.name,
    };
    setRecipes([newRecipe, ...recipes]);
    setTitle('');
    setIngredients('');
    setInstructions('');
  };

  const rateRecipe = (id: number, rating: number) => {
    setRecipes(recipes.map((r) => (r.id === id ? { ...r, rating } : r)));
  };

  const userRecipes = recipes.filter((r) => r.author === user.name);

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-4 text-3xl font-bold">Recipes</h1>

      {/* Додавання нового рецепту */}
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
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="mb-2 w-full rounded border p-2"
        />
        <button
          onClick={addRecipe}
          className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
        >
          Add Recipe
        </button>
      </div>

      {/* Власні рецепти */}
      <h2 className="mb-2 text-2xl font-semibold">Your Recipes</h2>
      {userRecipes.map((r) => (
        <div key={r.id} className="mb-4 rounded bg-white p-4 shadow">
          <h3 className="text-xl font-bold">{r.title}</h3>
          <p>
            <strong>Ingredients:</strong> {r.ingredients}
          </p>
          <p>
            <strong>Instructions:</strong> {r.instructions}
          </p>
          <p>
            <strong>Rating:</strong> {r.rating} ⭐
          </p>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => rateRecipe(r.id, i)}
                className="rounded bg-yellow-300 px-2 hover:bg-yellow-400"
              >
                {i} ⭐
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
