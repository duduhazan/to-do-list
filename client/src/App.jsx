import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import TasksPage from "./components/TasksPage";
import UpdateTask from "./components/UpdateTask";
import ResponsiveAppBar from "./components/NavBar";


function App() {
  return (
    <BrowserRouter>
        <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/addTask" element={<AddTask />} />
        <Route path="/tasks/updateTask/:name" element={<UpdateTask />} />
        <Route path="*" element={<section>Invalid route</section>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
