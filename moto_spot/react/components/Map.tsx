import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import MarkerCluster from './MarkerCluster';
import * as Types from '../redux/Types';

export interface MapProps {
    mapRef: object;
    defaultZoomLevel: number;
    initialCenter: {
        lat: number;
        lng: number;
    };
    riderCheckins: Types.RiderCheckin[];
    userCheckin: Types.RiderCheckin;
    onReady: any;
    onDragEnd: any;
    onZoomChanged: any;
    onMarkerClicked: any;
    onUserMarkerClicked: any;
}

const Map: React.FC<MapProps> = (props) => {
    const {
        mapRef,
        defaultZoomLevel,
        initialCenter,
        onDragEnd,
        onZoomChanged,
        riderCheckins,
        userCheckin,
        onReady,
        onMarkerClicked,
        onUserMarkerClicked,
    } = props;
    return (
        <GoogleMap
            // @ts-ignore
            ref={mapRef}
            // @ts-ignore
            google={props.google}
            // @ts-ignore
            zoom={defaultZoomLevel}
            initialCenter={initialCenter}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            onReady={onReady}
            onDragend={onDragEnd}
            onZoomChanged={onZoomChanged}
        >
            {userCheckin && (
                <Marker
                    // @ts-ignore
                    position={{ lat: userCheckin.lat, lng: userCheckin.lng }}
                    onClick={onUserMarkerClicked}
                />
            )}
            <MarkerCluster locations={riderCheckins} click={onMarkerClicked} />
        </GoogleMap>
    );
};

export default GoogleApiWrapper(
    { apiKey: 'AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA' },
    // @ts-ignore
)(Map);
