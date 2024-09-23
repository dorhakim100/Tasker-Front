import { useState, useRef, useEffect } from 'react'
import { taskService } from '../services/task/task.service.js'
import { saveTask, loadTasks } from '../store/actions/task.actions.js'

import { Button } from '@mui/material'
import { IoMdCloseCircle } from 'react-icons/io'

export function TaskEdit({
  modalRef,
  position,
  isDrag,
  onMouseDown,
  toggleModal,
  closeEditModal,
  taskToEdit,
}) {
  const [editTask, setEditTask] = useState({
    ...taskService.getEmptyTask(),
    id: 'create',
  })

  useEffect(() => {
    // setEditTask({ ...task })
    if (taskToEdit) {
      setEditTask({ ...taskToEdit })
    } else {
      setEditTask({
        ...taskService.getEmptyTask(),
        id: 'create',
      })
    }
  }, [taskToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (field) {
      case 'title':
        setEditTask({ ...editTask, title: value })

        break
      case 'description':
        setEditTask({ ...editTask, description: value })

        break
      case 'dueDate':
        setEditTask({ ...editTask, dueDate: value })

        break

      case 'priority':
        setEditTask({ ...editTask, priority: value })

        break
      case 'status':
        let checked = target.checked
        if (checked) {
          value = 'Completed'
        } else {
          value = 'To Do'
        }
        setEditTask({ ...editTask, status: value })

        break

      default:
        break
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()

    if (editTask.id === 'create') delete editTask.id

    try {
      await saveTask(editTask)
      closeEditModal()
      loadTasks()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className='task-edit-modal'
      ref={modalRef}
      onMouseDown={(event) => {
        onMouseDown(event)
      }}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDrag ? 'grabbing' : 'grab',
        transition: isDrag ? 'none' : 'all 0.2s ease',
        zIndex: isDrag ? '100' : '50',
      }}
    >
      <div className='close-button-container' onClick={() => closeEditModal()}>
        <IoMdCloseCircle />
      </div>

      <form onSubmit={handleSubmit}>
        <div className='title-container'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            name='title'
            type='text'
            value={editTask.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className='description-container'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={editTask.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className='date-container'>
          <label htmlFor='dueDate'>Due Date</label>
          <input
            id='dueDate'
            name='dueDate'
            type='date'
            value={editTask.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='priority-container'>
          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            name='priority'
            value={editTask.priority}
            onChange={handleChange}
            required
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
            <option value='Critical'>Critical</option>
          </select>
        </div>
        <div className='status-container'>
          <label htmlFor='status'>Completed</label>
          <input
            type='checkbox'
            name='status'
            id='status'
            onChange={handleChange}
            checked={editTask.status === 'Completed' ? true : false}
          />
        </div>
        <Button variant='contained' type='submit'>
          {(!taskToEdit && 'Add Task') || 'Save Task'}
        </Button>
      </form>
    </div>
  )
}
