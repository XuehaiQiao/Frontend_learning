import React from "react";

interface CalendarCellProps {
    date?: Date;
    onClick: Function;
    index: number;
    today?: Date;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ date, onClick, index, today }) => {

    const handleClick = () => {
        onClick(date);
    }

    const getClassName = () => {
        console.log(today, date)
        if(!today || !date) return "calendar-cell";


        if (today.getDate() === date.getDate() &&
            today.getMonth() === date.getMonth() &&
            today.getFullYear() === date.getFullYear()
        ) {
            console.log("current day: ", today);
            return "calendar-cell is-today";
        }

        return "calendar-cell";
    }

    return (
        <div className={getClassName()} key={index} onClick={handleClick}>
            {date == null ? "" : [date.getDate()]}
        </div>
    )
}

export default CalendarCell;