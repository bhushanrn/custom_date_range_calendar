import {
    Box,
    ClickAwayListener,
    Popover,
    TextField,
    Tooltip,
    tooltipClasses,
} from "@mui/material";
import { useState } from "react";
import CalendarWrapper from "./calendarWrapper";

export default function TwoInputs() {
    const [finalCheckInValue, setFinalCheckInValue] = useState("");

    const [finalCheckOutValue, setFinalCheckOutValue] = useState("");

    const [checkInValue, setCheckInValue] = useState("");

    const [checkOutValue, setCheckOutValue] = useState("");

    const [displayCalendar, setDisplayCalendar] = useState(false);

    const [calendarAnchor, setCalendarAnchor] = useState(null);

    const open = Boolean(calendarAnchor);
    const id = open ? "popover-id" : undefined;

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

    const handleInputClick = (event) => {
        if (calendarAnchor === null) {
            setCalendarAnchor(event.currentTarget);
        }
        // setDisplayCalendar(true)
    };

    const handleClose = () => {
        console.log(finalCheckInValue);
        console.log(finalCheckOutValue);

        if (finalCheckInValue === "" || finalCheckOutValue === "") {
            setCheckInValue("");
            setCheckOutValue("");
        }
        setCalendarAnchor(null);
    };

    const handleFirstValue = (value) => {
        if (value === null) {
            setCheckInValue("");
            return;
        }

        let date = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();

        setCheckInValue(date + "/" + month + "/" + year);
    };

    const handleSecondValue = (value) => {
        if (value === null) {
            setCheckOutValue("");
            return;
        }

        let date = value.getDate();
        let month = value.getMonth() + 1;
        let year = value.getFullYear();

        setCheckOutValue(date + "/" + month + "/" + year);
    };

    const handleApplyBtnClick = () => {
        console.log("here");
        setFinalCheckInValue(checkInValue);
        setFinalCheckOutValue(checkOutValue);
    };


    const handleClear = () => {
        setFinalCheckInValue("");
        setFinalCheckOutValue("");
    }

    const handleAwayClick = () => {
        // setCalendarAnchor(null)
        // setDisplayCalendar(false)
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    marginTop: 10,
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
                    aria-describedby={id}
                    value={checkInValue}
                    onClick={handleInputClick}
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    value={checkOutValue}
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
