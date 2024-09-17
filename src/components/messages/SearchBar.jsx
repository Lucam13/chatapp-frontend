import { useState } from "react";

const SearchMessages = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Llamada para filtrar los mensajes
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar mensajes..."
        className="input input-bordered"
      />
    </div>
  );
};

export default SearchMessages;
