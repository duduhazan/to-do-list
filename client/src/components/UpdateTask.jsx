import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../api";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";

export default function UpdateTask() {
  const navigate = useNavigate();
  const destinationDateRef = useRef();
  let params = useParams();
  let [task, setTask] = useState([]);
  const nameRef = useRef();

  useEffect(() => {
    Api.getTaskByName(params.name)
      .then((taskJSON) => setTask(taskJSON))
      .catch((error) => console.log(error.message));
  }, []);

  function onUpdate() {
    const oldTaskName = params.name
    const newTask = {
      name: nameRef.current.value,
      destinationDate: moment(
        destinationDateRef.current.value,
        "DD/MM/YYYY"
      ).unix(),
    };
    Api.updateTask(newTask, oldTaskName)
      .then((res) => {
        alert("updated succesfully");
        navigate("/tasks");
      })
      .catch((error) => alert(error.message));
  }
  if(!task || task.length == 0) return;
  return (
    <section className="UpdateTask">
      <h2>Update Task</h2>
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        disabled
        defaultValue={task.name}
      />
      <TextField
        label="Enter task name"
        variant="outlined"
        color="info"
        fullWidth
        sx={{
          marginBottom: "8px",
        }}
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
          onClick={onUpdate}
          variant="contained"
          sx={{ width: { xs: "80%", md: "60%" }, margin: "auto" }}
        >
          Update Task
        </Button>
      </Box>
    </section>
  );
}
