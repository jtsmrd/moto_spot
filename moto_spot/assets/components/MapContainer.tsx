import React, { useEffect, useState, useRef, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRiderCheckins } from '../redux/Selectors';
import { getRiderCheckinsRequestAction } from '../redux/Actions';
import Map from './Map';

const MapContainer = (props) => {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [mapArea, setMapArea] = useState({ NELat: null, NELon: null, SWLat: null, SWLon: null });
    const [initialCenter, setInitialCenter] = useState({
        lat: 40.4406,
        lng: -79.9959,
    });
    const DEFAULT_ZOOM_LEVEL = 12;
    const DEFAULT_DISTANCE_FILTER = 200;
    const riderCheckins = useSelector(getRiderCheckins);

    useEffect(() => {
        dispatch(
            getRiderCheckinsRequestAction({
                lat: initialCenter.lat,
                lng: initialCenter.lng,
                distance: DEFAULT_DISTANCE_FILTER,
            }),
        );
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

    const onDragEnd = () => {
        console.log('onDragEnd');
    };

    const onZoomChanged = () => {
        console.log('onZoomChanged');
    };

    const onMarkerClicked = ({ event, location, marker }) => {
        console.log('Marker clicked: ', location);
    };

    return (
        <Map
            // @ts-ignore
            mapRef={mapRef}
            defaultZoomLevel={DEFAULT_ZOOM_LEVEL}
            initialCenter={initialCenter}
            onDragEnd={onDragEnd}
            onZoomChanged={onZoomChanged}
            riderCheckins={riderCheckins}
            onMarkerClicked={onMarkerClicked}
        />
    );
};

export default MapContainer;
