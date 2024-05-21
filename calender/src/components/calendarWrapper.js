import { Box, Button, Chip, Typography } from "@mui/material";
import { useState } from "react";
import TezDateRangePicker from "./calendar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./calendarWrapper.css";

export default function CalendarWrapper({
    disabledDates,
    firstValue,
    secondValue,
    handleFirstvalue,
    handleSecondValue,
    apply,
    onClear,
}) {
    const [numberOfClicks, setNumberOfClicks] = useState(0);

    // value can be 1 or 2 only
    const [
        numberOfClickWhereDateRangeIsCleared,
        setNumberOfClickWhereDateRangeIsCleared,
    ] = useState(2);

    const [fMonth, setFMonth] = useState(0);

    function parsedDisableDates() {
        let parsed = [];

        disabledDates.forEach((element) => {
            let splitValues = element.split("-");
            let year = parseInt(splitValues[0]);
            let month = parseInt(splitValues[1]);
            let day = parseInt(splitValues[2]);

            let parsedDate = new Date(year, month - 1, day);
            parsed.push(parsedDate);
        });

        return parsed;
    }

    const [startValue, setStartValue] = useState(firstValue);

    const [endValue, setEndValue] = useState(secondValue);

    const handleOnDateSelect = (fValue, sValue) => {
        let minValue = fValue;
        let maxValue = sValue;

        if (fValue !== null && sValue !== null) {
            if (fValue > sValue) {
                minValue = sValue;
                maxValue = fValue;
            } else {
                minValue = fValue;
                maxValue = sValue;
            }
        } else {
            minValue = fValue;
            maxValue = sValue;
        }

        setStartValue(minValue);
        setEndValue(maxValue);

        // let numClicks = numberOfClicks + 1
        // console.log(numClicks % 2 == 0);

        // setNumberOfClicks(numClicks)

        // if (numClicks % 2 == 0 && startValue !== null) {
        //     handleEvenClick(fValue)
        // } else {
        //     handleOddClick(fValue)
        // }

        handleValuesInParent(minValue, maxValue);
    };

    const handleValuesInParent = (fValue, sValue) => {
        if (fValue !== null && sValue !== null && fValue > sValue) {
            handleFirstvalue(sValue);
            handleSecondValue(fValue);
        } else {
            handleFirstvalue(fValue);
            handleSecondValue(sValue);
        }
    };

    const handleEvenClick = (value) => {
        if (startValue > value) {
            setEndValue(startValue);
            setStartValue(value);
        } else {
            setEndValue(value);
        }
    };

    const handleOddClick = (value) => {
        if (endValue !== null) {
            setStartValue(endValue);
            setEndValue(value);
        } else {
            setStartValue(value);
        }
    };

    const handlePreClick = () => {
        setFMonth(fMonth - 1);
    };

    const handleNextClick = () => {
        setFMonth(fMonth + 1);
    };

    const handleClearbtnClick = () => {
        setStartValue(null);
        setEndValue(null);
        setNumberOfClicks(0);
        handleValuesInParent(null, null);
        onClear();
    };

    const isRangeContainsDisabledDate = () => {
        let res = false;
        if (startValue !== null && endValue !== null) {
            let disabledDates = parsedDisableDates();

            res = disabledDates.some((disabledDate) => {
                return disabledDate > startValue && disabledDate < endValue;
            });
        }

        return res;
    };




    const handleAddtionOfDays = (daysValue) => {
        if (startValue !== null) {
            let tempEndValue = new Date(
                startValue.getFullYear(),
                startValue.getMonth(),
                startValue.getDate() + daysValue
            );
            setEndValue(tempEndValue);
        }
    };

    return (
        <>
            <Box className="calendar-out-box">
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <ArrowBackIosIcon
                            className="previous-arrow"
                            onClick={handlePreClick}
                        />

                        <TezDateRangePicker
                            disabledDates={parsedDisableDates()}
                            selectedStartDate={startValue}
                            selectedEndDate={endValue}
                            month={
                                new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + fMonth + 1,
                                    0
                                )
                            }
                            onDateSelect={handleOnDateSelect}
                        />

                        <TezDateRangePicker
                            disabledDates={parsedDisableDates()}
                            selectedStartDate={startValue}
                            selectedEndDate={endValue}
                            month={
                                new Date(
                                    new Date().getFullYear(),
                                    new Date().getMonth() + fMonth + 2,
                                    0
                                )
                            }
                            onDateSelect={handleOnDateSelect}
                        />

                        <ArrowForwardIosIcon
                            className="next-arrow"
                            onClick={handleNextClick}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <Chip label="+2 days" onClick={() => handleAddtionOfDays(2)} />
                        <Chip label="+3 days" onClick={() => handleAddtionOfDays(3)} />
                        <Chip label="+5 days" onClick={() => handleAddtionOfDays(5)} />
                        <Chip label="+7 days" onClick={() => handleAddtionOfDays(7)} />
                    </Box>

                    <Box
                        sx={{
                            display: isRangeContainsDisabledDate() ? "box" : "none",
                            marginTop: "10px",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FF0000",
                            }}
                        >
                            Some of the selected dates are not available.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            gap: 5,
                        }}
                    >
                        <Button
                            className="calendar-wrapper-btn clear-btn"
                            onClick={handleClearbtnClick}
                        >
                            Clear
                        </Button>

                        <Button className="calendar-wrapper-btn apply-btn" onClick={apply}>
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
