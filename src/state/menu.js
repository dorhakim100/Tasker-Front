import { taskService } from '../services/task/task.service.js'

export async function loadTasks(filterBy) {
  try {
    const tasks = await taskService.query(filterBy)
    return tasks
  } catch (err) {
    console.log('Cannot load tasks', err)
    throw err
  }
}

export async function loadTask(taskId) {
  try {
    const task = await taskService.getById(taskId)
    return task
  } catch (err) {
    console.log('Cannot load task', err)
    throw err
  }
}

export async function removeTask(taskId) {
  try {
    await taskService.remove(taskId)
  } catch (err) {
    console.log('Cannot remove task', err)
    throw err
  }
}

export async function saveTask(task) {
  try {
    const savedTask = await taskService.save(task)
    return savedTask
  } catch (err) {
    console.log('Cannot add task', err)
    throw err
  }
}
