import { useState, useContext, useEffect } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../graphql/queries";

const genders = [
  { id: "male", label: "Male" },
  { id: "female", label: "Female" },
  { id: "unknown", label: "Unknown" },
  { id: "genderless", label: "Genderless" },
];

const species = [
  { id: "human", label: "Human" },
  { id: "alien", label: "Alien" },
  { id: "humanoid", label: "Humanoid" },
  { id: "animal", label: "Animal" },
  { id: "robot", label: "Robot" },
  { id: "cronenberg", label: "Cronenberg" },
  { id: "mytholog", label: "Mytholog" },
  { id: "disease", label: "Disease" },
  { id: "poopybutthole", label: "Poopybutthole" },
  { id: "unknown", label: "unknown" },
];

function Filters() {
  const [debouncedLocationSearch, setDebouncedLocationSearch] = useState("");

  const {
    loading: locationsLoading,
    error: locationsError,
    data: locationsData,
    refetch: refetchLocations,
  } = useQuery(GET_LOCATIONS, {
    variables: {
      page: 1,
      name: debouncedLocationSearch,
    },
  });

  const {
    selectedGender,
    setSelectedGender,
    selectedSpecies,
    setSelectedSpecies,
    selectedLocation,
    setSelectedLocation,
    locationSearch,
    setLocationSearch,
    clearFilterLocation,
    clearFilterOther,
    clearAllFilters,
  } = useContext(CharacterContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLocationSearch(locationSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [locationSearch]);

  useEffect(() => {
    refetchLocations({ name: debouncedLocationSearch });
  }, [debouncedLocationSearch, refetchLocations]);

  return (
    <div className="w-full 2xl:w-[316px] shrink-0">
      <div className="w-full flex justify-between items-center pb-[15px] border-b-[1px] border-b-[#444]">
        <h5 className="text-[22px] text-[#444] font-semibold">Filters</h5>
        <button
          className="text-[13px] text-[#999] font-bold cursor-pointer"
          onClick={clearAllFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="py-[15px] border-b-[1px] border-b-[#444]">
        <h6 className="text-[14px] font-bold mb-[15px]">Gender</h6>
        {genders.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-[15px] mb-[9px]">
            <input
              type="radio"
              name="gender"
              id={`gender-${id}`}
              checked={selectedGender === id}
              onChange={() => {
                setSelectedGender(id);
                clearFilterLocation();
              }}
              className="h-4 w-4 text-[#444] focus:ring-[#444]"
            />
            <label
              htmlFor={`gender-${id}`}
              className="text-[14px] font-semibold"
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="py-[15px] border-b-[1px] border-b-[#444]">
        <h6 className="text-[14px] font-bold mb-[15px]">Species</h6>
        {species.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-[15px] mb-[9px]">
            <input
              type="radio"
              name="species"
              id={`species-${id}`}
              checked={selectedSpecies === id}
              onChange={() => {
                setSelectedSpecies(id);
                clearFilterLocation();
              }}
              className="h-4 w-4 text-[#444] focus:ring-[#444]"
            />
            <label
              htmlFor={`species-${id}`}
              className="text-[14px] font-semibold"
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      <div className="py-[15px] border-b-[1px] border-b-[#444]">
        <h6 className="text-[14px] font-bold mb-[15px]">Locations</h6>
        <input
          className="bg-white w-full h-[32px] rounded-tl-[12px] rounded-br-[12px] px-[15px] border-[1px] border-[#444] focus:outline-none mb-[15px]"
          type="text"
          placeholder="SEARCH LOCATIONS"
          value={locationSearch}
          onChange={(e) => {
            setLocationSearch(e.target.value);
            if (!e.target.value) {
              setSelectedLocation("");
            }
            clearFilterOther();
          }}
        />
        {locationsLoading && <p>Loading locations...</p>}
        {locationsError && <p>Error loading locations</p>}
        {!locationSearch && locationsData?.locations?.results.length === 0 && (
          <p>No locations available</p>
        )}

        {(locationSearch || !locationSearch) &&
          locationsData?.locations?.results.map((location) => (
            <div
              key={location.id}
              className="flex items-center gap-[15px] mb-[9px]"
            >
              <input
                type="radio"
                id={`location-${location.id}`}
                name="location"
                checked={selectedLocation === location.name}
                onChange={() => {
                  setSelectedLocation(location.name);
                  clearFilterOther();
                }}
                className="h-4 w-4 text-[#444] focus:ring-[#444]"
              />
              <label
                htmlFor={`location-${location.id}`}
                className="text-[14px] font-semibold flex-1"
              >
                {location.name}
              </label>
              <span className="text-[12px] font-bold">
                {location.residents?.length || 0}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Filters;
