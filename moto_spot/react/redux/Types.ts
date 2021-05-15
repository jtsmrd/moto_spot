export interface RiderCheckin {
    id: number;
    userUUID: string;
    lat: number;
    lng: number;
    expireDate: number;
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
