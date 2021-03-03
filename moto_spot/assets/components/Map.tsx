import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MarkerCluster from './MarkerCluster';
import { getRiderCheckins } from '../redux/Selectors';
import { getRiderCheckinsRequestAction } from '../redux/Actions';

const MapContainer = (props) => {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const riderCheckins = useSelector(getRiderCheckins);
    const [mapArea, setMapArea] = useState({ NELat: null, NELon: null, SWLat: null, SWLon: null });

    useEffect(() => {
        dispatch(
            getRiderCheckinsRequestAction({
                lat: 40.4406,
                lng: -79.9959,
                distance: 200,
            }),
        );
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
                    <MarkerCluster locations={riderCheckins} click={onMarkerClicked} />
                </Map>
            </div>
        </div>
    );
};

export default GoogleApiWrapper(
    { apiKey: 'AIzaSyADuYgHAFiqldTqvg_iT48-JDLCTWnCvwA' },
    // @ts-ignore
)(MapContainer);
