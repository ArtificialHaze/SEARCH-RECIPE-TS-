import { IRecipes } from "./Recipes";

const Recipe = (props: { recipe: IRecipes }) => {
  const { recipe } = props;

  return (
    <div className="recipe">
      <div className="title">
        <img src={recipe.thumbnail} alt={recipe.title} />
      </div>
      {recipe.ingredients && (
        <ul>
          {recipe.ingredients.split(",").map((ingredient) => (
            <li>{ingredient}</li>
          ))}
        </ul>
      )}
      <a href={recipe.href} target="_blank">
        View
      </a>
    </div>
  );
};

export default Recipe;
