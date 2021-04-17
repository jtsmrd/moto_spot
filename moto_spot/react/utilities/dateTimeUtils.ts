import moment from 'moment';

export function isExpired(timeInterval: number): boolean {
    return moment.utc().isAfter(moment.unix(timeInterval).utc());
}

export function getUtcIntervalAddingMinutes(minutesToAdd: number): number {
    // moment.utc() uses millisecond precision, remove by dividing by 1000
    return moment.utc().add(minutesToAdd, 'minutes').valueOf() / 1000;
}

export function getLocalDateFromUtcInterval(utcInterval: number): Date {
    const localDateInterval = convertUtcIntervalToLocal(utcInterval);
    return moment.unix(localDateInterval).toDate();
}

function convertUtcIntervalToLocal(utcInterval: number): number {
    return 0;
}
