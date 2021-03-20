import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MarkerClusterer from '@googlemaps/markerclustererplus';

const eventNames = ['click', 'dblclick', 'dragend', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'recenter'];

const MarkerCluster = (props) => {
    const { map, google, locations } = props;

    const handleEvent = ({ event, location, marker }) => {
        if (props[event]) {
            props[event]({
                props: props,
                event: event,
                location: location,
                marker: marker,
            });
        }
    };

    useEffect(() => {
        if (map && locations) {
            const mapMarkers = locations.map((location) => {
                const markerImage = new google.maps.MarkerImage('/images/m0.png');

                const marker = new google.maps.Marker({
                    position: {
                        lat: location.lat,
                        lng: location.lng,
                    },
                    map: map,
                    name: 'M',
                    icon: markerImage,
                    label: '1',
                });

                eventNames.forEach((e) => {
                    marker.addListener(e, () =>
                        handleEvent({
                            event: e,
                            location: location,
                            marker: marker,
                        }),
                    );
                });

                return marker;
            });

            const clusterer = new MarkerClusterer(map, mapMarkers, { imagePath: '/images/m' });

            // Cleanup function. Note, this is only returned if we create the markers
            return () => {
                clusterer.clearMarkers();
            };
        }
    }, [map, google, locations]);

    return null;
};

MarkerCluster.propTypes = {
    map: PropTypes.object,
    google: PropTypes.object,
    locations: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }),
    ),
    click: PropTypes.func,
};

export default MarkerCluster;
