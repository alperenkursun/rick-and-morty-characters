import React from "react";

const genders = [
  { id: "male", label: "Male", count: 445 },
  { id: "female", label: "Female", count: 91 },
  { id: "unknown", label: "Unknown", count: 44 },
  { id: "genderless", label: "Genderless", count: 11 },
];

const species = [
  { id: "human", label: "Human", count: 272 },
  { id: "alien", label: "Alien", count: 157 },
  { id: "humanoid", label: "Humanoid", count: 57 },
  { id: "animal", label: "Animal", count: 50 },
  { id: "robot", label: "Robot", count: 17 },
  { id: "cronenberg", label: "Cronenberg", count: 8 },
  { id: "mytholog", label: "Mytholog", count: 7 },
  { id: "disease", label: "Disease", count: 6 },
  { id: "poopybutthole", label: "Poopybutthole", count: 6 },
  { id: "unknown", label: "unknown", count: 6 },
];

const locations = [
  {
    id: "earth-replacement-dimension",
    label: "Earth (Replacement Dimension)",
    count: 137,
  },
  { id: "citadel-of-ricks", label: "Citadel of Ricks", count: 91 },
  { id: "interdimensional-cable", label: "Interdimensional Cable", count: 60 },
  { id: "earth-c-137", label: "Earth (C-137)", count: 27 },
  { id: "unknown-location", label: "unknown", count: 22 },
  { id: "snake-planet", label: "Snake Planet", count: 15 },
  { id: "planet-squanch", label: "Planet Squanch", count: 13 },
  { id: "anatomy-park", label: "Anatomy Park", count: 11 },
  { id: "nuptia-4", label: "Nuptia 4", count: 11 },
  { id: "heist-con", label: "Heist-Con", count: 10 },
];

function Filters() {
  return (
    <div className="flex-1">
      <div className="flex justify-between items-center pb-[15px] border-b-[1px] border-b-[#444]">
        <h5 className="text-[22px] text-[#444] font-semibold">Filters</h5>
        <button className="text-[13px] text-[#999] font-bold cursor-pointer">
          Clear Filters
        </button>
      </div>
      <div className="py-[15px] border-b-[1px] border-b-[#444]">
        <h6 className="text-[14px] font-bold mb-[15px]">Gender</h6>

        {genders.map(({ id, label, count }) => (
          <div key={id} className="flex items-center gap-[15px] mb-[9px]">
            <input type="checkbox" id={id} />
            <label htmlFor={id} className="text-[14px] font-semibold">
              {label}
            </label>
            <span className="text-[12px] font-bold">{count}</span>
          </div>
        ))}
      </div>

      <div className="py-[15px] border-b-[1px] border-b-[#444]">
        <h6 className="text-[14px] font-bold mb-[15px]">Species</h6>

        {species.map(({ id, label, count }) => (
          <div key={id} className="flex items-center gap-[15px] mb-[9px]">
            <input type="checkbox" id={id} />
            <label htmlFor={id} className="text-[14px] font-semibold">
              {label}
            </label>
            <span className="text-[12px] font-bold">{count}</span>
          </div>
        ))}
      </div>

      <div className="py-[15px] border-b-[1px] border-b-[#444]">
        <h6 className="text-[14px] font-bold mb-[15px]">Locations</h6>

        <input
          className="bg-white w-full h-[32px] rounded-tl-[12px] rounded-br-[12px] px-[15px] border-[1px] border-[#444] focus:outline-none mb-[15px]"
          type="text"
          placeholder="SEARCH LOCATIONS"
        />

        {locations.map(({ id, label, count }) => (
          <div key={id} className="flex items-center gap-[15px] mb-[9px]">
            <input type="checkbox" id={id} />
            <label htmlFor={id} className="text-[14px] font-semibold">
              {label}
            </label>
            <span className="text-[12px] font-bold">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
