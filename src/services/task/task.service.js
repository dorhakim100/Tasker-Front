import { httpService } from '../http.service'
import { userService } from '../user/user.service'
import { makeId } from '../util.service'

export const taskService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  getEmptyTask,
}

async function query(filterBy = getDefaultFilter()) {
  const loggedinUser = userService.getLoggedinUser()
  const filterToSend = { ...filterBy, loggedinUser: loggedinUser }

  try {
    const response = await httpService.get('task', filterToSend)
    return response
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    throw error
  }
}

function getById(taskId) {
  return httpService.get(`task/${taskId}`)
}

async function remove(taskId) {
  try {
    return httpService.delete(`task/${taskId}`)
  } catch (err) {
    console.log(err)
  }
}
async function save(task) {
  var savedTask
  try {
    if (task.id) {
      savedTask = await httpService.put(`task/${task.id}`, task)
    } else {
      savedTask = await httpService.post('task', task)
    }
    return savedTask
  } catch (err) {
    console.log(err)
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    dueDate: null,
    status: 'All',
    creationTime: null,
    priority: 'All',
    tags: [],
    sortDir: 1,
  }
}

function getEmptyTask() {
  return {
    id: makeId(),
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',

    tags: [],
  }
}
