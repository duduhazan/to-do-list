import { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../api";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import moment from "moment";
import { SnackbarContext } from "../context";

export default function UpdateTask() {
  const navigate = useNavigate();
  const destinationDateRef = useRef();
  let params = useParams();
  let [task, setTask] = useState([]);
  const nameRef = useRef();
  const { setSnack } = useContext(SnackbarContext);

  useEffect(() => {
    Api.getTaskByName(params.name)
      .then((taskJSON) => setTask(taskJSON))
      .catch(() =>
        setSnack({ message: "No tasks were found", severity: "error", open: true })
      );
  }, []);

  function onUpdate() {
    const oldTaskName = params.name;
    const newTask = {
      name: nameRef.current.value,
      destinationDate: moment(
        destinationDateRef.current.value,
        "DD/MM/YYYY"
      ).unix(),
    };
    Api.updateTask(newTask, oldTaskName)
      .then((res) => {
        setSnack({
          message: "The task was successfully updated!",
          severity: "success",
          open: true,
        });
        navigate("/tasks");
      })
      .catch((error) =>
        setSnack({
          message: "The task wasn't updated due to internal error",
          severity: "error",
          open: true,
        })
      );
  }
  if (!task || task.length == 0) return;
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
      <h2>Update Task</h2>
      <TextField
        variant="outlined"
        fullWidth
        margin="normal"
        disabled
        defaultValue={task.name}
      />
      <TextField
        label="Enter new task name"
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
          label="Enter destination date"
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
          sx={{ width: { xs: "80%", md: "60%" }, margin: "20px auto 0" }}
        >
          Update Task
        </Button>
      </Box>
    </Box>
  );
}
