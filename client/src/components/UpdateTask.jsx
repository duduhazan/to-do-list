import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getTaskByID, updateTask } from "../services/storage";

export default function UpdateTask() {
    const navigate = useNavigate();
    let params = useParams();
    let [task, setTask] = useState([]);
    const nameRef = useRef();

    useEffect(() => {
        getTaskByID(params.id)
            .then((taskJSON) => setTask(taskJSON))
            .catch((error) => alert(error.message));
    }, []);

    function onUpdate() {
        let task2update = { id: parseInt(params.id), name: nameRef.current.value }
        updateTask(task2update).then((res) => {
            alert("updated succesfully");
            navigate('/tasks');
        }).catch((error) => alert(error.message));
    }
    return (
        <section className="UpdateTask">
            <h2>Update Task</h2>
            <input type="text" placeholder="enter old task"
                defaultValue={task.name} disabled={true}
            />
            <input
                type="text"
                placeholder="enter new task"
                ref={nameRef}
            />
            <button onClick={onUpdate}>Update task</button>
        </section>
    )
}