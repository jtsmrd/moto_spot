export interface RiderCheckin {
    id: number;
    userUUID: string;
    createDate: string;
    expireDate: string;
    lat: number;
    lng: number;
}

export interface RiderMeetup {
    id: number;
    userUUID: string;
    createDate: string;
    meetupDate: string;
    expireDate: string;
    title: string;
    description: string;
    lat: number;
    lng: number;
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
