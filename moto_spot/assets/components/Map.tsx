import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  onDragEnd(mapProps, map, e) {
    let ne = map.getBounds().getNorthEast();
    let sw = map.getBounds().getSouthWest();
    console.log(ne.lat() + ";" + ne.lng());
    console.log(sw.lat() + ";" + sw.lng());
  }

  coords = [
    { id: 1, lat: 40.4406, lng: -79.9859 },
    { id: 2, lat: 40.4506, lng: -79.9759 },
    { id: 3, lat: 40.4506, lng: -79.9659 },
  ];

  displayMarkers() {
    let markers = [];
    this.coords.forEach((coord) => {
      markers.push(
        <Marker key={coord.id} position={{ lat: coord.lat, lng: coord.lng }} />
      );
    });
    return markers;
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 40.4406,
          lng: -79.9959,
        }}
        style={{ width: "100%", height: "100%" }}
        onDragend={this.onDragEnd}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA",
})(MapContainer);
