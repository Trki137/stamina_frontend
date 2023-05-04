import React, { ChangeEvent, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchInput from "../../components/Input/SearchInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import UserProfileBar from "./UserProfileBar";
import axios from "axios";
import { backend_paths } from "../../api/backend_paths";
import { SearchBarUser } from "../../@types/UserType";

type SearchSidebarType = {
  handleSearchActiveChange: () => void;
  searchActive: boolean;
  user: boolean;
};
export default function SearchSidebar({
  handleSearchActiveChange,
  searchActive,
  user,
}: SearchSidebarType) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<SearchBarUser[]>([]);
  const [filterUsers, setFilterUsers] = useState<SearchBarUser[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let currentUserId = localStorage.getItem("staminaUser");
    if (currentUserId == null) return;
    currentUserId = JSON.parse(currentUserId).userid;

    axios
      .get(`${backend_paths.USERS_URL}/allUsers/${currentUserId}`)
      .then((res) => res.data)
      .then((data: SearchBarUser[]) => {
        setUsers(data);
        setFilterUsers(data);
      })
      .catch((err) => console.log(err));
  }, [user]);

  useEffect(() => {
    setFilterUsers(users.filter((user) => user.username.includes(searchTerm)));
  }, [users, searchTerm]);

  return (
    <Sidebar sidebarActive={searchActive}>
      <div className="w-full flex items-start">
        <FontAwesomeIcon
          icon={faX}
          className="ml-4 mt-2 w-3 h-3 cursor-pointer"
          onClick={handleSearchActiveChange}
        />
      </div>
      <SearchInput value={searchTerm} handleChange={handleChange} />
      <div className="mt-7 border-t-[1px] border-gray-300">
        {filterUsers.length > 0 &&
          filterUsers.map((user: SearchBarUser) => (
            <UserProfileBar
              key={user.userid}
              handleSearchActiveChange={handleSearchActiveChange}
              setUsers={setUsers}
              user={user}
            />
          ))}
      </div>
    </Sidebar>
  );
}
