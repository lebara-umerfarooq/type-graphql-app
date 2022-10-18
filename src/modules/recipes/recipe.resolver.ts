import { Arg, Query, Resolver } from "type-graphql";
import { Recipe } from "./recipe";

@Resolver(Recipe)
export class RecipeResolver {
  @Query((returns) => Recipe)
  recipes(@Arg("id") id: number): Recipe {
    const recipesList = [
      {
        id: 1,
        title: "Pizza",
        description: "A delicious pizza",
        imagePath:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
        creationDate: new Date(),
        ingredients: ["Flour", "Water", "Tomato"],
      },
      {
        id: 2,
        title: "Salad",
        description: "A delicious salad",
        imagePath:
          "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
        creationDate: new Date(),
        ingredients: ["Lettuce", "Tomato", "Cucumber"],
      },
    ];
    return recipesList.find((recipe) => recipe.id === id);
  }
}
