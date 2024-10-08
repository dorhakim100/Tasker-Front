import { taskService } from '../../services/task/task.service.js'
import { store } from '../store'
import {
  ADD_TASK,
  REMOVE_TASK,
  SET_TASKS,
  SET_TASK,
  UPDATE_TASK,
  ADD_TASK_MSG,
} from '../reducers/task.reducer.js'

export async function setTasks(tasks) {
  try {
    store.dispatch(getCmdSetTasks(tasks))
  } catch (err) {
    console.log(err)
  }
}

export async function loadTasks(filterBy) {
  try {
    const tasks = await taskService.query(filterBy)
    store.dispatch(getCmdSetTasks(tasks))
  } catch (err) {
    console.log('Cannot load tasks', err)
    throw err
  }
}

export async function loadTask(taskId) {
  try {
    const task = await taskService.getById(taskId)
    store.dispatch(getCmdSetTask(task))
  } catch (err) {
    console.log('Cannot load task', err)
    throw err
  }
}

export async function removeTask(taskId) {
  try {
    await taskService.remove(taskId)
    store.dispatch(getCmdRemoveTask(taskId))
  } catch (err) {
    console.log('Cannot remove task', err)
    throw err
  }
}

export async function saveTask(task) {
  try {
    const type = task.id ? UPDATE_TASK : ADD_TASK
    const savedTask = await taskService.save(task)
    store.dispatch({ type, task: savedTask })
    return savedTask
  } catch (err) {
    console.log('Cannot add task', err)
    throw err
  }
}

export async function updateTask(task) {
  try {
    const savedTask = await taskService.save(task)
    store.dispatch(getCmdUpdateTask(savedTask))
    return savedTask
  } catch (err) {
    console.log('Cannot save task', err)
    throw err
  }
}

export async function addTaskMsg(taskId, txt) {
  try {
    const msg = await taskService.addTaskMsg(taskId, txt)
    store.dispatch(getCmdAddTaskMsg(msg))
    return msg
  } catch (err) {
    console.log('Cannot add task msg', err)
    throw err
  }
}

// Command Creators:
function getCmdSetTasks(tasks) {
  return {
    type: SET_TASKS,
    tasks,
  }
}
function getCmdSetTask(task) {
  return {
    type: SET_TASK,
    task,
  }
}
function getCmdRemoveTask(taskId) {
  return {
    type: REMOVE_TASK,
    taskId,
  }
}
function getCmdAddTask(task) {
  return {
    type: ADD_TASK,
    task,
  }
}
function getCmdUpdateTask(task) {
  return {
    type: UPDATE_TASK,
    task,
  }
}
function getCmdAddTaskMsg(msg) {
  return {
    type: ADD_TASK_MSG,
    msg,
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadTasks()
  await saveTask(taskService.getEmptyTask())
  await updateTask({
    id: 'm1oC7',
    title: 'Task-Good',
  })
  await removeTask('m1oC7')
}
