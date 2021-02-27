import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

const MapContainer = (props) => {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    getRiderCheckins();
  }, []);

  function getRiderCheckins() {
    axios
      .get("/api/get-rider-checkins", {
        params: {
          lat: 40.4406,
          lon: -79.9959,
          distance: 200,
        },
      })
      .then(function (response) {
        setCheckins(response.data);
      });
  }

  function onDragEnd(mapProps, map, e) {
    let ne = map.getBounds().getNorthEast();
    let sw = map.getBounds().getSouthWest();
    console.log(ne.lat() + ";" + ne.lng());
    console.log(sw.lat() + ";" + sw.lng());
  }

  function displayMarkers() {
    let markers = [];
    checkins.forEach((checkin) => {
      markers.push(
        <Marker
          key={checkin.id}
          // @ts-ignore
          position={{ lat: checkin.lat, lng: checkin.lon }}
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
          zoom={12}
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
