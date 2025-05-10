import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import { CharacterContext } from "./CharacterContext.jsx";

export const CharacterProvider = ({ children }) => {
  const client = useApolloClient();

  const [characters, setCharacters] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [characterLoading, setCharacterLoading] = useState(false);

  useEffect(() => {
    const fetchMultiplePages = async () => {
      setCharacterLoading(true);
      const pagesNeeded = Math.ceil(perPage / 20);
      let allResults = [];

      for (let i = 0; i < pagesNeeded; i++) {
        const currentPage = activePage + i;
        try {
          const { data } = await client.query({
            query: GET_CHARACTERS,
            variables: { page: currentPage },
          });
          allResults.push(...data.characters.results);
        } catch (err) {
          console.error(`Error fetching page ${currentPage}:`, err);
        }
      }

      setCharacters(allResults);
      setCharacterLoading(false);
    };

    fetchMultiplePages();
  }, [activePage, perPage, client]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        characterLoading,
        activePage,
        setActivePage,
        perPage,
        setPerPage,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
