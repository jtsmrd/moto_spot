import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';
import { getMapViewMode, getVisibleRiderCheckins, getVisibleRiderMeetups } from '../redux/Selectors';
import { setMapViewModeAction } from '../redux/Actions';
import { MapViewMode } from '../redux/reducers/MapInfoReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabsContainer: {
            marginTop: '0.5rem',
            height: '35px',
            minHeight: '35px',
        },
        tabBase: {
            height: '35px',
            minHeight: '35px',
            width: '140px',
            textTransform: 'capitalize',
        },
        checkinsTab: {
            backgroundColor: 'cyan',
            borderTopLeftRadius: '5px',
        },
        meetupsTab: {
            backgroundColor: 'orange',
            borderTopRightRadius: '5px',
        },
    }),
);

const RiderCheckinMeetupSelector: React.FC<{}> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mapViewMode = useSelector(getMapViewMode);
    const visibleRiderCheckins = useSelector(getVisibleRiderCheckins);
    const visibleRiderMeetups = useSelector(getVisibleRiderMeetups);
    const [selectedTabIndex, setSelectedTabIndex] = useState(mapViewMode);
    const checkinsTabText = `Checkins (${visibleRiderCheckins.length})`;
    const meetupsTabText = `Meetups (${visibleRiderMeetups.length})`;

    useEffect(() => {
        setSelectedTabIndex(mapViewMode);
    }, [mapViewMode]);

    const tabSelected = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(setMapViewModeAction({ mapViewMode: MapViewMode[MapViewMode[newValue]] }));
    };

    return (
        <Tabs
            value={selectedTabIndex}
            onChange={tabSelected}
            indicatorColor={'primary'}
            className={classes.tabsContainer}
            centered
        >
            <Tab label={checkinsTabText} className={`${classes.tabBase} ${classes.checkinsTab}`} />
            <Tab label={meetupsTabText} className={`${classes.tabBase} ${classes.meetupsTab}`} />
        </Tabs>
    );
};

export default RiderCheckinMeetupSelector;
