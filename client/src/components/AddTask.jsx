import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Api } from "../api";
import moment from "moment";

export default function AddTask() {
  const nameRef = useRef();
  const destinationDateRef = useRef();
  const navigate = useNavigate();

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
        alert("added successfully");
        navigate("/tasks");
      })
      .catch((error) => alert(error.message));
  }
  return (
    <section className="AddTask">
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
          label="Destination date"
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
          sx={{ width: { xs: "80%", md: "60%" }, margin: "auto" }}
        >
          Add Task
        </Button>
      </Box>
    </section>
  );
}
