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
    <section className='task-details-container'>
      <Link to='/task'>Back to list</Link>
      <h1>What To Do</h1>
      {task && (
        <div
          className={
            task.status === 'Completed'
              ? 'task-details completed'
              : task.priority === 'High' || task.priority === 'Critical'
              ? 'task-details priority'
              : 'task-details'
          }
        >
          <h3>{task.title}</h3>
          <h4>{task.description}</h4>
        </div>
      )}
      {/* <button
        onClick={() => {
          onAddTaskMsg(task._id)
        }}
      >
        Add task msg
      </button> */}
    </section>
  )
}
