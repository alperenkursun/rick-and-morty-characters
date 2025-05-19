import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext.jsx";

function List() {
  const { characters, characterLoading } = useContext(CharacterContext);

  if (characterLoading)
    return (
      <p className="w-[100vw] h-[100vh] flex justify-center items-center">
        Loading...
      </p>
    );

  return (
    <div className="flex-1">
      <div className="border-b-[1px] border-b-[#444] h-[49px]"></div>
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
