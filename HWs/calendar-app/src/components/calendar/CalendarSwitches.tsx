import React from "react";
import { monthNames } from "./MyCalendar";

interface CalendarCellProps {
    month: number;
    year: number;
    onChange: Function;
}

const CalendarSwitches: React.FC<CalendarCellProps> = ({month, year, onChange}) => {

    return (
        <div className="calendar-switches">
            <button key={month - 1} onClick={() => {onChange(new Date(year, month - 1))}}>
                {`< ${monthNames[(month - 1) % 12]}`}
            </button>

            <span>
                {monthNames[month]}
            </span>

            <button key={month + 1} onClick={() => {onChange(new Date(year, month + 1))}}>
            {`${monthNames[(month + 1) % 12]} >`}
            </button>
        </div>
    )
}

export default CalendarSwitches;