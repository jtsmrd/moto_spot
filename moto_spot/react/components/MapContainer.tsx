import React, { useEffect, useState, useRef, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRiderCheckins, getVisibleRiderCheckins } from '../redux/Selectors';
import { getRiderCheckinsRequestAction, setMapBoundsAction } from '../redux/Actions';
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
        getMapVisibleArea();
    }, []);

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

    const onDragEnd = (e) => {
        getMapVisibleArea();
    };

    const onZoomChanged = () => {
        getMapVisibleArea();
    };

    const onMarkerClicked = ({ event, location, marker }) => {
        console.log('Marker clicked: ', location);
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
                onDragEnd={onDragEnd}
                onZoomChanged={onZoomChanged}
                riderCheckins={riderCheckins}
                onMarkerClicked={onMarkerClicked}
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
                <Button style={{ backgroundColor: 'rgba(200, 200, 200, 0.5)' }}>Check in</Button>
            </div>
        </div>
    );
};

export default MapContainer;
