import { buildSchema } from "type-graphql";
import { RecipeResolver } from "../modules/recipes/recipe.resolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [RecipeResolver],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
