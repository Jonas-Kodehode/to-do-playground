import { useState, useEffect } from "react";

const App = () => {
    const [userInput, setUserInput] = useState("");
    const [todos, setTodos] = useState<string[]>(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTodos((prevTodos) => [userInput, ...prevTodos]);
        setUserInput("");
    };

    const handleDelete = (index: number) => {
        setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    placeholder="Enter new to-do item"
                />
                <button type="submit">Add to-do</button>
            </form>

            {todos.map((todo, index) => (
                <div key={index}>
                    <p>
                        {todo}
                        <button onClick={() => handleDelete(index)}>x</button>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default App;
