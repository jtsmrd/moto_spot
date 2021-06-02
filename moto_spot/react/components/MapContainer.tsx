import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMapCenterLoaded, getRiderCheckins, getUserCheckin, getVisibleRiderCheckins } from '../redux/Selectors';
import {
    createRiderCheckinRequestAction,
    deleteRiderCheckinRequestAction,
    getRiderCheckinsRequestAction,
    removeExpiredRiderCheckins,
    updateMapBoundsAction,
    updateMapCenterAction,
    updateMapZoomAction,
} from '../redux/Actions';
import Map from './Map';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import RiderCheckinDialog from './RiderCheckinDialog';
import * as Types from '../redux/Types';
import UserCheckinDialog from './UserCheckinDialog';
import { getUtcIntervalAddingMinutes } from '../utilities/dateTimeUtils';

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
        numberOfRidersContainer: {
            zIndex: 1,
            width: '100%',
            textAlign: 'center',
            position: 'absolute',
            top: '1rem',
        },
        numberOfRidersText: {
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 192, 18, 0.5)',
            padding: '1rem 2rem',
            borderRadius: '1rem',
            fontSize: '1rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '2rem',
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
    const [checkinDialogVisible, setCheckinDialogVisible] = useState(false);
    const [userCheckinDialogVisible, setUserCheckinDialogVisible] = useState(false);
    const DEFAULT_ZOOM_LEVEL = 12;
    const DEFAULT_DISTANCE_FILTER = 200;
    const riderCheckins = useSelector(getRiderCheckins);
    const userCheckin = useSelector(getUserCheckin);
    const visibleRiderCheckins = useSelector(getVisibleRiderCheckins);
    const mapCenterLoaded = useSelector(getMapCenterLoaded);

    useEffect(() => {
        if (mapCenterLoaded) {
            fetchRiderCheckins();
        }
    }, [mapCenterLoaded]);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(removeExpiredRiderCheckins({}));
        }, 300000); // 5 minutes
        return () => clearInterval(interval);
    }, []);

    const handleRiderCheckinDialogCheckin = (expireValue) => {
        setCheckinDialogVisible(false);
        handleCheckin(expireValue);
    };

    const handleUserCheckinDialogExtend = (extendValue) => {
        setUserCheckinDialogVisible(false);
    };

    const handleUserCheckinDialogDelete = () => {
        setUserCheckinDialogVisible(false);
        handleRemoveCheckin();
    };

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

    function fetchRiderCheckins() {
        dispatch(getRiderCheckinsRequestAction({}));
    }

    function getMapVisibleArea() {
        setTimeout(() => {
            try {
                // @ts-ignore
                let ne = mapRef.current.map.getBounds().getNorthEast();
                // @ts-ignore
                let sw = mapRef.current.map.getBounds().getSouthWest();
                console.log('Successfully got map bounds');
                dispatch(
                    updateMapBoundsAction({
                        mapBounds: {
                            neLat: ne.lat(),
                            neLng: ne.lng(),
                            swLat: sw.lat(),
                            swLng: sw.lng(),
                        },
                    }),
                );
            } catch (e) {
                console.log('Unable to get map bounds on load, retrying: ', e);
                getMapVisibleArea();
            }
        }, 200);
    }

    function updateMapCenter(lat: number, lng: number) {
        dispatch(
            updateMapCenterAction({
                mapCenter: {
                    lat: lat,
                    lng: lng,
                },
            }),
        );
    }

    function updateMapZoom(mapZoom: number) {
        dispatch(updateMapZoomAction({ mapZoom: mapZoom }));
    }

    const onReady = (mapProps, map, event) => {
        updateMapCenter(map.center.lat(), map.center.lng());
        updateMapZoom(map.zoom);
        getMapVisibleArea();
    };

    const onDragEnd = (mapProps, map, event) => {
        updateMapCenter(map.center.lat(), map.center.lng());
        getMapVisibleArea();
        fetchRiderCheckins();
    };

    const onZoomChanged = (mapProps, map, event) => {
        updateMapZoom(map.zoom);
        getMapVisibleArea();
        fetchRiderCheckins();
    };

    const onMarkerClicked = ({ event, riderCheckin, marker }) => {
        console.log('Marker clicked: ', riderCheckin);
    };

    const onUserMarkerClicked = (userCheckin: Types.RiderCheckin) => {
        setUserCheckinDialogVisible(true);
    };

    const handleCheckin = (expireValue) => {
        if (currentLocation) {
            dispatch(
                createRiderCheckinRequestAction({
                    lat: currentLocation.latitude,
                    lng: currentLocation.longitude,
                    expire_date: expireValue ? getUtcIntervalAddingMinutes(expireValue) : null,
                }),
            );
        } else {
            getCurrentLocation();
            alert('You must enable location to checkin');
        }
    };

    const handleRemoveCheckin = () => {
        if (userCheckin) {
            dispatch(deleteRiderCheckinRequestAction({ id: userCheckin.id }));
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.numberOfRidersContainer}>
                <Typography className={classes.numberOfRidersText}>
                    Number of riders: {visibleRiderCheckins.length}
                </Typography>
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
                userCheckin={userCheckin}
                onMarkerClicked={onMarkerClicked}
                onUserMarkerClicked={onUserMarkerClicked}
            />
            <div
                style={{
                    zIndex: 1,
                    width: '100%',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '2rem',
                }}
            >
                <Button
                    style={{
                        backgroundColor: 'rgba(18, 215, 255, 0.75)',
                        textTransform: 'capitalize',
                        padding: '1rem 4rem',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                    }}
                    onClick={() => {
                        setCheckinDialogVisible(true);
                    }}
                >
                    <Typography style={{ fontSize: '2rem' }}>Check in</Typography>
                </Button>
                <RiderCheckinDialog
                    open={checkinDialogVisible}
                    onCheckin={handleRiderCheckinDialogCheckin}
                    onClose={() => {
                        setCheckinDialogVisible(false);
                    }}
                />
                <UserCheckinDialog
                    open={userCheckinDialogVisible}
                    onClose={() => {
                        setUserCheckinDialogVisible(false);
                    }}
                    onExtend={handleUserCheckinDialogExtend}
                    onDelete={handleUserCheckinDialogDelete}
                />
            </div>
        </div>
    );
};

export default MapContainer;
