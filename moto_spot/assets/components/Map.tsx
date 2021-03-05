import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper } from 'google-maps-react';
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
    onDragEnd: any;
    onZoomChanged: any;
    onMarkerClicked: any;
}

const Map: React.FC<MapProps> = (props) => {
    const { mapRef, defaultZoomLevel, initialCenter, onDragEnd, onZoomChanged, riderCheckins, onMarkerClicked } = props;
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    height: '80vh',
                    width: '80vw',
                }}
            >
                <GoogleMap
                    // @ts-ignore
                    ref={mapRef}
                    // @ts-ignore
                    google={props.google}
                    // @ts-ignore
                    zoom={defaultZoomLevel}
                    initialCenter={initialCenter}
                    onDragend={onDragEnd}
                    onZoomChanged={onZoomChanged}
                >
                    <MarkerCluster locations={riderCheckins} click={onMarkerClicked} />
                </GoogleMap>
            </div>
        </div>
    );
};

export default GoogleApiWrapper(
    { apiKey: 'AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA' },
    // @ts-ignore
)(Map);
