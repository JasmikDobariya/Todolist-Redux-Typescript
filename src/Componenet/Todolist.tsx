import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Store/Storeroom';
import { addTask, toggleTask, deleteTask, setTasks } from '../Store/todoSlice';

const LOCAL_STORAGE_KEY = 'todoTasks';

const Todolist: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      dispatch(setTasks(JSON.parse(storedTasks)));
    }
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskText.trim() === '') return;
    const newTask = { id: Date.now(), text: taskText, completed: false };
    dispatch(addTask(newTask));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...tasks, newTask]));
    setTaskText('');
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTask({ id }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    }
    return true;
  });

  return (
    <main>
      <h1>ToDo List Redux + Typescript</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul className="main-task">
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Todolist;
