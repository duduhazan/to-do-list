import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import UpdateTask from "./components/UpdateTask";
import ResponsiveAppBar from "./components/NavBar";
import { useState } from "react";
import { SnackbarContext } from "./context";
import { Alert, Snackbar } from "@mui/material";
import TasksPage from "./components/TasksPage";

function App() {
  const [snack, setSnack] = useState({
    message: "",
    severity: "success",
    open: false,
  });

  const SnackBar = () => {
    return (
      <Snackbar
        autoHideDuration={3000}
        onClose={() => setSnack({open: false})}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    );
  };

  return (
    <BrowserRouter>
      <SnackbarContext.Provider value={{ setSnack }}>
        <ResponsiveAppBar />
        <SnackBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/addTask" element={<AddTask />} />
          <Route path="/tasks/updateTask/:name" element={<UpdateTask />} />
          <Route path="*" element={<section>Invalid route</section>} />
        </Routes>
      </SnackbarContext.Provider>
    </BrowserRouter>
  );
}

export default App;
