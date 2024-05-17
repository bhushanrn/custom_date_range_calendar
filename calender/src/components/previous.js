

// This file contains code which was implemented for using MUI calendar and react calendar to create custom range picker.
// But it did not worked out.
// For now, keeping this, will remove in future if want.


import { Box, Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker, DateRangeCalendar, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { useState } from 'react';
import { LicenseInfo } from '@mui/x-license';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TempCal from './components/calendar';
import DateRangePicker from './components/calendar';

LicenseInfo.setLicenseKey('370e579ab4fef48a1739afecb9c68d3bTz04OTIyMyxFPTE3NDU3NTAwNTUwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y');

function App() {



    const [numberOfClicks, setNumberOfClicks] = useState(0)

    // value can be 1 or 2 only
    const [numberOfClickWhereDateRangeIsCleared, setNumberOfClickWhereDateRangeIsCleared] = useState(2)






    const [selectedValue, setSelectedValue] = useState([])


    const [selectionRange, setSelectionRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    )


    function temp(ranges) {
        console.log(ranges.selection);
        setSelectionRange(ranges.selection)
    }

    function temp2() {
        setSelectionRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        })
    }



    const handleCalendervalueChange = (value) => {

        let fValue = value[0]
        let sValue = value[1]

        // ======================================================================================================================================

        setSelectedValue(value)



        // ===============================================================================================================================================================



        // if (sValue === null || sValue === undefined) {
        //   setSelectedValue([fValue, fValue])
        //   console.log([fValue, fValue]);
        // }
        // else if (fValue === null || fValue === undefined) {
        //   setSelectedValue([sValue, sValue])
        //   console.log([sValue, sValue]);
        // }
        // else {
        //   let fMmTime = dayjs(fValue).valueOf()
        //   let sMmTime = dayjs(sValue).valueOf()

        //   if (fMmTime > sMmTime) {
        //     setSelectedValue([sValue, fValue])
        //   } else {
        //     setSelectedValue([fValue, sValue])
        //   }


        //   console.log([fValue, sValue]);
        // }


        // ==============================================================================================================================================================


        // if (numberOfClickWhereDateRangeIsCleared === 1) {

        //   if (numberOfClicks % 2 === 0) {
        //     setSelectedValue(selectedValue[0], fValue)
        //     console.log([selectedValue[0], fValue]);
        //   }
        //   else {
        //     setSelectedValue([sValue, null])
        //     console.log([sValue, null]);
        //   }
        // } else {
        //   setSelectedValue([fValue, sValue])
        // }

        setNumberOfClicks(numberOfClicks + 1)
    }

    const handleClearButtonClick = () => {

        if (numberOfClicks % 2 === 0) {
            setNumberOfClickWhereDateRangeIsCleared(2)
        }
        else {
            setNumberOfClickWhereDateRangeIsCleared(1)
        }
        setSelectedValue([])

    }

    const [date, setDate] = useState([
        new Date(2024, 6, 10),
        new Date(2024, 6, 20),
    ]);


    const clearBtn = () => {
        setDate([])
    }


    return (
        <>

            <Box
                sx={{
                    margin: 10
                }}
            >
                <h1>Calender</h1>

                <Box>

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DateRangeCalendar value={selectedValue} onChange={(value) => handleCalendervalueChange(value)} />



          </LocalizationProvider> */}

                    {/* <Calendar numberOfMonths={2} selectRange value={date} onChange={setDate} /> */}

                    {/* <TempCal /> */}





                    <Box
                        sx={{
                            display: "flex"
                        }}
                    >

                        <Button
                            onClick={clearBtn}
                        >
                            Clear
                        </Button>


                        <Button>
                            Apply
                        </Button>

                    </Box>

                    <Box>
                        <Typography>This is For error msg</Typography>
                    </Box>


                </Box>



            </Box>
        </>
    );
}


export default App;
