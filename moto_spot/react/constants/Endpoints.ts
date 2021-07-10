//<editor-fold desc="RiderCheckin Endpoints">

import { formatString } from '../utilities/stringUtils';

export const GET_RIDER_CHECKINS = '/api/get_rider_checkins';
export const CREATE_RIDER_CHECKIN = '/api/create_rider_checkin';
const EXPIRE_RIDER_CHECKIN = '/api/expire_rider_checkin/%s1';
export const EXTEND_RIDER_CHECKIN = '/api/extend_rider_checkin';

export function expireRiderCheckin(id: number): string {
    return formatString(EXPIRE_RIDER_CHECKIN, id);
}

//</editor-fold>

//<editor-fold desc="RiderMeetup Endpoints">

export const GET_RIDER_MEETUPS = '/api/get_rider_meetups';
export const CREATE_RIDER_MEETUP = '/api/create_rider_meetup';
const UPDATE_RIDER_MEETUP = '/api/update_rider_meetup/%s1';
const EXPIRE_RIDER_MEETUP = '/api/expire_rider_meetup/%s1';

export function updateRiderMeetup(id: number): string {
    return formatString(UPDATE_RIDER_MEETUP, id);
}

export function expireRiderMeetup(id: number): string {
    return formatString(EXPIRE_RIDER_MEETUP, id);
}

//</editor-fold>
