export const SET_TASKS = 'SET_TASKS'
export const SET_TASK = 'SET_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const ADD_TASK_MSG = 'ADD_TASK_MSG'

const initialState = {
  tasks: [],
  task: null,
}

export function taskReducer(state = initialState, action) {
  var newState = state
  var tasks
  switch (action.type) {
    case SET_TASKS:
      newState = { ...state, tasks: action.tasks }
      break
    case SET_TASK:
      newState = { ...state, task: action.task }
      break
    case REMOVE_TASK:
      const lastRemovedTask = state.tasks.find(
        (task) => task._id === action.taskId
      )
      tasks = state.tasks.filter((task) => task._id !== action.taskId)
      newState = { ...state, tasks, lastRemovedTask }
      break
    case ADD_TASK:
      newState = { ...state, tasks: [...state.tasks, action.task] }
      break
    case UPDATE_TASK:
      tasks = state.tasks.map((task) =>
        task._id === action.task._id ? action.task : task
      )
      newState = { ...state, tasks }
      break
    case ADD_TASK_MSG:
      newState = {
        ...state,
        task: { ...state.task, msgs: [...(state.task.msgs || []), action.msg] },
      }
      break
    default:
  }
  return newState
}
