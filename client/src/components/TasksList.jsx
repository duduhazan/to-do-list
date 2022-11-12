import moment from "moment/moment";
import { Link } from "react-router-dom";

export default function TasksList({ tempTasks, onDelete }) {
    if (!tempTasks) return <small>.</small>
    if (!tempTasks.length) return <div className="tasksList"><h1>No tasks</h1></div>
    let taskslist = tempTasks.map((task) => {
        moment
        return (
            <tr key={task.id} >
                <td><Link to={"/tasks/updateTask/" + task.id}>{task.name}</Link></td>
                <td>{moment(task.date).format('Do MMM YYYY')}</td>
                <td>{moment(task.destinationDate).format('Do MMM YYYY')}</td>
                <td><input type="checkbox" /></td>
                <td>
                    <button onClick={() => onDelete(task.id)}>X</button>
                </td>
            </tr>
        );
    })
    return (
        <>
            <h1 id="tasksH1"> Tasks List </h1>
            <table className="tasksList">
                <thead>
                    <tr>
                        <th>task name</th>
                        <th>created/last-updated date</th>
                        <th>destination date:</th>
                        <th>completed</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {taskslist}
                </tbody>
            </table>
        </>
    )

}