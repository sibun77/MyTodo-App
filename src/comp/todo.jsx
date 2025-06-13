import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import TodoCss from '../comp/todo.module.css';
import toast from 'react-hot-toast';
import Task from './task';

const Todo = () => {
  const [task, setTask] = useState("");
  const [complete, setComplete] = useState("");
  const [remaining, setRemaining] = useState("");
  const [total, setTotal] = useState("");
  const todoData = JSON.parse(localStorage.getItem("todo_items")) || [
    { todoTask: "Download MyTodo", complete: false },
  ]

  const darkMode = useRef();
  const darkModeIcon = useRef();

  const [alltodo, setAllTodo] = useState(todoData);

  function handleForm(e) {
    e.preventDefault();
    // console.log({Task:task})
    if (!task) {
      toast.error("Please Add Task😉")
    }
    else {
      let isVerified = alltodo.some((value, index) => {
        return value.todoTask.toLowerCase() === task.toLocaleLowerCase();
      })
      if (isVerified) {
        toast.error("Task Already Exist ❌")
      } else {
        setAllTodo([...alltodo, { todoTask: task, complete: false }])
        setTask("");
        toast.success("Task Added")
      }

    }
  }
  function handleCheck(id) {
    const copyOfAllTodo = [...alltodo];
    copyOfAllTodo[id].complete = !copyOfAllTodo[id].complete;
    setAllTodo(copyOfAllTodo);
  }
  function handleClearAll() {
    setAllTodo([]);
    toast.error("Task Cleared")
  }
  function handleDelete(id) {
    const copyOfAllTodo = [...alltodo];
    const deletedValue = copyOfAllTodo.filter((value, index) => {
      return index !== id;
    }
    )
    setAllTodo(deletedValue);
    toast.error("Task Deleted")
  }
  function handleUpdate(id) {
    const copyOfAllTodo = [...alltodo];
    let oldTask = copyOfAllTodo[id].todoTask;
    let newTask = prompt(`Update Task: ${oldTask}`, oldTask)
    if (newTask) {
      const newObj = { todoTask: newTask, complete: false }
      copyOfAllTodo.splice(id, 1, newObj)
      setAllTodo(copyOfAllTodo);
      toast.success("Task Updated")
    }
    else{
      toast.error("Can't Update")
    }
  }
  useEffect(() => {
    const copyOfAllTodo = [...alltodo];
    const completeTasks = copyOfAllTodo.filter((value, index) => {
      return value.complete;
    })
    setComplete(completeTasks.length);
    const remainingTasks = copyOfAllTodo.filter((value, index) => {
      return !value.complete;
    })
    setRemaining(remainingTasks.length);
    const totalTasks = copyOfAllTodo.filter((value, index) => {
      return value;
    })
    setTotal(totalTasks.length);

    localStorage.setItem("todo_items", JSON.stringify(copyOfAllTodo));
  }, [alltodo]
  )

  function handleDarkmode() {
    const bgColor = darkMode.current.style.backgroundColor;
    if (bgColor == '' || bgColor == "white") {
      darkMode.current.style.backgroundColor = "black";
      darkMode.current.style.color = "white";
      darkModeIcon.current.className = "bi bi-toggle-on"
    }
    else {
      darkMode.current.style.backgroundColor = "";
      darkMode.current.style.color = "";
      darkModeIcon.current.className = "bi bi-toggle-off"
    }
  }

  return (
    <div ref={darkMode} className={TodoCss.cont}>

      <div className={TodoCss.main}>
        <div className={TodoCss.todo} >
          <h1 className='text-center d-flex justify-content-around align-items-center '>Todo Application
            <i className="bi bi-toggle-off" ref={darkModeIcon} onClick={handleDarkmode}></i>
          </h1>
          <Task ctask={complete} rtask={remaining} ttask={total} />
          <form action="" onSubmit={handleForm} className={TodoCss.form} >
            <input
              type="text"
              name="" id=""
              value={task}
              className={TodoCss.input_box}
              onChange={(e) => {
                setTask(e.target.value)
              }

              } />
            <input type="submit" value="Add Task" className={TodoCss.btn} />
          </form>
          <ul>
            {alltodo.length === 0 ? <h5 className="text-center">No Task Added 😉</h5> : alltodo.map((items, index) => (
              <ul key={index}>
                <input type="checkbox" name="" id="" className='me-1' checked={items.complete}
                  onClick={() => {
                    handleCheck(index);
                  }
                  } />
                <span
                  style={{ textDecoration: items.complete ? "line-through" : "none" }}
                >{items.todoTask}</span>
                <i className="bi bi-trash3-fill text-danger float-end"
                  onClick={() => {
                    handleDelete(index);
                  }
                  }></i>
                <i className="bi bi-pencil-square text-success float-end me-2"
                  onClick={() => {
                    handleUpdate(index);
                  }}
                ></i>
              </ul>
            )
            )}
          </ul>
          <button className={TodoCss.btn_clear} onClick={handleClearAll}>Clear Task</button>
        </div>
      </div>
    </div>
  )
}

export default Todo;
