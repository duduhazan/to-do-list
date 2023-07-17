import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";
import ResponsiveAppBar from "./pages/NavBar";
import {  useState } from "react";
import { UserContext, SnackbarContext } from "./context";
import TasksPage from "./pages/TasksPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SnackBar from "./components/SnackBar";

function App() {
  const [snack, setSnack] = useState({
    message: "",
    severity: "success",
    open: false,
  });

  const [user, setUser] = useState(true);

  return (
    <BrowserRouter>
      <SnackbarContext.Provider value={{ snack,setSnack }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ResponsiveAppBar/>
          <SnackBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/addTask" element={<AddTask />} />
            <Route path="/tasks/updateTask/:name" element={<UpdateTask />} />
            <Route path="*" element={<section>Invalid route</section>} />
          </Routes>
        </UserContext.Provider>
      </SnackbarContext.Provider>
    </BrowserRouter>
  );
}

export default App;
