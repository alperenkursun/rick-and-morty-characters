import { useContext } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { CharacterContext } from "../contexts/CharacterContext";

function Pagination() {
  const { activePage, setActivePage } = useContext(CharacterContext);
  const totalPages = 37;
  const maxVisiblePages = 5;

  const getItemProps = (index) => ({
    variant: activePage === index ? "filled" : "text",
    color: activePage === index ? "red" : "black",
    className:
      activePage === index ? "text-[#00ee00] cursor-pointer" : "cursor-pointer",
    onClick: () => setActivePage(index),
  });

  const next = () => {
    if (activePage === totalPages) return;
    setActivePage(activePage + 1);
  };

  const prev = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
  };

  const getVisiblePages = () => {
    let start = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-[45px]">
      <div className="flex justify-center gap-[15px] py-[10px]">
        <Button
          variant="text"
          className="flex items-center gap-2 cursor-pointer"
          onClick={prev}
          disabled={activePage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
        </Button>

        <div className="flex items-center gap-2">
          {getVisiblePages().map((page) => (
            <IconButton key={page} {...getItemProps(page)}>
              {page}
            </IconButton>
          ))}
        </div>

        <Button
          variant="text"
          className="flex items-center gap-2 cursor-pointer"
          onClick={next}
          disabled={activePage === totalPages}
        >
          Next
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
