import { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import { taskService } from '../services/task/task.service'

export function TaskFilter({ filterBy, setFilterBy }) {
  const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

  useEffect(() => {
    setFilterBy(filterToEdit)
  }, [filterToEdit])

  function handleChange(ev) {
    const type = ev.target.type
    const field = ev.target.name
    let value

    console.log(type)

    switch (type) {
      case 'text':
      case 'radio':
        value = field === 'sortDir' ? +ev.target.value : ev.target.value
        if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
        break
      case 'select-one':
        console.log(field)
        value = ev.target.value
        console.log(value)
        break
    }
    setFilterToEdit({ ...filterToEdit, [field]: value })
  }

  function clearFilter() {
    setFilterToEdit(taskService.getDefaultFilter())
  }

  function clearSort() {
    setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
  }

  return (
    <section className='task-filter'>
      <h3>Filter:</h3>
      <input
        type='text'
        name='txt'
        value={filterToEdit.txt}
        placeholder='Free text'
        onChange={handleChange}
        required
      />
      <select
        id='priority'
        name='priority'
        value={filterToEdit.priority}
        onChange={handleChange}
      >
        <option value='All'>All</option>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
        <option value='Critical'>Critical</option>
      </select>
      <Button className='btn-clear' variant='contained' onClick={clearFilter}>
        Clear
      </Button>
      <h3>Sort:</h3>
      <div className='sort-field'>
        <label>
          <span>Priority</span>
          <input
            type='radio'
            name='sortField'
            value='priority'
            checked={filterToEdit.sortField === 'priority'}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Title</span>
          <input
            type='radio'
            name='sortField'
            value='title'
            checked={filterToEdit.sortField === 'title'}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Owner</span>
          <input
            type='radio'
            name='sortField'
            value='owner'
            checked={filterToEdit.sortField === 'owner'}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className='sort-dir'>
        <label>
          <span>Asce</span>
          <input
            type='radio'
            name='sortDir'
            value='1'
            checked={filterToEdit.sortDir === 1}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Desc</span>
          <input
            type='radio'
            name='sortDir'
            value='-1'
            onChange={handleChange}
            checked={filterToEdit.sortDir === -1}
          />
        </label>
      </div>
      <Button className='btn-clear' variant='contained' onClick={clearSort}>
        Clear
      </Button>
    </section>
  )
}
