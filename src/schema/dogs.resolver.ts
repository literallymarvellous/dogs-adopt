import { Resolver, Query, Arg } from "type-graphql";
import { Dog } from "./dogs";
import dogs from "./dogs.json";

@Resolver(Dog)
export class DogResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return dogs;
  }

  @Query(() => Dog, { nullable: true })
  dog(@Arg("name", () => String) name: string): Dog | undefined {
    const dog = dogs.find(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    if (dog === undefined) {
      throw new Error(`Dog ${name} not found`);
    }
    return dog;
  }
}
