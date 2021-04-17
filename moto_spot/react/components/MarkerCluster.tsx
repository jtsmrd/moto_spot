import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { isExpired } from '../utilities/dateTimeUtils';

const eventNames = ['click', 'dblclick', 'dragend', 'mousedown', 'mouseout', 'mouseover', 'mouseup', 'recenter'];

// ToDo: Figure out how to pass google and map child props from GoogleMap
// export interface MarkerClusterProps {
//     map: object;
//     google: object;
//     riderCheckins: Types.RiderCheckin[];
//     click: typeof func;
// }

const MarkerCluster = (props) => {
    const { map, google, riderCheckins } = props;

    const handleEvent = ({ event, riderCheckin, marker }) => {
        if (props[event]) {
            props[event]({
                props: props,
                event: event,
                riderCheckin: riderCheckin,
                marker: marker,
            });
        }
    };

    useEffect(() => {
        if (map && riderCheckins) {
            const mapMarkers = riderCheckins.map((riderCheckin) => {
                const markerImage = new google.maps.MarkerImage('/images/m0.png');
                const marker = new google.maps.Marker({
                    position: {
                        lat: riderCheckin.lat,
                        lng: riderCheckin.lng,
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
                            riderCheckin: riderCheckin,
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
    }, [map, google, riderCheckins]);

    return null;
};

MarkerCluster.propTypes = {
    map: PropTypes.object,
    google: PropTypes.object,
    riderCheckins: PropTypes.arrayOf(
        PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
            expireDate: PropTypes.number.isRequired,
        }),
    ),
    click: PropTypes.func,
};

export default MarkerCluster;
