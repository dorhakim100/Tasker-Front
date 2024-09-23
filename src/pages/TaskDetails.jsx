import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadTask, addTaskMsg } from '../store/actions/task.actions'

import { TaskEdit } from '../cmps/TaskEdit.jsx'

export function TaskDetails() {
  const { taskId } = useParams()
  const task = useSelector((storeState) => storeState.taskModule.task)

  useEffect(() => {
    loadTask(taskId)
  }, [taskId])

  async function onAddTaskMsg(taskId) {
    try {
      await addTaskMsg(taskId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Task msg added`)
    } catch (err) {
      showErrorMsg('Cannot add task msg')
    }
  }

  return (
    <section className='task-details-page'>
      <Link to='/task'>Back to list</Link>
      <h1>What To Do</h1>
      {task && (
        <div
          className={
            task.status === 'Completed'
              ? 'task-details completed'
              : task.priority === 'Critical' || 'High'
              ? 'task-details priority'
              : 'task-details'
          }
        >
          <h2>{task.title}</h2>
          <h4>{task.description}</h4>
          <h4>{task.dueDate}</h4>
        </div>
      )}
      {/* <button
        onClick={() => {
          onAddTaskMsg(task._id)
        }}
      >
        Add task msg
      </button> */}
      <TaskEdit task={task} />
    </section>
  )
}
