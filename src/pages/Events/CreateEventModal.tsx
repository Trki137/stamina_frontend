import React, { Dispatch, SetStateAction, useState } from "react";
import AddDataModal from "../../components/Modal/AddDataModal";
import Map from "../../components/Map/Map";

type CreateEventModalType = {
  setActive: Dispatch<SetStateAction<boolean>>;
};
export default function CreateEventModal({ setActive }: CreateEventModalType) {
  const [postcode, setPostcode] = useState<string>("10000");
  const [townName, setTownName] = useState<string>("Zagreb");
  const [streetName, setStreetName] = useState<string>("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  }>({
    lat: 45.815399,
    lng: 15.966568,
  });

  return (
    <AddDataModal title={"Create event"} modalChange={() => setActive(false)}>
      <div className="flex-col w-full flex items-center">
        <Map
          setPostcode={setPostcode}
          setTownName={setTownName}
          setStreetName={setStreetName}
          location={location}
          setLocation={setLocation}
        />
      </div>
    </AddDataModal>
  );
}
