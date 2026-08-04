//  Funcion para obtener el nombre de la sala
function getRoomsName(room){
    const rooms = {
        regular: "Regular",
        cxc: "CXC",
        imax: "IMAX",
        fourd: "4D"
    }

    return rooms[room]
}

// Las diferentes horas que estaran disponible
const showtimesHours = [
    "12:00",
    "13:00",
    "13:20",
    "14:20",
    "15:00",
    "16:10",
    "18:00",
    "20:00",
    "20:30",
]

export {getRoomsName, showtimesHours};