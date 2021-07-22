import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskCount, setTaskCount] = useState(0);

  function handleCreateNewTask() {
    let id =
      Math.floor(Math.random() * 100) *
      (tasks.length > 0 ? tasks.length : Math.floor(Math.random() * 100));

    let newTask;
    if (newTaskTitle.length > 0) {
      newTask = {
        id: id,
        title: newTaskTitle,
        isComplete: false,
      };
      let newTasks = [...tasks, newTask];
      setTasks(newTasks);
      setNewTaskTitle("");
      setTaskCount(taskCount + 1);
    } else {
      alert("Dgite um nome para a tarefa!");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let newTasks = [...tasks];
    newTasks.map((t) => (t.id != id ? t : (t.isComplete = !t.isComplete)));
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    let newTasks = [...tasks];
    newTasks = newTasks.filter((t) => t.id != id);
    setTasks(newTasks);

    setTaskCount(taskCount - 1);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks: {taskCount}</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
