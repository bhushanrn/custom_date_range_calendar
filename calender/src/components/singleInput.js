import { Box, Popover, TextField } from "@mui/material";
import { useState } from "react";
import CalendarWrapper from "./calendarWrapper";
import "./inputBox.css"

export default function SingleInput({
    sx,
    disabledDates,
    onChange
}) {
    const [finalCheckInValue, setFinalCheckInValue] = useState("");

    const [finalCheckOutValue, setFinalCheckOutValue] = useState("");

    const [checkInValue, setCheckInValue] = useState("");

    const [checkOutValue, setCheckOutValue] = useState("");

    const [valueToDisplay, setValueToDisplay] = useState("");

    const [finalValueToDisplay, setFinalValueToDisplay] = useState("");

    const [calendarAnchor, setCalendarAnchor] = useState(null);

    const open = Boolean(calendarAnchor);

    const id = open ? "popover-id" : undefined;

    const handleInputClick = (event) => {
        if (calendarAnchor === null) {
            setCalendarAnchor(event.currentTarget);
        }
    };

    const handleClose = () => {

        if (finalCheckInValue === "" || finalCheckOutValue === "") {
            setCheckInValue("");
            setCheckOutValue("");
        }

        if (finalValueToDisplay === "") {
            setValueToDisplay("");
        }
        setCalendarAnchor(null);
    };

    const handleFirstValue = (value) => {

        if (value === null) {
            setCheckInValue("");
            setFinalCheckInValue("");
            setValueToDisplay("");

            onChange(checkInValue, checkOutValue)

            return;
        }

        let date = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();

        let tempVal = date + "/" + month + "/" + year;
        setCheckInValue(tempVal);
        setValueToDisplay(
            tempVal === checkOutValue ? tempVal : tempVal + " - " + checkOutValue
        );

        onChange(tempVal, checkOutValue)

    };

    const handleSecondValue = (value) => {
        if (value === null) {
            setCheckOutValue("");
            setFinalCheckOutValue("");
            setValueToDisplay("");

            return;
        }

        let date = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();

        let tempVal = date + "/" + month + "/" + year;
        setCheckOutValue(tempVal);
        setValueToDisplay(
            checkInValue === tempVal ? checkInValue : checkInValue + " - " + tempVal
        );

    };

    const sentFirstValue = () => {
        let res = null;
        let temp = checkInValue.split("/");
        if (temp.length === 3) {
            let parsedDate = new Date(temp[2], temp[1] - 1, temp[0]);
            res = parsedDate;
        }

        return res;
    };

    const sentSecondValue = () => {
        let res = null;
        let temp = checkOutValue.split("/");
        if (temp.length === 3) {
            let parsedDate = new Date(temp[2], temp[1] - 1, temp[0]);
            res = parsedDate;
        }

        return res;
    };

    const handleApplyBtnClick = () => {
        setFinalCheckInValue(checkInValue);
        setFinalCheckOutValue(checkOutValue);
        setFinalValueToDisplay(finalCheckInValue + "-" + finalCheckOutValue);
        onChange(checkInValue, checkOutValue)
        setCalendarAnchor(null);
    };

    const handleClear = () => {
        setFinalCheckInValue("");
        setFinalCheckOutValue("");
        setFinalValueToDisplay("");
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: 10,
                }}
            >
                {open ? (
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={calendarAnchor}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        sx={{
                            ".MuiPopover-paper": {
                                borderRadius: "16px",
                                marginTop: "10px",
                            },
                        }}
                    >

                        <CalendarWrapper
                            disabledDates={disabledDates}
                            firstValue={sentFirstValue()}
                            secondValue={sentSecondValue()}
                            handleFirstvalue={handleFirstValue}
                            handleSecondValue={handleSecondValue}
                            apply={handleApplyBtnClick}
                            onClear={handleClear}
                        />

                    </Popover>
                ) : null}

                <TextField
                    sx={{
                        ...sx
                    }}
                    className="date-range-input-field"
                    aria-describedby={id}
                    value={valueToDisplay}
                    onClick={handleInputClick}
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Box>
        </>
    );
}
