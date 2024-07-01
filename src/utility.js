import { v4 as uuidv4 } from 'uuid';
import { addDays, isWithinInterval, parse, startOfDay } from 'date-fns';

export function generateUniqueId() {
    return uuidv4();
}

export function isDate(date) {
    return date instanceof Date && !isNaN(date);
}

export function makeNewDate(dateString) {
    if(dateString) {
        const parsedDate = parse(dateString, 'd MMM yyyy', new Date());
        return startOfDay(parsedDate);
    } else {
        return startOfDay(new Date());
    }
}

export function makeFutureDate(daysToAdd) {
    const currentDate = makeNewDate();
    const futureDate = addDays(currentDate, daysToAdd);
    return futureDate;
}