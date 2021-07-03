import moment from 'moment';
import { format, utcToZonedTime } from 'date-fns-tz';

export function currentTimeIsAfter(timeInterval: number): boolean {
    return moment.utc().isAfter(moment.unix(timeInterval).utc());
}

export function currentDateIsAfter(date: string): boolean {
    return moment.utc().isAfter(moment.utc(date));
}

export function currentTimeIsAfterTimePlusMinutes(timeInterval: number, minutesToAdd): boolean {
    return moment.utc().isAfter(moment.unix(timeInterval).utc().add(minutesToAdd, 'minutes'));
}

export function getUtcStringAddingMinutes(minutes: number, date?: string): string {
    const targetMoment = date ? moment.utc(date) : moment.utc();
    return targetMoment.add(minutes, 'minutes').format('yyyy-MM-DD kk:mm:ss');
}

export function getLocalDateStringAddingMinutes(minutesToAdd: number): string {
    return moment().add(minutesToAdd, 'minutes').format('yyyy-MM-DD kk:mm:ss');
}

export function getExpireDisplayStringAddingMinutes(minutesToAdd: number): string {
    const expireDate = moment().add(minutesToAdd, 'minutes');
    const expireDateString = expireDate.format('h:mm a');
    const isToday = expireDate.isSame(new Date(), 'day');

    if (isToday) {
        return `today at ${expireDateString}`;
    } else {
        return `tomorrow at ${expireDateString}`;
    }
}

export function getExpireDisplayString(date: string): string {
    const expireDate = moment(date);
    const expireDateString = expireDate.format('h:mm a');
    const isToday = expireDate.isSame(new Date(), 'day');

    if (isToday) {
        return `today at ${expireDateString}`;
    } else {
        return `tomorrow at ${expireDateString}`;
    }
}

export function formatLocalTodayTomorrowTime(utcDate: string): string {
    const targetMoment = moment(moment.utc(utcDate).toDate()).local();
    const formattedDate = targetMoment.format('h:mm a');
    const isToday = targetMoment.isSame(new Date(), 'day');

    if (isToday) {
        return `today at ${formattedDate}`;
    } else {
        return `tomorrow at ${formattedDate}`;
    }
}

export function getLocalDateFromUtcInterval(utcInterval: number): Date {
    const localDateInterval = convertUtcIntervalToLocal(utcInterval);
    return moment.unix(localDateInterval).toDate();
}

export function getCurrentTimestamp(): number {
    return moment.utc().valueOf() / 1000;
}

export const formatUtcString = (date) => {
    return format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd kk:mm:ss', { timeZone: 'UTC' });
};

function convertUtcIntervalToLocal(utcInterval: number): number {
    return 0;
}
