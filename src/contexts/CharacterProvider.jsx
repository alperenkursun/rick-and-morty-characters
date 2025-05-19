import { useState, useEffect, useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import { GET_CHARACTERS, GET_LOCATIONS } from "../graphql/queries";
import { CharacterContext } from "./CharacterContext.jsx";

export const CharacterProvider = ({ children }) => {
  const client = useApolloClient();

  const [characters, setCharacters] = useState([]);
  const [characterLoading, setCharacterLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [info, setInfo] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  const [locationSearch, setLocationSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const clearFilters = (clearLocation, clearOther) => {
    if (clearOther) {
      setSearch("");
      setSelectedGender("");
      setSelectedSpecies("");
    }
    if (clearLocation) {
      setSelectedLocation("");
      setLocationSearch("");
    }
  };

  const clearFilterLocation = () => {
    clearFilters(true, false);
  };

  const clearFilterOther = () => {
    clearFilters(false, true);
  };

  const clearAllFilters = () => {
    clearFilters(true, true);
  };

  const fetchCharacters = useCallback(
    async (
      page = activePage,
      nameFilter = "",
      genderFilter = "",
      speciesFilter = ""
    ) => {
      setCharacterLoading(true);
      try {
        const { data } = await client.query({
          query: GET_CHARACTERS,
          variables: {
            page: page,
            name: nameFilter,
            gender: genderFilter,
            species: speciesFilter,
          },
        });
        setCharacters(data.characters.results);
        setInfo(data.characters.info);
      } catch (err) {
        console.error(err);
        setCharacters([]);
        setInfo(null);
      } finally {
        setCharacterLoading(false);
      }
    },
    [client, activePage]
  );

  const fetchCharactersWithLocations = useCallback(
    async (page = 0, nameFilter = "") => {
      setCharacterLoading(true);
      try {
        const { data } = await client.query({
          query: GET_LOCATIONS,
          variables: {
            name: nameFilter,
          },
        });
        const residents = data.locations.results[0].residents;

        const updatedResidents = residents.map((resident) => {
          return { ...resident, location: { name: nameFilter } };
        });

        setCharacters(updatedResidents);
        setInfo(null);
      } catch (err) {
        console.error(page, err);
        setCharacters([]);
        setInfo(null);
      } finally {
        setCharacterLoading(false);
      }
    },
    [client]
  );

  useEffect(() => {
    fetchCharacters(activePage, search, selectedGender, selectedSpecies);
  }, [activePage, search, selectedGender, selectedSpecies, fetchCharacters]);

  useEffect(() => {
    if (selectedLocation) {
      fetchCharactersWithLocations(activePage, selectedLocation);
    }
  }, [activePage, selectedLocation, fetchCharactersWithLocations]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setActivePage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search, selectedGender, selectedSpecies, selectedLocation]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        characterLoading,
        activePage,
        setActivePage,
        search,
        setSearch,
        selectedGender,
        setSelectedGender,
        selectedSpecies,
        setSelectedSpecies,
        locationSearch,
        setLocationSearch,
        selectedLocation,
        setSelectedLocation,
        clearFilterLocation,
        clearFilterOther,
        clearAllFilters,
        info,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
