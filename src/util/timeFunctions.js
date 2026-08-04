const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

// Funcion para obtener el mes segun el numero
function getMonth(monthNumber) {
    return months[monthNumber];
}

// Funcion para obtener el dia de la semana segun el numero
function getDay(dayNumber) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return days[dayNumber];
}

// Funcion que devuelve la fecha en una oracion y en formato regular 
// (Day, Month Date) - (yyyy-mm-dd)
function getDatesFormat(day, month, date, year, currentDay = 0) {
    let dateStringFormat = "";
    let dateFormat = "";

    // Obtiene la fecha en formato de oracion
    if(day == 3) 
        dateStringFormat += "Today, " + getDay(day).substring(0, 3) + ", " + getMonth(month) + " " + date;

    else {
        if(currentDay == day) 
            dateStringFormat += "Today, ";
        else if (currentDay == day+1)
            dateStringFormat += "Tomorrow, ";

        dateStringFormat += getDay(currentDay).substring(0, 3) + ", " + getMonth(month) + " " + date;
    }

    // Obtiene la fecha en el formato yyyy-mm-dd
    dateFormat += year + "-";
    dateFormat += ((month+1) < 10) ? "0" + (month+1) : (month+1);
    dateFormat += "-" + ((date < 10) ? "0" + date : date);

    return [dateStringFormat, dateFormat];
}

// Funcion que devuelve la fecha en un formato de mes, dia y año (Mes Dia, Año)
function getDateFormat(date){
    const partsDate = date.split("-");

    return `${months[partsDate[1]-1].substring(0, 3)} ${partsDate[2]}, ${partsDate[0]}`;
}

// Funcion para colocar la fecha de cuando saldra una pelicula
function getReleaseDate(releaseDate){
    const date = releaseDate.split("-");

    return `${months[date[1]-1]} ${date[2]}`
}

// Funcion que devuelve la hora en 
// el formato de AM o PM
function getHour(hourToChange) {
    const militarHour = {
        "13": 1, 
        "14": 2, 
        "15": 3, 
        "16": 4, 
        "17": 5, 
        "18": 6, 
        "19": 7, 
        "20": 8, 
        "21": 9, 
        "22": 10, 
        "23": 11, 
    }
    const time = hourToChange.split(":")
    const hour = parseInt(time[0]);

    if(hour > 12 && hour < 24)
        return `${militarHour[hour]}:${time[1]} PM`;
    else
        return `${hour}:${time[1]} AM`;
}

export {getMonth, getDay, getDatesFormat, getDateFormat, getReleaseDate, getHour};
