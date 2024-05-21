import TwoInputs from "./components/twoInputs";
import SingleInput from "./components/singleInput";
import { Box, Button } from "@mui/material";
import { useState } from "react";

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
      <TwoInputs
        disabledDates={disabledDates}
        onChange={handleChangeValues}
      />

      <SingleInput
        disabledDates={disabledDates}
        onChange={handleChangeValues}
      />

      <Box
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

        {/* <Button onClick={() => temp()} > CHECK </Button> */}
      </Box>
    </>
  );
}

export default App;
