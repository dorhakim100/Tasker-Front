import { useState, useEffect } from 'react'
import { taskService } from '../services/task/task.service'
import { Button } from '@mui/material'

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
    console.log(field)

    switch (type) {
      case 'text':
      case 'radio':
        value = field === 'sortDir' ? +ev.target.value : ev.target.value
        if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
        break
      case 'select-one':
        value = ev.target.value

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
        value={filterBy.priority}
        onChange={handleChange}
      >
        <option value='All'>All</option>
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
        <option value='Critical'>Critical</option>
      </select>
      <Button variant='contained' onClick={clearFilter}>
        Clear
      </Button>
    </section>
  )
}
