import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../services/storage";

export default function AddTask() {
    //let [name, setName] = useState('');
    const nameRef = useRef();
    const destinationDateRef = useRef();
    const navigate = useNavigate();

    function onAdd() {
        let newTask = {
            name: nameRef.current.value,
            destinationDate: destinationDateRef.current.value
        }
        addTask(newTask).then((res) => {
            alert('added successfully');
            navigate("/tasks");
        }).catch((error) => alert(error.message));
    }
    return (
        <section className="AddTask" >
            <h2>Add Task</h2>
            <div className="inputLine">
                <span>Enter task name: </span>
                <input className="addInputs" type="text" placeholder="enter new task"
                    ref={nameRef} />
            </div>
            <div className="inputLine">
                <span>Enter destination date: </span>
                <input className="addInputs" type="date" min={new Date().toISOString().split('T')[0]} ref={destinationDateRef} />
            </div >
            <button onClick={onAdd}>Add task</button>
        </section>
    )
}