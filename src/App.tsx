import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { IRecipes } from "./Recipes";
import Recipe from "./Recipe";

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const url = "http://www.recipepuppy.com/api/?q=";

const App = () => {
  const [recipesFound, setRecipesFound] = useState<IRecipes[]>([]);
  const [recipeSearch, setRecipeSearch] = useState("");

  const searchRecipes = async (q: string): Promise<IRecipes[]> => {
    const result = await fetch(`${proxyUrl}${url}${q}`);
    return (await result.json()).data;
  };

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const input = form.querySelector("#searchTerm") as HTMLInputElement;
    setRecipeSearch(input.value);
  };

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if (query) {
        const res = await searchRecipes(query);
        setRecipesFound(res);
      }
    })();
  }, [recipeSearch]);

  return (
    <div className="App">
      <h1>Search a Recipe</h1>
      <form onSubmit={(e) => search(e)} action="#" className="searchForm">
        <input type="text" id="searchTerm" />
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}..</p>}
      <div className="recipes-container">
        {recipesFound.length &&
          recipesFound.map((recipe) => (
            <Recipe key={recipe.href} recipe={recipe}></Recipe>
          ))}
      </div>
    </div>
  );
};

export default App;
