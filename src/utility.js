import { v4 as uuidv4 } from 'uuid';
import { addDays, isWithinInterval, parse, startOfDay } from 'date-fns';

export function generateUniqueId() {
    return uuidv4();
}

export function isDate(date) {
    // console.log(`isDate: ${date instanceof Date && !isNaN(date)}`)
    return date instanceof Date && !isNaN(date);
}

export function makeNewDate(dateString) {
    if(dateString) {
        if (dateString.length === 10) {
            console.log('calander date!')
            const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
            return startOfDay(parsedDate);
        } else {
            console.log(dateString)
            console.log('ugh? some date string')
            return startOfDay(new Date(dateString));
        }
    } else {
        console.log(dateString)
        console.log('no date string!')
        return startOfDay(new Date());
    }
}

export function makeFutureDate(daysToAdd) {
    const currentDate = makeNewDate();
    const futureDate = addDays(currentDate, daysToAdd);
    return futureDate;
}

export function isWithinOneWeek(dueDate, currentDate) {
    return isWithinInterval(dueDate, {
        start: currentDate,
        end: makeFutureDate(7),
    });
}