import React from "react";

const characters = Array(12).fill({
  image: "https://picsum.photos/183/183",
  species: "Human",
  name: "High Pilot",
  location: "Earth (Replacement Dimension)",
});

function List() {
  return (
    <div className="flex-3">
      <div className="flex justify-end items-center pb-[15px] border-b-[1px] border-b-[#444]">
        <select
          className="text-[13px] text-[#999] font-bold cursor-pointer h-[33px] focus:outline-none"
          name=""
          id=""
        >
          <option value="">16 hits per page</option>
          <option value="">32 hits per page</option>
          <option value="">64 hits per page</option>
        </select>
      </div>
      <div className="py-[15px] grid grid-cols-2 sm:grid-cols-4 gap-[40px] flex-wrap">
        {characters.map((char, index) => (
          <div key={index} className="flex flex-col gap-[10px]">
            <img
              className="w-full h-[183px] rounded-tl-[15px] rounded-br-[15px]"
              src={char.image}
              alt="Character"
            />
            <span className="text-[14px] font-semibold text-[#999] uppercase">
              {char.species}
            </span>
            <span className="text-[14px] font-bold text-[#444] capitalize">
              {char.name}
            </span>
            <span className="text-[14px] text-[#444] capitalize">
              {char.location}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
