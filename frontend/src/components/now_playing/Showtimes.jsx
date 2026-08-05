// Componente que permite colocar todos los 
// dias en que se estaran presentando peliculas

import { useEffect, useState } from "react";
import Text from "../Text";
import { getDatesFormat, getDay, getMonth } from "../../util/timeFunctions";

export default function Showtimes() {
    const today = new Date();
    const [week, setWeek] = useState([]);

    // Muestra los dias de jueves a miercoles
    useEffect(() => {
        const today = new Date();
        let month = today.getMonth();
        let date = today.getDate();
        const day = today.getDay();
        const year = today.getFullYear();
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let [dateString, dateFormat] = ["", ""];
        let availablesDays = [];

        // Si el dia actual es miercoles "3" muestra solamente
        // este dia y nada mas. De lo contrario mostrara los 
        // proximos dias
        if(day == 3){
            [dateString, dateFormat] = getDatesFormat(day, month, date, year);

            availablesDays.push({
                day: day,
                date: date,
                month: month
            })
        }

        else {
            for(let i = day; i != 3; i++){
                [dateString, dateFormat] = getDatesFormat(day, month, date, year, i);

                availablesDays.push({
                    day: i,
                    date: date,
                    month: month
                })

                date++;

                // Cambia del dia sabado a domingo
                if(i == weekDays.length-1)
                    i = -1;
            }

            [dateString, dateFormat] = getDatesFormat(day, month, date, year, 3);

            availablesDays.push({
                day: 3,
                date: date,
                month: month
            })
        }

        setWeek([...availablesDays]);
    }, [])

    return (
        <div id="days">
            {
                week.map((day, index) =>
                    <div className="day" key={index}>
                        <Text>{getDay(day.day)?.substring(0,3)}</Text>
                        <Text>{day.date}</Text>
                        <Text>{getMonth(day.month)?.substring(0,3)}</Text>
                    </div>
                )
            }
            
        </div>
    )
}