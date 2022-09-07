import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// establish a new link to the GraphQL server at its /graphql endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

//  middleware function that will retrieve the token for us and combine it with the existing httpLink
const authLink = setContext((_, { headers }) => {
  // retrieve token from localStorage
  const token = localStorage.getItem("id_token");

  // set the HTTP request headers of every request to include the token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// instantiate the Apollo Client instance and new cache object, and create the connection to the API endpoint (combine authLink and httpLink)
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
