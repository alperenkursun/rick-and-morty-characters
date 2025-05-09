import "./App.css";
import Showcase from "./components/Showcase";
import Filters from "./components/Filters";
import List from "./components/List";
import Pagination from "./components/Pagination";

function App() {
  return (
    <div className="w-full min-h-[10px]">
      <Showcase />
      <div className="flex flex-col 2xl:flex-row px-[10px] 2xl:px-0 sm:gap-[60px] max-w-[1200px] mx-auto py-[45px]">
        <Filters />
        <List />
      </div>
      <Pagination />
    </div>
  );
}

export default App;
