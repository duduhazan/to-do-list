import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAll, deleteTask, getTasks } from "../services/storage";
import SearchTasks from "./SearchTasks";
import TasksList from "./TasksList"

function TasksPage() {
    const [tempTasks, setTempTasks] = useState([]);
    const navigate = useNavigate();
    //
    useEffect(() => {
        rerender();
    }, [])
    //
    function onSearchChange(text) {
        getTasks()
            .then((taskJSON) => {
                let filteredtasks = taskJSON.filter(task => {
                    return task.name.indexOf(text) > -1;
                })
                setTempTasks([...filteredtasks]);
            })
            .catch(error => alert(error.message));
    }
    //
    function sortingTasks(evt) {
        getTasks().then((taskJSON) => {
            if (evt.target.value === "date: newest first") {
                let filteredTasks = taskJSON.sort((a, b) => {
                    return (a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0);
                });
                setTempTasks([...filteredTasks]);
            }
            if (evt.target.value === "name: a-z") {
                let filteredTasks = taskJSON.sort((a, b) => a.name.localeCompare(b.name));
                setTempTasks([...filteredTasks]);
            }
            if (evt.target.value === "name: z-a") {
                let filteredTasks = taskJSON.sort((a, b) => b.name.localeCompare(a.name));
                setTempTasks([...filteredTasks]);
            }
            if (evt.target.value === "date: oldest first") {
                let filteredTasks = taskJSON.sort((a, b) => {
                    return (b.date < a.date) ? -1 : ((b.date > a.date) ? 1 : 0);
                });
                setTempTasks([...filteredTasks]);
            }
        }).catch(error => alert(error.message));
    }
    function rerender() {
        getTasks()
            .then((taskJSON) => setTempTasks(taskJSON))
            .catch(error => alert(error.message));
    }
    //
    function onDeleteClick(id) {
        deleteTask(id)
            .then((res) => {
                rerender();
            })
            .catch(error => alert(error.message));
    }
    //
    return (
        <>
            <nav id="navbar">
                <div id="menul">
                    <span>Do</span>
                    <img src="/to_do_icon.png" alt="To Do image" />
                </div>
                <div id="menur">
                    <SearchTasks onChange={onSearchChange} />
                    <button onClick={() => navigate("/tasks/addTask")}>add new task</button>
                    <button onClick={() => {
                        deleteAll();
                        navigate("/tasks");
                        setTempTasks(rerender());
                    }}>delete all tasks</button>
                    <label>sort by:</label>
                    <select onChange={(event) => sortingTasks(event)}>
                        <option>date: oldest first</option>
                        <option>date: newest first</option>
                        <option>name: a-z</option>
                        <option>name: z-a</option>
                    </select>
                </div>
            </nav>
            <div id="taskslist">
                <TasksList tempTasks={tempTasks} onDelete={onDeleteClick} />
            </div>
        </>
    )
}

export default TasksPage