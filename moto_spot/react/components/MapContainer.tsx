import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMapCenterLoaded, getRiderCheckins, getUserCheckin, getVisibleRiderCheckins } from '../redux/Selectors';
import {
    createRiderCheckinRequestAction,
    expireRiderCheckinRequestAction,
    extendRiderCheckinRequestAction,
    getRiderCheckinsRequestAction,
    removeExpiredRiderCheckins,
    updateMapBoundsAction,
    updateMapCenterAction,
    updateMapZoomAction,
} from '../redux/Actions';
import Map from './Map';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import RiderCheckinDialog from './RiderCheckinDialog';
import * as Types from '../redux/Types';
import UserCheckinDialog from './UserCheckinDialog';
import { getUtcIntervalAddingMinutes } from '../utilities/dateTimeUtils';
import { usePosition } from '../hooks/usePosition';
import { useGeoLocation } from '../hooks/useGeoLocation';

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
            border: '1px solid gray',
            fontSize: '1rem',
            [theme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            },
        },
        bottomButtonContainer: {
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            position: 'absolute',
            bottom: '2rem',
        },
        meetupButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        meetupButtonTitle: {
            fontSize: '1rem',
        },
        checkinButton: {
            backgroundColor: 'rgba(18, 215, 255, 0.75)',
            textTransform: 'capitalize',
            padding: '1rem 0',
            borderRadius: '1rem',
            border: '1px solid gray',
            width: '40%',
        },
        checkinButtonTitle: {
            fontSize: '1rem',
        },
    }),
);

const MapContainer = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const mapRef = useRef();
    const theme = useTheme();
    const { positionLat, positionLng, positionError } = usePosition();
    const { geoLocationLat, geoLocationLng, geoLocationError } = useGeoLocation();
    const [checkinDialogVisible, setCheckinDialogVisible] = useState(false);
    const [userCheckinDialogVisible, setUserCheckinDialogVisible] = useState(false);
    const DEFAULT_ZOOM_LEVEL = 12;
    const riderCheckins = useSelector(getRiderCheckins);
    const userCheckin = useSelector(getUserCheckin);
    const visibleRiderCheckins = useSelector(getVisibleRiderCheckins);
    const mapCenterLoaded = useSelector(getMapCenterLoaded);
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
        defaultMatches: true,
    });

    // Set map center after getting users' geo location
    useEffect(() => {
        if (geoLocationLat && geoLocationLng) {
            // @ts-ignore
            mapRef.current.map.setCenter({
                lat: geoLocationLat,
                lng: geoLocationLng,
            });
            updateMapCenter(geoLocationLat, geoLocationLng);
            getMapVisibleArea();
            fetchRiderCheckins();
        }
    }, [geoLocationLat, geoLocationLng]);

    useEffect(() => {
        if (geoLocationError) {
            alert(geoLocationError);
        }
    }, [geoLocationError]);

    useEffect(() => {
        if (positionError) {
            alert(positionError);
        }
    }, [positionError]);

    useEffect(() => {
        if (mapCenterLoaded) {
            fetchRiderCheckins();
        }
    }, [mapCenterLoaded]);

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

    const handleUserCheckinDialogExtend = (extendInterval) => {
        setUserCheckinDialogVisible(false);
        handleExtendCheckin(extendInterval);
    };

    const handleUserCheckinDialogDelete = () => {
        setUserCheckinDialogVisible(false);
        handleRemoveCheckin();
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
        if (positionLat && positionLng) {
            dispatch(
                createRiderCheckinRequestAction({
                    lat: positionLat,
                    lng: positionLng,
                    expire_date: expireValue ? getUtcIntervalAddingMinutes(expireValue) : null,
                }),
            );
        } else {
            alert('You must enable location to checkin');
        }
    };

    const handleRemoveCheckin = () => {
        if (userCheckin) {
            dispatch(expireRiderCheckinRequestAction({ id: userCheckin.id }));
        }
    };

    const handleExtendCheckin = (extendInterval) => {
        if (userCheckin) {
            dispatch(
                extendRiderCheckinRequestAction({
                    id: userCheckin.id,
                    extendInterval: extendInterval,
                }),
            );
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
                onReady={onReady}
                onDragEnd={onDragEnd}
                onZoomChanged={onZoomChanged}
                riderCheckins={riderCheckins}
                userCheckin={userCheckin}
                onMarkerClicked={onMarkerClicked}
                onUserMarkerClicked={onUserMarkerClicked}
                isMobile={isMobile}
            />
            <div className={classes.bottomButtonContainer}>
                <Button className={classes.meetupButton}>
                    <Typography className={classes.meetupButtonTitle}>Create Meetup</Typography>
                </Button>
                <Button
                    className={classes.checkinButton}
                    onClick={() => {
                        setCheckinDialogVisible(true);
                    }}
                >
                    <Typography className={classes.checkinButtonTitle}>Check In</Typography>
                </Button>
            </div>
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
    );
};

export default MapContainer;
