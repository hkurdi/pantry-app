import { TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchbarProps {
  onSearch: (searchTerm: string) => void;
}

export const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-5 max-w-[55rem] mx-auto mb-5">
      <TextField
        id="outlined-textarea"
        label="Pantry"
        placeholder="Search for items..."
        multiline
        value={searchTerm}
        onChange={handleSearch}
        className="text-white w-full sm:w-[20rem] md:w-[30rem] lg:w-full"
      />
    </div>
  );
};
