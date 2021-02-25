import React from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = (props) => {
  const coords = [
    { id: 1, lat: 40.4406, lng: -79.9859 },
    { id: 2, lat: 40.4506, lng: -79.9759 },
    { id: 3, lat: 40.4506, lng: -79.9659 },
  ];

  function onDragEnd(mapProps, map, e) {
    let ne = map.getBounds().getNorthEast();
    let sw = map.getBounds().getSouthWest();
    console.log(ne.lat() + ";" + ne.lng());
    console.log(sw.lat() + ";" + sw.lng());
  }

  function displayMarkers() {
    let markers = [];
    coords.forEach((coord) => {
      markers.push(
        <Marker
          key={coord.id}
          // @ts-ignore
          position={{ lat: coord.lat, lng: coord.lng }}
        />
      );
    });
    return markers;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "80vh",
          width: "80vw",
        }}
      >
        <Map
          // @ts-ignore
          google={props.google}
          // @ts-ignore
          zoom={14}
          initialCenter={{
            lat: 40.4406,
            lng: -79.9959,
          }}
          onDragend={onDragEnd}
        >
          {displayMarkers()}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper(
  { apiKey: "AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA" }
  // @ts-ignore
)(MapContainer);
