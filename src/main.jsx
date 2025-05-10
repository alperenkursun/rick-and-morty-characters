import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client.jsx";
import { CharacterProvider } from "./contexts/CharacterProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </ApolloProvider>
);
