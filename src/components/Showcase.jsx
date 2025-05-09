import React from "react";

function Showcase() {
  return (
    <div className="w-full h-[368px] flex flex-col justify-center items-center gap-[20px] bg-[url('./assets/images/showcase-bg.jpg')] bg-cover bg-center">
      <h1 className="text-[36px] text-white text-center font-bold">
        Rick and Morty Characters
      </h1>
      <input
        className="bg-white w-[260px] sm:w-[540px] h-[50px] rounded-tl-[25px] rounded-br-[25px] px-[15px] focus:outline-none"
        type="text"
        placeholder="SEARCH"
      />
    </div>
  );
}

export default Showcase;
