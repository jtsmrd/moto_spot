import React, { useEffect, useState, useRef, PropsWithChildren } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRiderCheckins } from '../redux/Selectors';
import { getRiderCheckinsRequestAction, setMapBoundsAction } from '../redux/Actions';
import Map from './Map';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
    // const [mapArea, setMapArea] = useState({ NELat: null, NELon: null, SWLat: null, SWLon: null });
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
            // setMapArea({ NELat: ne.lat(), NELon: ne.lng(), SWLat: sw.lat(), SWLon: sw.lng() });
            dispatch(
                setMapBoundsAction({
                    neLat: ne.lat(),
                    neLng: ne.lng(),
                    swLat: sw.lat(),
                    swLng: sw.lng(),
                }),
            );
        }, 100);
    }

    const onDragEnd = (e) => {
        // console.log('onDragEnd);

        // @ts-ignore
        // let ne = mapRef.current.map.getBounds().getNorthEast();
        // @ts-ignore
        // let sw = mapRef.current.map.getBounds().getSouthWest();
        // console.log('lat: ', ne.lat());
        // console.log('lng: ', ne.lng());

        getInitialMapVisibleArea();
    };

    const onZoomChanged = () => {
        console.log('onZoomChanged');
    };

    const onMarkerClicked = ({ event, location, marker }) => {
        console.log('Marker clicked: ', location);
    };

    return (
        <div className={classes.root}>
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
        </div>
    );
};

export default MapContainer;
