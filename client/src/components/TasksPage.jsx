import { useEffect } from "react";
import { useState } from "react";
import { Api } from "../api";
import TasksList from "./TasksList";
import { Box } from "@mui/material";

function TasksPage() {
  // const [tempTasks, setTempTasks] = useState([]);
  // //
  // // useEffect(() => {
  // //   rerender();
  // // }, []);
  // //
  // function onSearchChange(text) {
  //   Api.getTasks()
  //     .then((taskJSON) => {
  //       let filteredtasks = taskJSON.filter((task) => {
  //         return task.name.indexOf(text) > -1;
  //       });
  //       setTempTasks([...filteredtasks]);
  //     })
  //     .catch((error) => alert(error.message));
  // }
  // //
  // function sortingTasks(evt) {
  //   Api.getTasks()
  //     .then((taskJSON) => {
  //       if (evt.target.value === "date: newest first") {
  //         let filteredTasks = taskJSON.sort((a, b) => {
  //           return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  //         });
  //         setTempTasks([...filteredTasks]);
  //       }
  //       if (evt.target.value === "name: a-z") {
  //         let filteredTasks = taskJSON.sort((a, b) =>
  //           a.name.localeCompare(b.name)
  //         );
  //         setTempTasks([...filteredTasks]);
  //       }
  //       if (evt.target.value === "name: z-a") {
  //         let filteredTasks = taskJSON.sort((a, b) =>
  //           b.name.localeCompare(a.name)
  //         );
  //         setTempTasks([...filteredTasks]);
  //       }
  //       if (evt.target.value === "date: oldest first") {
  //         let filteredTasks = taskJSON.sort((a, b) => {
  //           return b.date < a.date ? -1 : b.date > a.date ? 1 : 0;
  //         });
  //         setTempTasks([...filteredTasks]);
  //       }
  //     })
  //     .catch((error) => alert(error.message));
  //   }
  //
  return (
    <>
      <Box marginTop={5}>
        <TasksList />
      </Box>
    </>
  );
}

export default TasksPage;
