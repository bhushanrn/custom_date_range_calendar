import { Box, TextField } from "@mui/material";
import CalendarWrapper from "./components/calendarWrapper";
import { useState } from "react";




function App() {



  const [checkInValue, setCheckInValue] = useState(null)

  const [checkOutValue, setCheckOutValue] = useState(null)


  const [displayCalendar, setDisplayCalendar] = useState(false)


  const handleDateClick = () => {
    setDisplayCalendar(true)
  }

  const handleFirstValue = (value) => {

    if (value === null) {
      return
    }

    let date = value.getDate()
    let month = value.getMonth() + 1
    let year = value.getFullYear()

    setCheckInValue(date + "/" + month + "/" + year)
  }

  const handleSecondValue = (value) => {

    if (value === null) {
      return
    }

    let date = value.getDate()
    let month = value.getMonth() + 1
    let year = value.getFullYear()

    setCheckOutValue(date + "/" + month + "/" + year)
  }



  return (
    <>

      <Box
        sx={{
          display: "flex",
          marginTop: 10,
          justifyContent: "space-between"
        }}
      >


        <TextField
          value={checkInValue}
          onClick={handleDateClick}

          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          value={checkOutValue}
          onClick={handleDateClick}

          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />




      </Box>

      <CalendarWrapper firstValue={handleFirstValue} secondValue={handleSecondValue} />
    </>

  );
}


export default App;
