import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Api } from "../api";
import moment from "moment";
import { SnackbarContext } from "../context";

export default function AddTask() {
  const nameRef = useRef();
  const destinationDateRef = useRef();
  const navigate = useNavigate();
  const { setSnack } = useContext(SnackbarContext);

  function onAdd() {
    let newTask = {
      name: nameRef.current.value,
      destinationDate: moment(
        destinationDateRef.current.value,
        "DD/MM/YYYY"
      ).unix(),
    };
    Api.addTask(newTask)
      .then((res) => {
        setSnack({
          message: "The task was successfully saved!",
          severity: "success",
          open: true,
        });
        navigate("/tasks");
      })
      .catch((error) =>
        setSnack({
          message: "The task wasn't saved due to internal error",
          severity: "error",
          open: true,
        })
      );
  }
  return (
    <Box
      sx={{
        textAlign: "center",
        width: { md: "60%", xs: "100%" },
        minWidth: "fit-content",
        margin: { md: "20px auto", xs: 0 },
        borderRadius: "8px",
        boxShadow: "0 0 6px #00000085",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Add Task</h2>
      <TextField
        label="Enter task name"
        variant="outlined"
        color="info"
        fullWidth
        margin="normal"
        inputRef={nameRef}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          minDate={dayjs(Date.now())}
          label="Enter destination date"
          format="DD/MM/YYYY"
          inputFormat="DD/MM/YYYY"
          slotProps={{ textField: { InputProps: { color: "primary" } } }}
          inputRef={destinationDateRef}
        />
      </LocalizationProvider>
      <Box>
        <Button
          onClick={onAdd}
          variant="contained"
          sx={{ width: { xs: "80%", md: "60%" }, margin: "20px auto 0" }}
        >
          Add Task
        </Button>
      </Box>
    </Box>
  );
}
