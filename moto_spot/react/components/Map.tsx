import React from 'react';
import { Map as GoogleMap, GoogleApiWrapper, Marker } from 'google-maps-react';
import MarkerCluster from './MarkerCluster';
import * as Types from '../redux/Types';

export interface MapProps {
    mapRef: object;
    defaultZoomLevel: number;
    riderCheckins: Types.RiderCheckin[];
    riderMeetups: Types.RiderMeetup[];
    userCheckin: Types.RiderCheckin;
    onReady: any;
    onDragEnd: any;
    onZoomChanged: any;
    onRiderMarkerClicked: any;
    onUserMarkerClicked: any;
    onMeetupMarkerClicked: any;
    isMobile: boolean;
    isCreatingMeetup: boolean;
}

const Map: React.FC<MapProps> = (props) => {
    const {
        mapRef,
        defaultZoomLevel,
        onDragEnd,
        onZoomChanged,
        riderCheckins,
        riderMeetups,
        userCheckin,
        onReady,
        onRiderMarkerClicked,
        onUserMarkerClicked,
        onMeetupMarkerClicked,
        isMobile,
        isCreatingMeetup,
    } = props;

    const displayMeetups = () => {
        return riderMeetups.map((meetup) => {
            const meetupMarker = (
                <Marker
                    key={meetup.id}
                    // @ts-ignore
                    position={{ lat: meetup.lat, lng: meetup.lng }}
                    onClick={() => {
                        onMeetupMarkerClicked(meetup);
                    }}
                />
            );
            return meetupMarker;
        });
    };

    return (
        <GoogleMap
            // @ts-ignore
            ref={mapRef}
            // @ts-ignore
            google={props.google}
            // @ts-ignore
            zoom={defaultZoomLevel}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            disableDefaultUI={isMobile}
            onReady={onReady}
            onDragend={onDragEnd}
            onZoomChanged={onZoomChanged}
        >
            {!isCreatingMeetup && userCheckin && (
                <Marker
                    // @ts-ignore
                    position={{ lat: userCheckin.lat, lng: userCheckin.lng }}
                    onClick={() => {
                        onUserMarkerClicked(userCheckin);
                    }}
                />
            )}
            {!isCreatingMeetup && <MarkerCluster riderCheckins={riderCheckins} click={onRiderMarkerClicked} />}
            {!isCreatingMeetup && displayMeetups()}
        </GoogleMap>
    );
};

export default GoogleApiWrapper(
    { apiKey: 'AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA' },
    // @ts-ignore
)(Map);
