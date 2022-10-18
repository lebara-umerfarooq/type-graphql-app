import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field((type) => ID)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imagePath?: string;

  @Field()
  creationDate: Date;

  @Field((type) => [String])
  ingredients: string[];
}
