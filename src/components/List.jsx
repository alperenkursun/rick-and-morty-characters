import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext.jsx";

function List() {
  const { characters, characterLoading, perPage, setPerPage } =
    useContext(CharacterContext);

  if (characterLoading)
    return (
      <p className="w-[100vw] h-[100vh] flex justify-center items-center">
        Loading...
      </p>
    );

  return (
    <div className="flex-3">
      <div className="flex justify-end items-center pb-[15px] border-b-[1px] border-b-[#444]">
        <select
          value={perPage}
          onChange={(e) => setPerPage(parseInt(e.target.value))}
          className="text-[13px] text-[#999] font-bold cursor-pointer h-[33px] focus:outline-none"
        >
          <option value={20}>20 hits per page</option>
          <option value={40}>40 hits per page</option>
          <option value={60}>60 hits per page</option>
        </select>
      </div>
      <div className="py-[15px] grid grid-cols-2 sm:grid-cols-4 gap-[40px] flex-wrap">
        {characters.map((character) => (
          <div key={character.id} className="flex flex-col gap-[10px]">
            <img
              className="w-full h-[183px] rounded-tl-[15px] rounded-br-[15px]"
              src={character.image}
              alt={character.name}
            />
            <span className="text-[14px] font-semibold text-[#999] uppercase">
              {character.species}
            </span>
            <span className="text-[14px] font-bold text-[#444] capitalize">
              {character.name}
            </span>
            <span className="text-[14px] text-[#444] capitalize">
              {character.location?.name || "Unknown location"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
