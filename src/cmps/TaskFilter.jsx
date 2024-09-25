import { useState, useEffect } from 'react'
import { taskService } from '../services/task/task.service'
import { Button, TextField, Checkbox } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export function TaskFilter({ filterBy, setFilterBy }) {
  const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

  useEffect(() => {
    setFilterBy(filterToEdit)
  }, [filterToEdit])

  function handleChange(ev) {
    let type = ev.target.type
    const field = ev.target.name
    let value

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

  function handleDateChange(newDate) {
    const dueDateToSet = newDate.format('YYYY-MM-DD')

    setFilterToEdit({ ...filterToEdit, dueDate: dueDateToSet })
  }

  function clearFilter() {
    setFilterToEdit(taskService.getDefaultFilter())
  }

  function clearSort() {
    setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
  }

  function handleCheckbox(ev) {
    const { status } = filterToEdit

    if (status === 'All') {
      setFilterToEdit({ ...filterToEdit, status: 'Pending' })
    } else {
      setFilterToEdit({ ...filterToEdit, status: 'All' })
    }
  }

  function handlePriorityChange(ev) {
    const valueToSet = ev.target.value
    setFilterToEdit({ ...filterToEdit, priority: valueToSet })
  }

  return (
    <section className='task-filter'>
      {/* <h3>Filter:</h3> */}
      <ThemeProvider theme={darkTheme}>
        <TextField
          id='outlined-basic'
          name='txt'
          value={filterToEdit.txt}
          onChange={handleChange}
          label='Filter'
          variant='outlined'
        />
      </ThemeProvider>

      <div className='priority-container'>
        <ThemeProvider theme={darkTheme}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
            <Select
              labelId='priority'
              id='priority'
              name='priority'
              value={filterToEdit.priority}
              label='priority'
              type='select-one'
              onChange={handlePriorityChange}
              className='select'
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value='Low'>Low</MenuItem>
              <MenuItem value='Medium'>Medium</MenuItem>
              <MenuItem value='High'>High</MenuItem>
              <MenuItem value='Critical'>Critical</MenuItem>
            </Select>
          </FormControl>
        </ThemeProvider>
        {/* <label htmlFor=''>Priority</label>
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
        </select> */}
      </div>
      <div className='due-date-container'>
        {/* <label htmlFor='due'>Due Date</label> */}
        {/* <input type='date' name='' id='due' /> */}
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label='Due Date'
                // value={filterBy.dueDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </ThemeProvider>
      </div>
      <div className='completed-container'>
        {/* <input type='checkbox' name='' id='done' /> */}
        {/* <label htmlFor='done'>Completed</label> */}
        <ThemeProvider theme={darkTheme}>
          <label htmlFor='done'>Completed</label>
          <Checkbox
            checked={filterToEdit.status === 'All' ? true : false}
            onClick={handleCheckbox}
            id='done'
          />
        </ThemeProvider>
      </div>

      <Button variant='contained' onClick={clearFilter}>
        Clear
      </Button>
    </section>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Light color for the label
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#ffffff', // Light color for the arrow icon
        },
        select: {
          backgroundColor: '#333333', // Dark background for the select box
          color: '#ffffff', // Light color for the selected text
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#ffffff', // Light color for the border
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333',
          '&:hover': {
            backgroundColor: '#444444', // Slightly lighter on hover
          },
          color: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#333333', // Dark background for the text field
            color: '#ffffff', // Light text color
            '& fieldset': {
              borderColor: '#ffffff', // Light border color
            },
            '&:hover fieldset': {
              borderColor: '#ffffff', // Hover effect
            },
            '&.Mui-focused': {
              backgroundColor: '#333333', // Maintain dark background when focused
              color: '#ffffff', // Light text color
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff', // Focus effect for the border
            },
          },
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#333333', // Dark background for the DatePicker input
            color: '#ffffff', // Light text color
            '& fieldset': {
              borderColor: '#ffffff', // Light border color
            },
            '&:hover fieldset': {
              borderColor: '#ffffff', // Hover effect
            },
            '&.Mui-focused': {
              backgroundColor: '#333333', // Maintain dark background when focused
              color: '#ffffff', // Light text color
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff', // Focus effect for the border
            },
          },
        },
        popper: {
          backgroundColor: '#333333', // Dark background for the DatePicker popup
          color: '#ffffff', // Light text color for DatePicker popup
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Light color for the checkbox
          '&.Mui-checked': {
            color: '#00e676', // Color when checked (example: green)
          },
          '&.Mui-checked:hover': {
            backgroundColor: 'rgba(0, 230, 118, 0.1)', // Light hover effect when checked
          },
        },
      },
    },
  },
})
