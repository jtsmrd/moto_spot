import moment from 'moment';

export function currentTimeIsAfter(timeInterval: number): boolean {
    return moment.utc().isAfter(moment.unix(timeInterval).utc());
}

export function currentTimeIsAfterTimePlusMinutes(timeInterval: number, minutesToAdd): boolean {
    return moment.utc().isAfter(moment.unix(timeInterval).utc().add(minutesToAdd, 'minutes'));
}

export function getUtcIntervalAddingMinutes(minutesToAdd: number): number {
    // moment.utc() uses millisecond precision, remove by dividing by 1000
    return moment.utc().add(minutesToAdd, 'minutes').valueOf() / 1000;
}

export function getLocalDateFromUtcInterval(utcInterval: number): Date {
    const localDateInterval = convertUtcIntervalToLocal(utcInterval);
    return moment.unix(localDateInterval).toDate();
}

export function getCurrentTimestamp(): number {
    return moment.utc().valueOf() / 1000;
}

function convertUtcIntervalToLocal(utcInterval: number): number {
    return 0;
}
