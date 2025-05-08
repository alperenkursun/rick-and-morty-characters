import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // gql,
} from "@apollo/client";
import "./index.css";
import App from "./App.jsx";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query {
//         characters {
//           info {
//             count
//             pages
//             next
//             prev
//           }
//           results {
//             id
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
