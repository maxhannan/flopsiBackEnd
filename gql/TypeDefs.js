const typeDefs = `#graphql
type Recipe {
  id: ID!
  recipeName: String!
  recipeCategory: String!
  ingredients: [Ingredient]!
  instructions: [String]
  isComponent: Boolean
  associatedRecipes: [ID]
}
type Ingredient {
  ingredientName: String!
  qty: String!
  unit: String!
  hasComponent: Boolean!
  componentId: ID
}
type User {
  id: ID!
    displayName: String!
    username: String!
    email: String!
    chef: Boolean!
}
type UserToken {
  token: String!
  user: User!
}
type Query {
  getCurrentUser: User!
}
type Mutation {
  logIn(
    username: String!
    password: String! 
  ): UserToken!
  register(
    displayName: String!
    username: String!
    email: String!
    chef: Boolean!
    password: String!
  ): UserToken!
}
`;
export default typeDefs;
