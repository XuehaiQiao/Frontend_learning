import React, { useState } from "react";
import CalendarCell from "./CalendarCell";
import CalendarSwitches from "./CalendarSwitches";

export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const MyCalendar: React.FC = () => {
    const today = new Date();

    const [showMonth, setShowMonth] = useState(today.getMonth());
    const [showYear, setShowYear] = useState(today.getFullYear());

    const handleChangePage = (newDate: Date) => {
        setShowMonth(newDate.getMonth());
        setShowYear(newDate.getFullYear());
    }

    const getDayCells = () => {
        const monthDays = new Date(showYear, showMonth + 1, 0).getDate();
        const firstDay = new Date(showYear, showMonth, 1).getDay();
        const emptyDays = firstDay % 7
        console.log(monthDays, firstDay, emptyDays);

        const DaysArr: (Date | undefined)[] = [];
        for (var i = 1; i < (firstDay + 1); i++) {
            DaysArr.push(undefined)
        }

        for (var i = 1; i <= monthDays; i++) {
            DaysArr.push(new Date(showYear, showMonth, i))
        }
        return (<div className="cell-box">
            {
                DaysArr.map((date, index) => {
                    return <CalendarCell 
                    date={date} 
                    onClick={(date: Date) => console.log(date)} 
                    index={index}
                    today={today}
                    />
                })
            }
        </div>)
    }

    return (
        <div className="calendar">
            <CalendarSwitches month={showMonth} year={showYear} onChange={handleChangePage}/>
            <h1>{`Calendar for ${monthNames[showMonth]} ${showYear} (United States)`}</h1>

            {getDayCells()}

        </div>
    )
}

export default MyCalendar;