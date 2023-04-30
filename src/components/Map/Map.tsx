import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";

import Geocoder from "./Geocoder";

type MapType = {
  setPostcode: Dispatch<SetStateAction<string>>;
  setTownName: Dispatch<SetStateAction<string>>;
  setStreetName: Dispatch<SetStateAction<string>>;
  location: {
    lat: number;
    lng: number;
  };
  setLocation: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
};

export default function Map({
  setPostcode,
  setStreetName,
  setTownName,
  location,
  setLocation,
}: MapType) {
  const [zoom] = useState<number>(8);

  useEffect(() => {
    const endpoint = "mapbox.places";
    fetch(
      `https://api.mapbox.com/geocoding/v5/${endpoint}/${location.lng},${location.lat}.json?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.features.length === 0) return;

        const postcode = data.features[1].place_name.split(",")[0];
        const city = data.features[2].place_name.split(",")[0];
        const address = data.features[0].place_name.split(",")[0];

        setStreetName(address);
        setTownName(city);
        setPostcode(postcode);
      });
  }, [location]);

  const handleDrag = (e: any) => {
    const { lng, lat } = e.lngLat;
    setLocation({ lng, lat });
  };

  return (
    <React.Fragment>
      <div className="map-container">
        <ReactMapGL
          mapboxAccessToken={
            "pk.eyJ1IjoidHJraTE4OTkiLCJhIjoiY2xidzd4cDk1MXJ2bTNwcWQ4anR1OWpnNiJ9.mDOSx9XQoNS8_Yzbbsn3kQ"
          }
          initialViewState={{
            longitude: location.lng,
            latitude: location.lat,
            zoom: zoom,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            longitude={location.lng}
            latitude={location.lat}
            draggable
            onDragEnd={handleDrag}
          />
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) =>
              setLocation({ lng: e.coords.longitude, lat: e.coords.latitude })
            }
          />
          <Geocoder setLocation={setLocation} />
        </ReactMapGL>
      </div>
    </React.Fragment>
  );
}
