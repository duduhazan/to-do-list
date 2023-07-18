import { Route, Routes, useNavigate } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Home from "./pages/Home";
import UpdateTask from "./pages/UpdateTask";
import ResponsiveAppBar from "./pages/NavBar";
import { useEffect, useState } from "react";
import { UserContext, SnackbarContext } from "./context";
import TasksPage from "./pages/TasksPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SnackBar from "./components/SnackBar";
import { Api } from "./api";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [snack, setSnack] = useState({
    message: "",
    severity: "success",
    open: false,
  });

  const onLogin = (user) => {
    setUser(user);
    console.log(user.email, "is logged in");
  };

  useEffect(function getLoggedInUser() {
    Api.getUser()
      .then(setUser)
      .catch(() => navigate("/"));
  }, []);

  return (
    <SnackbarContext.Provider value={{ snack, setSnack }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ResponsiveAppBar />
        <SnackBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn onLogin={onLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/addTask" element={<AddTask />} />
          <Route path="/tasks/updateTask/:name" element={<UpdateTask />} />
          <Route path="*" element={<section>Invalid route</section>} />
        </Routes>
      </UserContext.Provider>
    </SnackbarContext.Provider>
  );
}

export default App;
