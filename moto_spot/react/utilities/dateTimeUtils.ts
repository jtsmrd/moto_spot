import moment from 'moment';

export function currentDateIsAfter(date: string): boolean {
    return moment.utc().isAfter(moment.utc(date));
}

export function getCurrentTimestamp(): number {
    return moment.utc().valueOf() / 1000;
}

export function currentTimeIsAfterTimePlusMinutes(timeInterval: number, minutesToAdd): boolean {
    return moment.utc().isAfter(moment.unix(timeInterval).utc().add(minutesToAdd, 'minutes'));
}

export function getUtcDate(): any {
    return moment.utc().format('yyyy-MM-DD kk:mm:ss');
}

export function formatToLocalDate(utcDate: string): Date {
    const targetMoment = moment(moment.utc(utcDate).toDate()).local();
    return targetMoment.toDate();
}

export function getDateAddingMinutes(minutes: number): Date {
    return moment().add(minutes, 'minutes').toDate();
}
