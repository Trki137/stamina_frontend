import React, { ChangeEvent, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchInput from "../../components/Input/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import UserProfileBar from "./UserProfileBar";

type SearchSidebarType = {
  handleSearchActiveChange: () => void;
  searchActive: boolean;
};
export default function SearchSidebar({
  handleSearchActiveChange,
  searchActive,
}: SearchSidebarType) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Sidebar sidebarActive={searchActive}>
      <FontAwesomeIcon
        icon={faX}
        className="ml-2 mt-2 w-3 h-3 cursor-pointer"
        onClick={handleSearchActiveChange}
      />
      <SearchInput value={searchTerm} handleChange={handleChange} />
      <div className="mt-7 border-t-[1px] border-gray-300">
        <UserProfileBar />
        <UserProfileBar />
        <UserProfileBar />
      </div>
    </Sidebar>
  );
}
