import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri: "http://localhost:4000"
});

ReactDOM.render(<App />, document.getElementById("root"));
