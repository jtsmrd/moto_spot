import React, { useEffect, useState, useRef } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import MarkerCluster from './MarkerCluster';

const MapContainer = (props) => {
    const mapRef = useRef();
    const [checkins, setCheckins] = useState([]);
    const [mapArea, setMapArea] = useState({ NELat: null, NELon: null, SWLat: null, SWLon: null });

    useEffect(() => {
        getRiderCheckins();
        // getInitialMapVisibleArea();
    }, []);

    function getInitialMapVisibleArea() {
        setTimeout(() => {
            // @ts-ignore
            let ne = mapRef.current.map.getBounds().getNorthEast();
            // @ts-ignore
            let sw = mapRef.current.map.getBounds().getSouthWest();
            setMapArea({ NELat: ne.lat(), NELon: ne.lng(), SWLat: sw.lat(), SWLon: sw.lng() });
        }, 100);
    }

    function getRiderCheckins() {
        axios
            .get('/api/get-rider-checkins', {
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

    function onDragEnd() {}

    function onZoomChanged() {}

    function onMarkerClicked({ event, location, marker }) {
        console.log(location);
    }

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
                <Map
                    ref={mapRef}
                    // @ts-ignore
                    google={props.google}
                    // @ts-ignore
                    zoom={12}
                    initialCenter={{
                        lat: 40.4406,
                        lng: -79.9959,
                    }}
                    onDragend={onDragEnd}
                    onZoomChanged={onZoomChanged}
                >
                    <MarkerCluster locations={checkins} click={onMarkerClicked} />
                </Map>
            </div>
        </div>
    );
};

export default GoogleApiWrapper(
    { apiKey: 'AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA' },
    // @ts-ignore
)(MapContainer);
