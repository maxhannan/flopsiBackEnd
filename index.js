import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {} from "dotenv/config";
import mongoose from "mongoose";
import userExtractor from "./utils.js";
import resolvers from "./gql/resolvers/index.js";
import typeDefs from "./gql/TypeDefs.js";

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    console.log("token", token);
    // try to retrieve a user with the token
    const user = userExtractor(token);

    // optionally block the user
    // we could also check user roles/permissions here
    if (!user)
      // throwing a `GraphQLError` here allows us to specify an HTTP status code,
      // standard `Error`s will have a 500 status code by default
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });

    // add the user to the context
    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);
