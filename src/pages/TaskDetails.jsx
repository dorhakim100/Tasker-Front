import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { loadTask } from '../state/menu.js'

import { currTask } from '../state/atom.js'

import { TaskEdit } from '../cmps/TaskEdit.jsx'
import { useRecoilState } from 'recoil'

export function TaskDetails() {
  const { taskId } = useParams()
  const [task, setTask] = useRecoilState(currTask)

  useEffect(() => {
    const setCurrTask = async () => {
      const curr = await loadTask(taskId)
      setTask(curr)
    }
    setCurrTask()
  }, [taskId])

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
    </section>
  )
}
