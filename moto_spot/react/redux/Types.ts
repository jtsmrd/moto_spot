export interface RiderCheckin {
    id: number;
    userUUID: string;
    lat: number;
    lng: number;
    expireDate: number;
}

export interface RiderMeetup {
    id: number;
    userUUID: string;
    lat: number;
    lng: number;
    meetupTimestamp: number;
    expireTimestamp: number;
}

export interface MapBounds {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

export interface MapCenter {
    lat: number;
    lng: number;
}

export interface RiderCheckinFetchInfo {
    timestamp: number;
    bounds: MapBounds;
}
