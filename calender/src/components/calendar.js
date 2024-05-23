import { useState } from "react";
import "./calendar.css";

const TezDateRangePicker = ({
    month,
    onDateSelect,
    selectedStartDate,
    selectedEndDate,
    disabledDates,
}) => {
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const daysInMonth = getDaysInMonth(month);
    const firstDay = getFirstDayOfMonth(month);

    const monthNames = [
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
        "December",
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // To disable selection on clicking the date range which contains disabled dates. 
    const [shouldDisableSelectionOnClickedDate, setShouldDisableSelectionOnClickedDate] = useState(false)

    const handleDateClick = (day) => {
        const selectedDate = new Date(month.getFullYear(), month.getMonth(), day);

        if (isDateDisabled(selectedDate)) {
            return;
        }

        const currentDate = new Date().setHours(0, 0, 0, 0);
        if (
            selectedDate.setHours(0, 0, 0, 0) < currentDate ||
            isDateDisabled(selectedDate)
        ) {
            return;
        }
        if (!selectedStartDate || selectedEndDate) {
            onDateSelect(selectedDate, null);
        }
        else if (selectedDate > selectedStartDate) {
            if (isRangeContainsDisabledDate(selectedStartDate, selectedDate)) {
                console.log("here 1");
                setShouldDisableSelectionOnClickedDate(true)
                return
            }
            setShouldDisableSelectionOnClickedDate(false)
            onDateSelect(selectedStartDate, selectedDate);
        }
        else {
            if (isRangeContainsDisabledDate(selectedDate, selectedStartDate)) {
                console.log("here 2");
                setShouldDisableSelectionOnClickedDate(true)
                return
            }
            setShouldDisableSelectionOnClickedDate(false)
            onDateSelect(selectedDate, selectedStartDate);
        }
    };


    const checkIfSelectionIsAvailable = (day) => {
        setShouldDisableSelectionOnClickedDate(false)
        const selectedDate = new Date(month.getFullYear(), month.getMonth(), day);

        if (isDateDisabled(selectedDate)) {
            return;
        }

        const currentDate = new Date().setHours(0, 0, 0, 0);
        if (
            selectedDate.setHours(0, 0, 0, 0) < currentDate ||
            isDateDisabled(selectedDate)
        ) {
            return;
        }
        if (!selectedStartDate || selectedEndDate) {

        }
        else if (selectedDate > selectedStartDate) {
            if (isRangeContainsDisabledDate(selectedStartDate, selectedDate)) {
                console.log("here 1");
                setShouldDisableSelectionOnClickedDate(true)
                return
            }
            setShouldDisableSelectionOnClickedDate(false)
        }
        else {
            if (isRangeContainsDisabledDate(selectedDate, selectedStartDate)) {
                console.log("here 2");
                setShouldDisableSelectionOnClickedDate(true)
                return
            }
            setShouldDisableSelectionOnClickedDate(false)
        }
    }

    const isWithinRange = (day) => {
        if (!selectedStartDate || !selectedEndDate) return false;
        const selectedDay = new Date(month.getFullYear(), month.getMonth(), day);
        return (
            selectedDay >= selectedStartDate &&
            selectedDay <= selectedEndDate &&
            selectedDay.getMonth() === month.getMonth() &&
            selectedDay.getFullYear() === month.getFullYear()
        );
    };

    const isDateDisabled = (date) => {
        if (disabledDates) {
            return disabledDates.some((disabledDate) => {
                return (
                    disabledDate.getDate() === date.getDate() &&
                    disabledDate.getMonth() === date.getMonth() &&
                    disabledDate.getFullYear() === date.getFullYear()
                );
            });
        }
    };

    const isRangeContainsDisabledDate = (startValue, endValue) => {
        let res = false;
        if (startValue !== null && endValue !== null) {

            res = disabledDates.some((disabledDate) => {
                return disabledDate >= startValue && disabledDate <= endValue;
            });
        }

        return res;
    };

    return (
        <div className="date-range-picker">
            <div className="header">
                <span>{monthNames[month.getMonth()] + "  " + month.getFullYear()}</span>
            </div>
            <div className="body">
                <div className="days-names">
                    {dayNames.map((day, index) => (
                        <div key={index}>{day}</div>
                    ))}
                </div>
                <div className="dates">
                    {[...Array(firstDay).keys()].map(() => (
                        <div key={Math.random()}></div>
                    ))}
                    {[...Array(daysInMonth).keys()].map((day) => {
                        const currentDate = new Date(
                            month.getFullYear(),
                            month.getMonth(),
                            day + 1
                        );
                        const isPast =
                            currentDate.setHours(0, 0, 0, 0) <
                            new Date().setHours(0, 0, 0, 0);
                        return (
                            <div
                                key={day}
                                className={`date 
                                
                                ${isPast && "past-date"}
                                ${isWithinRange(day + 1) && "in-range"} 
                                ${selectedStartDate &&
                                    selectedStartDate !== "" &&
                                    selectedStartDate.getDate() === day + 1 &&
                                    selectedStartDate.getMonth() ===
                                    month.getMonth() &&
                                    selectedStartDate.getFullYear() ===
                                    month.getFullYear() &&
                                    "selected-start_wrapper"
                                    }
                                    
                                    ${selectedEndDate &&
                                    selectedEndDate !== null &&
                                    selectedEndDate.getDate() === day + 1 &&
                                    selectedEndDate.getMonth() ===
                                    month.getMonth() &&
                                    selectedEndDate.getFullYear() ===
                                    month.getFullYear() &&
                                    "selected-end_wrapper"
                                    }
                                    
                                    ${isDateDisabled(currentDate) && "booked"}`}
                                onClick={() => handleDateClick(day + 1)}
                                onMouseOver={() => checkIfSelectionIsAvailable(day + 1)}
                            >
                                <div
                                    className={`inner-date
                                    ${selectedStartDate &&
                                        selectedStartDate !== "" &&
                                        selectedStartDate.getDate() === day + 1 &&
                                        selectedStartDate.getMonth() ===
                                        month.getMonth() &&
                                        selectedStartDate.getFullYear() ===
                                        month.getFullYear() &&
                                        "selected-start"
                                        }

                                        ${isDateDisabled(currentDate) && "disabled-inner-date"}

                                        ${shouldDisableSelectionOnClickedDate && "disabled-inner-date"}

                                        ${selectedEndDate &&
                                        selectedEndDate !== null &&
                                        selectedEndDate.getDate() ===
                                        day + 1 &&
                                        selectedEndDate.getMonth() ===
                                        month.getMonth() &&
                                        selectedEndDate.getFullYear() ===
                                        month.getFullYear() &&
                                        "selected-end"
                                        }`}
                                >
                                    {day + 1}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TezDateRangePicker;
