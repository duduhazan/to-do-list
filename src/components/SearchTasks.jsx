import { useState } from "react";

export default function SearchTasks(props) {
    let [text, setText] = useState('');
    return (
        <input
            type="text"
            placeholder="enter task name to search"
            size={23}
            value={text}
            onChange={(e) => {
                console.log(e.target.value);
                setText(e.target.value);
                props.onChange(e.target.value);
            }}
        />
    )
}