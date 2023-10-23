import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  Circle,
} from "@react-google-maps/api";
import { getBicycleLocation } from "@/app/api/bicycles/bicycles";

const libraries = ["places"];

const Map = ({ currBike, bikes, currLat, currLong }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [bikeTrackLocation, setBikeTrackLocation] = useState(null);
  const autocompleteRef = useRef(null);

  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  // useEffect(() => {
  //   if (
  //     currBike == null ||
  //     currBike.last_seen_lat == null ||
  //     currBike.last_seen_lon == null
  //   ) {
  //     return;
  //   }
  //   setCurrentLocation({
  //     lat: currBike.last_seen_lat,
  //     lng: currBike.last_seen_lon,
  //   });
  // }, [currBike]);

  useEffect(() => {
    if (!currBike || currLat == "-" || currLong == "-") {
      return;
    }
    setBikeTrackLocation({
      lat: +currLat,
      lng: +currLong,
    });
  }, [currLat, currLong]);

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  // const center = { lat: "YOUR-LATITUDE", lng: "YOUR-LONGITUDE" };

  // handle place change on search
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
    setSearchLngLat({
      lat: +place.geometry.location.lat(),
      lng: +place.geometry.location.lng(),
    });
    setCurrentLocation(null);
  };

  // get current location
  const handleGetLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedPlace(null);
          setSearchLngLat(null);
          setCurrentLocation({ lat: +latitude, lng: +longitude });
          console.log({ latitude, longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // on map load
  const onMapLoad = (map) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      controlDiv
    );
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      // novena mrt
      center: { lat: 1.3085, lng: 103.8451 },
      radius: 500,
    });
    handleGetLocationClick();
  };

  const bikeIcon = {
    url: "https://cdn-icons-png.flaticon.com/512/3198/3198344.png", // Replace with the URL of your custom image
    scaledSize: new google.maps.Size(40, 40), // Set the desired width and height
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {/* map component  */}
      <GoogleMap
        zoom={bikeTrackLocation || currentLocation || selectedPlace ? 18 : 12}
        center={bikeTrackLocation || currentLocation || searchLngLat}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "80%", height: "20rem", margin: "auto" }}
        onLoad={onMapLoad}
      >
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
        {bikeTrackLocation && (
          <Marker position={bikeTrackLocation} icon={bikeIcon} />
        )}
        {bikes.map((bike) => (
          <Marker
            key={`marker-${bike.id}`}
            position={{
              lat: +bike.last_seen_lat,
              lng: +bike.last_seen_lon,
            }}
            icon={bikeIcon}
          />
        ))}

        {/* <Marker position={{ lat: 1.3085, lng: 103.8451 }} icon={bikeIcon} /> */}
        {/* <Circle
          center={{ lat: 2.3055, lng: 103.7731 }}
          radius={10000}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        ></Circle> */}
      </GoogleMap>

      {/* search component  */}
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
        options={{ fields: ["address_components", "geometry", "name"] }}
      >
        <input type="text" placeholder="Search for a location" />
      </Autocomplete>
    </div>
  );
};

export default Map;
