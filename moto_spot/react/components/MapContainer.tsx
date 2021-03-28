import React, { useEffect, useState, useRef, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRiderCheckins, getVisibleRiderCheckins } from '../redux/Selectors';
import { createRiderCheckinRequestAction, getRiderCheckinsRequestAction, setMapBoundsAction } from '../redux/Actions';
import Map from './Map';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            [theme.breakpoints.down('md')]: {
                height: '50vh',
            },
        },
    }),
);

const MapContainer = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const mapRef = useRef();
    const [initialCenter, setInitialCenter] = useState({
        lat: 40.4406,
        lng: -79.9959,
    });
    const [currentLocation, setCurrentLocation] = useState(null);
    const DEFAULT_ZOOM_LEVEL = 12;
    const DEFAULT_DISTANCE_FILTER = 200;
    const riderCheckins = useSelector(getRiderCheckins);
    const visibleRiderCheckins = useSelector(getVisibleRiderCheckins);

    useEffect(() => {
        dispatch(
            getRiderCheckinsRequestAction({
                lat: initialCenter.lat,
                lng: initialCenter.lng,
                distance: DEFAULT_DISTANCE_FILTER,
            }),
        );
    }, []);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const locationOptions = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    const locationSuccess = (position) => {
        console.log(position);
        setCurrentLocation(position.coords);
    };

    const locationError = (error) => {
        console.log(error);
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
                if (result.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(locationSuccess);
                } else if (result.state === 'prompt') {
                    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
                } else if (result.state === 'denied') {
                    console.log(result.state);
                }
                result.onchange = function () {
                    console.log(result.state);
                };
            });
        } else {
            alert('Location unavailable');
        }
    };

    function getMapVisibleArea() {
        setTimeout(() => {
            // @ts-ignore
            let ne = mapRef.current.map.getBounds().getNorthEast();
            // @ts-ignore
            let sw = mapRef.current.map.getBounds().getSouthWest();
            dispatch(
                setMapBoundsAction({
                    neLat: ne.lat(),
                    neLng: ne.lng(),
                    swLat: sw.lat(),
                    swLng: sw.lng(),
                }),
            );
        }, 200);
    }

    const onReady = () => {
        getMapVisibleArea();
    };

    const onDragEnd = (e) => {
        getMapVisibleArea();
    };

    const onZoomChanged = () => {
        getMapVisibleArea();
    };

    const onMarkerClicked = ({ event, location, marker }) => {
        console.log('Marker clicked: ', location);
    };

    const handleCheckin = () => {
        if (currentLocation) {
            dispatch(
                createRiderCheckinRequestAction({
                    lat: currentLocation.latitude,
                    lng: currentLocation.longitude,
                }),
            );
        } else {
            alert('You must enable location to checkin');
        }
    };

    return (
        <div className={classes.root}>
            <div
                style={{
                    zIndex: 1,
                    width: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                }}
            >
                <p
                    style={{
                        display: 'inline-flex',
                        backgroundColor: 'rgba(200, 200, 200, 0.5)',
                    }}
                >
                    Number of riders: {visibleRiderCheckins.length}
                </p>
            </div>
            <Map
                // @ts-ignore
                mapRef={mapRef}
                defaultZoomLevel={DEFAULT_ZOOM_LEVEL}
                initialCenter={initialCenter}
                onReady={onReady}
                onDragEnd={onDragEnd}
                onZoomChanged={onZoomChanged}
                riderCheckins={riderCheckins}
                onMarkerClicked={onMarkerClicked}
                currentLocation={currentLocation}
            />
            <div
                style={{
                    zIndex: 1,
                    width: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: 0,
                }}
            >
                <Button style={{ backgroundColor: 'rgba(200, 200, 200, 0.5)' }} onClick={handleCheckin}>
                    Check in
                </Button>
            </div>
        </div>
    );
};

export default MapContainer;
