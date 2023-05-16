import { Dispatch, SetStateAction } from "react";

import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";

type GeocoderType = {
  setLocation: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
};
export default function Geocoder({ setLocation }: GeocoderType) {
  const accessToken =
    "sk.eyJ1IjoidHJraTE4OTkiLCJhIjoiY2xidzh4NmxoMDZrZjNwcndyYWw5NDBocyJ9.96nMxOaiS_q6U9JnuHHAxQ";
  const ctrl = new MapBoxGeocoder({
    accessToken: accessToken,
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setLocation({ lat: coords[1], lng: coords[0] });
  });

  return null;
}
