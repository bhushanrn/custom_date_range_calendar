import TwoInputs from "./components/twoInputs";
import SingleInput from "./components/singleInput";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import PredefinedRange from "./components/predefined_range/predefinedRange";

function App() {

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
    "2024-5-26",
  ];

  const [firstvalue, setFirstvalue] = useState("");

  const [secondValue, setSecondValue] = useState("");

  const handleChangeValues = (fValue, sValue) => {
    setFirstvalue(fValue);
    setSecondValue(sValue);
  };

  function temp() {
    console.log(firstvalue);
    console.log(secondValue);
  }

  return (
    <>
      <br /> <br /> <br />

      <h3>Two Inputs date range selector : </h3>
      <br />
      <TwoInputs
        disabledDates={disabledDates}
        onChange={handleChangeValues}
      />

      <br /> <br /> <br />

      <h3>One Input date range selector : </h3>
      <br />
      <SingleInput
        disabledDates={disabledDates}
        onChange={handleChangeValues}
      />

      <br /> <br /> <br />

      <h3>Predefined minDays and maxDays date range selector : minDays = 3 , maxDays = 7 </h3>
      <br />

      <PredefinedRange
        disabledDates={disabledDates}
        onChange={handleChangeValues}
        minDays={3}
        maxDays={7}
      />
      <br /> <br /> <br />

      <h3>Fixed number of days in date range selector : days = 5 </h3>
      <br />


      <PredefinedRange
        disabledDates={disabledDates}
        onChange={handleChangeValues}
        minDays={5}
        maxDays={5}
      />

      {/* <Box
        sx={{
          marginTop: "40px",
        }}
      >
        <h3>
          Params needed to use Single Input box and Double Input boxes :
        </h3>

        <br />
        <h4> Disabled dates array : ["2024-07-11", "2024-07-12"] </h4>
        <br />

        <h4> onChange arrow function with two arguments </h4>
        <br />

      </Box> */}


      <br /> <br />

      <Button onClick={() => temp()} > CHECK </Button>


    </>
  );
}

export default App;
