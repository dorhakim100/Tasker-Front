import { useState, useRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { loggedinUser } from '../state/atom.js'
import { taskService } from '../services/task/task.service.js'
import { userService } from '../services/user/user.service.js'
import { saveTask } from '../state/menu.js'

import { Button } from '@mui/material'
import { IoMdCloseCircle } from 'react-icons/io'
import { makeId } from '../services/util.service.js'

export function TaskEdit({
  modalRef,
  position,
  isDrag,
  onMouseDown,
  toggleModal,
  closeEditModal,
  taskToEdit,
  loadTasks,
}) {
  const [user, setUser] = useRecoilState(loggedinUser)
  const [editTask, setEditTask] = useState({
    ...taskService.getEmptyTask(),
    id: 'create',
  })

  const taskTags = [
    'AI Model Training',
    'Agile Retrospective',
    'API Development',
    'API Testing',
    'Backend Development',
    'Bug Fixing',
    'Cloud Migration',
    'Code Review',
    'Continuous Integration',
    'Cross-team Collaboration',
    'Customer Feedback',
    'Data Analysis',
    'Database Optimization',
    'DevOps Deployment',
    'Documentation',
    'Feature Implementation',
    'Frontend Integration',
    'Infrastructure Setup',
    'Machine Learning Integration',
    'Monitoring & Alerts',
    'Performance Tuning',
    'Prototyping',
    'Scalability Assessment',
    'Security Audit',
    'Sprint Planning',
    'System Architecture',
    'Tech Support',
    'Testing Automation',
    'UI/UX Design',
    'Version Control',
  ]

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
    const tag = target.id
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
      case 'tags':
        const tags = [...editTask.tags]

        if (tags.includes(tag)) {
          const idx = tags.findIndex((tagToRemove) => tagToRemove === tag)

          tags.splice(idx, 1)
          setEditTask({ ...editTask, tags })
          return
        }
        tags.push(tag)
        setEditTask({ ...editTask, tags })
        break

      default:
        break
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()

    if (editTask.id === 'create') delete editTask.id

    try {
      const saved = await saveTask(editTask)
      closeEditModal()

      setUser(userService.getLoggedinUser())
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

      <form onSubmit={handleSubmit} className='modal-form-container'>
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
        <div className='tags-container'>
          {taskTags.map((tag) => {
            return (
              <div className='tag-container' key={`${tag}${makeId}`}>
                <input
                  type='checkbox'
                  name='tags'
                  id={tag}
                  checked={editTask.tags.includes(tag)}
                  onChange={handleChange}
                />
                <label htmlFor={tag}>{tag}</label>
              </div>
            )
          })}
        </div>
        <Button variant='contained' type='submit'>
          {(!taskToEdit && 'Add Task') || 'Save Task'}
        </Button>
      </form>
    </div>
  )
}
