import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMapCenterLoaded, getRiderCheckins, getRiderMeetupState, getUserCheckin } from '../redux/Selectors';
import {
    getRiderCheckinsRequestAction,
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
    const riderCheckins = useSelector(getRiderCheckins);
    const userCheckin = useSelector(getUserCheckin);
    const mapCenterLoaded = useSelector(getMapCenterLoaded);
    const { isCreatingMeetup } = useSelector(getRiderMeetupState);
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

    function fetchRiderCheckins() {
        console.log('Fetch rider checkins');
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

        if (!isCreatingMeetup) {
            fetchRiderCheckins();
        }
    };

    const onZoomChanged = (mapProps, map, event) => {
        updateMapZoom(map.zoom);
        getMapVisibleArea();

        if (!isCreatingMeetup) {
            fetchRiderCheckins();
        }
    };

    const onRiderMarkerClicked = ({ event, riderCheckin, marker }) => {
        dispatch(setSelectedRiderCheckinAction({ riderCheckin: riderCheckin }));
        console.log('Rider marker selected: ', riderCheckin);
    };

    const onUserMarkerClicked = (userCheckin: Types.RiderCheckin) => {
        dispatch(setSelectedUserCheckinAction({ userCheckin: userCheckin }));
    };

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
                userCheckin={userCheckin}
                onRiderMarkerClicked={onRiderMarkerClicked}
                onUserMarkerClicked={onUserMarkerClicked}
                isMobile={isMobile}
                isCreatingMeetup={isCreatingMeetup}
            />
            {isCreatingMeetup ? <CreateRiderMeetupView /> : <RiderCheckinView />}
        </div>
    );
};

export default MapContainer;
