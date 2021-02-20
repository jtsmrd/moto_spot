import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
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
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{"none"}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA",
})(MapContainer);
