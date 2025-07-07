import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { searchIndex } from "../utils/searchIndex";

const fuse = new Fuse(searchIndex, {
  keys: ["keywords"],
  threshold: 0.3,
});

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
    } else {
      const fuseResult = fuse.search(value);
      setResults(fuseResult.map((res) => res.item));
    }
  };

  const handleSelect = () => {
    setQuery("");
    setResults([]);
    navigate(route);
  };

  return (
    <div className=" bg-white text-black relative w-full max-w-md mx-auto mt-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a section..."
        className="w-full bg-white text-black p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1">
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item.route)}
              className="p-3 hover:bg-blue-100 cursor-pointer"
            >
              {item.keyword}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
