import { Box, Button, Chip, Typography } from '@mui/material';
import { useState } from 'react';
import { LicenseInfo } from '@mui/x-license';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-calendar/dist/Calendar.css';
import TezDateRangePicker from './calendar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./calendarWrapper.css"

LicenseInfo.setLicenseKey('370e579ab4fef48a1739afecb9c68d3bTz04OTIyMyxFPTE3NDU3NTAwNTUwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y');

export default function CalendarWrapper({ firstValue, secondValue }) {
    const [numberOfClicks, setNumberOfClicks] = useState(0)

    // value can be 1 or 2 only
    const [numberOfClickWhereDateRangeIsCleared, setNumberOfClickWhereDateRangeIsCleared] = useState(2)


    const [fMonth, setFMonth] = useState(0)


    const disabledDates = [
        "2024-07-11",
        "2024-07-12",
        "2024-06-21",
        "2024-06-18",
        "2024-06-19",
        "2024-08-08",
        "2024-10-09",
        "2024-05-22",
        "2024-10-31",
        "2024-05-11",
        "2024-05-24",
        "2024-05-25",
        "2024-5-28",
        "2024-5-29",
        "2024-5-30",
        "2024-5-31",
        "2024-5-27",
        "2024-5-26"
    ]

    function parsedDisableDates() {

        let parsed = []

        disabledDates.forEach(element => {

            let splitValues = element.split("-")
            let year = parseInt(splitValues[0])
            let month = parseInt(splitValues[1])
            let day = parseInt(splitValues[2])

            let parsedDate = new Date(year, month - 1, day)
            parsed.push(parsedDate)
        });

        return parsed
    }



    const [startValue, setStartValue] = useState(null)

    const [endValue, setEndValue] = useState(null)


    const handleOnDateSelect = (fValue, sValue) => {


        let minValue = fValue
        let maxValue = sValue

        if (fValue !== null && sValue !== null) {
            if (fValue > sValue) {

                minValue = sValue
                maxValue = fValue

            } else {

                minValue = fValue
                maxValue = sValue

            }
        } else {
            minValue = fValue
            maxValue = sValue

        }

        setStartValue(minValue)
        setEndValue(maxValue)

        // let numClicks = numberOfClicks + 1
        // console.log(numClicks % 2 == 0);



        // setNumberOfClicks(numClicks)

        // if (numClicks % 2 == 0 && startValue !== null) {
        //     handleEvenClick(fValue)
        // } else {
        //     handleOddClick(fValue)
        // }

        handleValuesInParent(minValue, maxValue)
    }


    const handleValuesInParent = (fValue, sValue) => {
        if (fValue !== null && sValue !== null && fValue > sValue) {
            firstValue(sValue)
            secondValue(fValue)
        }
        else {
            firstValue(fValue)
            secondValue(sValue)
        }
    }

    const handleEvenClick = (value) => {
        if (startValue > value) {
            setEndValue(startValue)
            setStartValue(value)
        }
        else {
            setEndValue(value)
        }
    }

    const handleOddClick = (value) => {
        if (endValue !== null) {
            setStartValue(endValue)
            setEndValue((value))
        } else {
            setStartValue(value)
        }
    }


    const handlePreClick = () => {
        setFMonth(fMonth - 1)
    }

    const handleNextClick = () => {
        setFMonth(fMonth + 1)
    }

    const handleClearbtnClick = () => {
        setStartValue(null)
        setEndValue(null)
        setNumberOfClicks(0)
        handleValuesInParent(startValue, endValue)
    }

    const isRangeContainsDisabledDate = () => {

        let res = false
        if (startValue !== null && endValue !== null) {
            let disabledDates = parsedDisableDates()

            res = disabledDates.some((disabledDate) => {
                return (
                    disabledDate > startValue && disabledDate < endValue
                );
            });

        }

        return res



    }


    const handleAddtionOfDays = (daysValue) => {
        if (startValue !== null) {
            let tempEndValue = new Date(startValue.getFullYear(), startValue.getMonth(), startValue.getDate() + daysValue)
            setEndValue(tempEndValue)
        }
    }



    return (
        <>

            <Box
                sx={{
                    margin: 10
                }}
            >

                <Box>

                    <Box sx={{
                        display: "flex"
                    }}>


                        <ArrowBackIosIcon onClick={handlePreClick} />

                        <TezDateRangePicker disabledDates={parsedDisableDates()} selectedStartDate={startValue} selectedEndDate={endValue} month={new Date(new Date().getFullYear(), new Date().getMonth() + fMonth + 1, 0)} onDateSelect={handleOnDateSelect} />


                        <TezDateRangePicker disabledDates={parsedDisableDates()} selectedStartDate={startValue} selectedEndDate={endValue} month={new Date(new Date().getFullYear(), new Date().getMonth() + fMonth + 2, 0)} onDateSelect={handleOnDateSelect} />


                        <ArrowForwardIosIcon onClick={handleNextClick} />


                    </Box>


                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px"
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
                            marginTop: "10px"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#FF0000"
                            }}
                        >

                            Some of the selected dates are not available.

                        </Typography>

                    </Box>



                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                            gap: 5
                        }}
                    >

                        <Button
                            className='calendar-wrapper-btn clear-btn'
                            onClick={handleClearbtnClick}
                        >
                            Clear
                        </Button>


                        <Button
                            className='calendar-wrapper-btn apply-btn'
                        >
                            Apply
                        </Button>

                    </Box>



                </Box>



            </Box>
        </>
    );
}