export function getDateTimeByString(date:string, time:string) : Date {
    let day : number = parseInt(date.split('.')[0]);
    //месяц всегда на единицу меньше
    let month : number = parseInt(date.split('.')[1]) - 1;
    //считаем, что год отправления не может быть 19хх
    let year : number = parseInt("20" + date.split('.')[2]);
    let hour : number = parseInt(time.split(':')[0]);
    let minute : number = parseInt(time.split(':')[1]);
    return new Date(year, month, day, hour, minute);
}

export function getStopEndingByCount(count: number) : string {
    if (count === 0) return "Прямой";
    if (count === 1) return `${count} пересадка`;
    if ([2,3,4].indexOf(count) > -1) return `${count} пересадки`;
    return "Слишком много пересадок";
}

export default getDateTimeByString;