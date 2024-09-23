import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import {
  loadTasks,
  saveTask,
  updateTask,
  removeTask,
  addTaskMsg,
  setTasks,
} from '../store/actions/task.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { taskService } from '../services/task/task.service.js'
import { userService } from '../services/user/user.service.js'

import { TaskList } from '../cmps/TaskList.jsx'
import { TaskFilter } from '../cmps/TaskFilter.jsx'

import { Button, Autocomplete, TextField } from '@mui/material'
import { TaskEdit } from '../cmps/TaskEdit.jsx'

export function TaskIndex() {
  const [filterBy, setFilterBy] = useState(taskService.getDefaultFilter())
  const tasks = useSelector((storeState) => storeState.taskModule.tasks)

  // modal
  const modalRef = useRef()
  const [isDrag, setIsDrag] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 })
  const offsetRef = useRef({ x: 0, y: 0 })
  const requestRef = useRef(null)
  const [taskToEdit, setTaskToEdit] = useState(taskService.getEmptyTask())

  useEffect(() => {
    loadTasks(filterBy)
  }, [filterBy])

  useEffect(() => {}, [])

  async function onRemoveTask(taskId) {
    try {
      await removeTask(taskId)
      showSuccessMsg('Task removed')
      loadTasks(filterBy)
    } catch (err) {
      showErrorMsg('Cannot remove task')
    }
  }

  async function onUpdateTask(task) {
    setTaskToEdit(task)
    if (modalRef.current.style.display !== 'flex') {
      toggleModal()
    }
    try {
      const savedTask = await updateTask(taskToSave)
      showSuccessMsg(`Task updated, new speed: ${savedTask.speed}`)
    } catch (err) {
      showErrorMsg('Cannot update task')
    }
  }

  function toggleModal(ev) {
    if (modalRef.current.style.display !== 'flex') {
      modalRef.current.style.display = 'flex'
      const x = ev.clientX
      const y = ev.clientY
      setModalPosition({ x, y })
    } else {
      modalRef.current.style.display = 'none'
    }
  }

  function closeEditModal() {
    modalRef.current.style.display = 'none'
  }

  function onMouseDown(ev) {
    const rect = modalRef.current.getBoundingClientRect()
    // Calculate the offset from where the mouse is clicked within the modal
    offsetRef.current = {
      x: ev.clientX - rect.left,
      y: ev.clientY - rect.top,
    }

    setIsDrag(true)
  }

  function onDragModal(ev) {
    // const rect = ev.target.getBoundingClientRect()
    const x = ev.clientX - offsetRef.current.x
    const y = ev.clientY - offsetRef.current.y
    // const x = ev.clientX
    // const y = ev.clientY
    setModalPosition({ x, y })

    requestRef.current = requestAnimationFrame(() => {
      setModalPosition({ x, y })
    })
  }

  function onMouseUp() {
    setIsDrag(false)
    if (requestRef.current) cancelAnimationFrame(requestRef.current)
  }

  useEffect(() => {
    if (isDrag) {
      document.addEventListener('mousemove', onDragModal)
      document.addEventListener('mouseup', onMouseUp)
    } else {
      document.removeEventListener('mousemove', onDragModal)
      document.removeEventListener('mouseup', onMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', onDragModal)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [isDrag])

  return (
    <main className='task-index'>
      <header className='header-container'>
        <h2>Tasks</h2>

        {userService.getLoggedinUser() && (
          <Button
            variant='contained'
            onClick={(event) => {
              setTaskToEdit(null)
              toggleModal(event)
            }}
          >
            Add
          </Button>
        )}
      </header>
      <TaskFilter filterBy={filterBy} setFilterBy={setFilterBy} />

      <TaskList
        tasks={tasks}
        onRemoveTask={onRemoveTask}
        onUpdateTask={onUpdateTask}
        setTasks={setTasks}
      />

      <TaskEdit
        modalRef={modalRef}
        position={modalPosition}
        isDrag={isDrag}
        toggleModal={toggleModal}
        onMouseDown={onMouseDown}
        closeEditModal={closeEditModal}
        taskToEdit={taskToEdit}
      />
    </main>
  )
}
