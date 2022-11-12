import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div id="homediv">
            <h1>Welcome to Dudu's To Do List</h1>
            <h2>in here you can add new tasks,update old tasks,delete tasks,set your destination time for the task and more!</h2>
            <ul class="image-gallery">
                <li><img src="/to_do_image.jpg" alt="To Do image" /></li>
                <li><img src="/to_do_image_2.jpg" alt="To Do image" /></li>
                <li><img src="/to_do_image_3.jpg" alt="To Do image" /></li>
                <li><img src="/to_do_image_4.jpg" alt="To Do image" /></li>
                <li><img src="/to_do_image_5.jpg" alt="To Do image" /></li>
                <li><img src="/to_do_image_6.jpg" alt="To Do image" /></li>
            </ul>
            <br />
            <br />
            <Button variant="contained" onClick={() => navigate("/tasks")}>Get Started</Button>
        </div>
    )
}