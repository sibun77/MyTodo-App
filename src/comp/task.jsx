import React from 'react'
import TaskCss from './task.module.css'

const Task = (props) => {
    const {ctask,rtask,ttask}=props;
  return (
    <div>
        <section className={TaskCss.task_container}>
            <div className={TaskCss.task_heading}>
                Task Completed
                <small>Remaining :{rtask}</small>
            </div>
            <div className={TaskCss.task_complete}>
                {ctask}/{ttask}
            </div>
        </section>
    </div>
  )
}

export default Task
