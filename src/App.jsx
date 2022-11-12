import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask";
import Home from "./components/Home";
import TasksPage from "./components/TasksPage";
import UpdateTask from "./components/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/addTask" element={<AddTask />} />
        <Route path="/tasks/updateTask/:id" element={<UpdateTask />} />
        <Route path="*" element={<section>Invalid route</section>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
