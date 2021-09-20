export default class DateUtil{

    constructor(){}

    public static getCurrentDateTime(){
        const date: Date = new Date(); 
        let dateTime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
        return `${dateTime}`;
    }

    public static getCurrentDate(){
        const date: Date = new Date(); 
        let currentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return `${currentDate}`;
    }

}