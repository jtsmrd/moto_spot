import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getMapBounds,
    getMapCenterLoaded,
    getMapViewMode,
    getRiderCheckins,
    getRiderMeetups,
    getRiderMeetupState,
    getUserCheckin,
} from '../redux/Selectors';
import {
    getRiderCheckinsRequestAction,
    getRiderMeetupsRequestAction,
    removeExpiredRiderCheckins,
    setSelectedRiderCheckinAction,
    setSelectedUserCheckinAction,
    updateMapBoundsAction,
    updateMapCenterAction,
    updateMapZoomAction,
} from '../redux/Actions';
import Map from './Map';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery, useTheme } from '@material-ui/core';
import * as Types from '../redux/Types';
import { useGeoLocation } from '../hooks/useGeoLocation';
import RiderCheckinView from './RiderCheckinView';
import CreateRiderMeetupView from './CreateRiderMeetupView';
import { MapViewMode } from '../redux/reducers/MapInfoReducer';
import RiderMeetupView from './RiderMeetupView';

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

const MapContainer: React.FC<{}> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const mapRef = useRef();
    const theme = useTheme();
    const { geoLocationLat, geoLocationLng, geoLocationError } = useGeoLocation();
    const DEFAULT_ZOOM_LEVEL = 12;
    const mapBounds = useSelector(getMapBounds);
    const riderCheckins = useSelector(getRiderCheckins);
    const userCheckin = useSelector(getUserCheckin);
    const riderMeetups = useSelector(getRiderMeetups);
    const mapCenterLoaded = useSelector(getMapCenterLoaded);
    const mapViewMode = useSelector(getMapViewMode);
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
            fetchRiderCheckins();
            fetchRiderMeetups();
        }
    }, [geoLocationLat, geoLocationLng]);

    useEffect(() => {
        if (geoLocationError) {
            alert(geoLocationError);
        }
    }, [geoLocationError]);

    useEffect(() => {
        if (mapCenterLoaded) {
            fetchRiderCheckins();
            fetchRiderMeetups();
        }
    }, [mapCenterLoaded]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(removeExpiredRiderCheckins({}));
        }, 300000); // 5 minutes
        return () => clearInterval(interval);
    }, []);

    function fetchRiderCheckins() {
        console.log('Fetch rider checkins');
        dispatch(getRiderCheckinsRequestAction({}));
    }

    function fetchRiderMeetups() {
        console.log('Fetch rider meetups');
        dispatch(getRiderMeetupsRequestAction({}));
    }

    // Update the map bounds when they change
    useEffect(() => {
        // @ts-ignore
        const googleMapBounds = mapRef?.current?.map?.getBounds();
        if (googleMapBounds) {
            const ne = googleMapBounds.getNorthEast();
            const sw = googleMapBounds.getSouthWest();

            if (
                ne.lat() != mapBounds.neLat ||
                ne.lng() != mapBounds.neLng ||
                sw.lat() != mapBounds.swLat ||
                sw.lng() != mapBounds.swLng
            ) {
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
            }
        }
        // @ts-ignore
    }, [mapRef?.current?.map?.getBounds()]);

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
    };

    const onDragEnd = (mapProps, map, event) => {
        updateMapCenter(map.center.lat(), map.center.lng());

        if (mapViewMode === MapViewMode.RiderCheckins) {
            fetchRiderCheckins();
        } else if (mapViewMode === MapViewMode.RiderMeetups) {
            fetchRiderMeetups();
        }
    };

    const onZoomChanged = (mapProps, map, event) => {
        updateMapZoom(map.zoom);

        if (mapViewMode === MapViewMode.RiderCheckins) {
            fetchRiderCheckins();
        } else if (mapViewMode === MapViewMode.RiderMeetups) {
            fetchRiderMeetups();
        }
    };

    const onRiderMarkerClicked = ({ event, riderCheckin, marker }) => {
        dispatch(setSelectedRiderCheckinAction({ riderCheckin: riderCheckin }));
        console.log('Rider marker selected: ', riderCheckin);
    };

    const onUserMarkerClicked = (userCheckin: Types.RiderCheckin) => {
        dispatch(setSelectedUserCheckinAction({ userCheckin: userCheckin }));
    };

    const onMeetupMarkerClicked = (riderMeetup: Types.RiderMeetup) => {
        console.log(riderMeetup);
    };

    const getView = useCallback(() => {
        switch (mapViewMode) {
            case MapViewMode.RiderCheckins:
                return <RiderCheckinView />;
            case MapViewMode.RiderMeetups:
                return <RiderMeetupView />;
            case MapViewMode.CreateRiderMeetup:
                return <CreateRiderMeetupView />;
            default:
                return null;
        }
    }, [mapViewMode]);

    return (
        <div className={classes.root}>
            <Map
                // @ts-ignore
                mapRef={mapRef}
                defaultZoomLevel={DEFAULT_ZOOM_LEVEL}
                onReady={onReady}
                onDragEnd={onDragEnd}
                onZoomChanged={onZoomChanged}
                riderCheckins={riderCheckins}
                riderMeetups={riderMeetups}
                userCheckin={userCheckin}
                onRiderMarkerClicked={onRiderMarkerClicked}
                onUserMarkerClicked={onUserMarkerClicked}
                onMeetupMarkerClicked={onMeetupMarkerClicked}
                isMobile={isMobile}
                mapViewMode={mapViewMode}
            />
            {getView()}
        </div>
    );
};

export default MapContainer;
