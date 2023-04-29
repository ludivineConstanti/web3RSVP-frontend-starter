import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = process.env.APOLLO_URI;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
