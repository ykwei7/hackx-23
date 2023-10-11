import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const Map = ({ currBike, bikes = [] }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const initialLocation = useRef<any>({});
  const autocompleteRef = useRef(null);
  const [address, setAddress] = useState("");

  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (
      currBike == null ||
      currBike.last_seen_lat == null ||
      currBike.last_seen_lon == null
    ) {
      return;
    }
    setCurrentLocation({
      lat: currBike.last_seen_lat,
      lng: currBike.last_seen_lon,
    });
  }, [currBike]);

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  const center = { lat: "YOUR-LATITUDE", lng: "YOUR-LONGITUDE" };

  // handle place change on search
  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
    setSearchLngLat({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
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
          setCurrentLocation({ lat: latitude, lng: longitude });
          initialLocation.current = { lat: latitude, lng: longitude };
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
    controlUI.innerHTML = "Get Location";
    controlUI.style.backgroundColor = "white";
    controlUI.style.color = "black";
    controlUI.style.border = "2px solid #ccc";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.textAlign = "center";
    controlUI.style.width = "100%";
    controlUI.addEventListener("click", handleGetLocationClick);
    controlDiv.appendChild(controlUI);

    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
      controlDiv
    );

    handleGetLocationClick();

    const bikeIcon = {
      url: "https://cdn-icons-png.flaticon.com/512/3198/3198344.png", // Replace with the URL of your custom image
      scaledSize: new google.maps.Size(40, 40), // Set the desired width and height
    };

    bikes.forEach((bike) => {
      if (!bike.last_seen_lat || bike.last_seen_lon) {
        return;
      }
      var bikeMarker = new google.maps.Marker({
        position: new google.maps.LatLng(
          bike.last_seen_lat,
          bike.last_seen_lon
        ),
        map: map,
        icon: bikeIcon,
      });
    });
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
        zoom={currentLocation || selectedPlace ? 18 : 12}
        center={currentLocation || searchLngLat || center}
        mapContainerClassName="map"
        mapContainerStyle={{ width: "80%", height: "20rem", margin: "auto" }}
        onLoad={onMapLoad}
      >
        {selectedPlace && <Marker position={searchLngLat} />}
        {currentLocation && <Marker position={currentLocation} />}
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
