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

export function getUtcDate(): any {
    return moment.utc().format('yyyy-MM-DD kk:mm:ss');
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

export function getCurrentTimestamp(): number {
    return moment.utc().valueOf() / 1000;
}

export const formatUtcString = (date) => {
    return format(utcToZonedTime(date, 'UTC'), 'yyyy-MM-dd kk:mm:ss', { timeZone: 'UTC' });
};
