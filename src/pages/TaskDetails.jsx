import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { makeId } from '../services/util.service'

import { loadTask } from '../state/menu.js'

import { currTask } from '../state/atom.js'

import { TaskEdit } from '../cmps/TaskEdit.jsx'
import { useRecoilState } from 'recoil'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ComputerIcon from '@mui/icons-material/Computer'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import DescriptionIcon from '@mui/icons-material/Description'
import { Button } from '@mui/material'

export function TaskDetails() {
  const { taskId } = useParams()
  const [task, setTask] = useRecoilState(currTask)
  const navigate = useNavigate()

  useEffect(() => {
    const setCurrTask = async () => {
      const curr = await loadTask(taskId)
      setTask(curr)
    }
    setCurrTask()
  }, [taskId])

  return (
    <section className='task-details-container'>
      <div className='button-container'>
        <Button variant='contained' onClick={() => navigate('/task')}>
          <ArrowBackIcon />
        </Button>
      </div>
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
          <div className='section-container title'>
            <ComputerIcon />
            <h3>{task.title}</h3>
          </div>
          <div className='section-container date'>
            <QueryBuilderIcon />
            <h4>{task.dueDate}</h4>
          </div>
          <div className='section-container description'>
            <DescriptionIcon />
            <p>{task.description}</p>
          </div>
          <PriorityRange task={task} />

          {task.tags.map((tag) => {
            return <span key={`${tag}${makeId()}`}>{tag}</span>
          })}
        </div>
      )}
    </section>
  )
}

function PriorityRange({ task }) {
  return (
    <div className='priority-slider'>
      <input
        className='priority-range'
        type='range'
        value={
          task.priority === 'Critical'
            ? 88
            : task.priority === 'High'
            ? 62.5
            : task.priority === 'Medium'
            ? 36.5
            : 12
        }
        min='0'
        max='100'
        step='1'
        readOnly
      />
      <div className='priority-labels'>
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Critical</span>
      </div>
    </div>
  )
}
