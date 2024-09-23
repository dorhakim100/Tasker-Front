import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user/user.service.js'

const STORAGE_KEY = 'task'

if (!localStorage.getItem(STORAGE_KEY)) {
  _createLocalTasks()
}

export const taskService = {
  query,
  getById,
  save,
  remove,
}
window.cs = taskService

async function query(filterBy = { txt: '', price: 0 }) {
  var tasks = await storageService.query(STORAGE_KEY)
  const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    tasks = tasks.filter(
      (task) => regex.test(task.vendor) || regex.test(task.description)
    )
  }
  if (minSpeed) {
    tasks = tasks.filter((task) => task.speed >= minSpeed)
  }
  if (sortField === 'vendor' || sortField === 'owner') {
    tasks.sort(
      (task1, task2) =>
        task1[sortField].localeCompare(task2[sortField]) * +sortDir
    )
  }
  if (sortField === 'price' || sortField === 'speed') {
    tasks.sort(
      (task1, task2) => (task1[sortField] - task2[sortField]) * +sortDir
    )
  }

  tasks = tasks.map(({ _id, vendor, price, speed, owner }) => ({
    _id,
    vendor,
    price,
    speed,
    owner,
  }))
  return tasks
}

function getById(taskId) {
  return storageService.get(STORAGE_KEY, taskId)
}

async function remove(taskId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, taskId)
}

async function save(task) {
  var savedTask
  if (task._id) {
    const taskToSave = {
      _id: task._id,
      price: task.price,
      speed: task.speed,
    }
    savedTask = await storageService.put(STORAGE_KEY, taskToSave)
  } else {
    const taskToSave = {
      vendor: task.vendor,
      price: task.price,
      speed: task.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    }
    savedTask = await storageService.post(STORAGE_KEY, taskToSave)
  }
  return savedTask
}

async function addTaskMsg(taskId, txt) {
  // Later, this is all done by the backend
  const task = await getById(taskId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  task.msgs.push(msg)
  await storageService.put(STORAGE_KEY, task)

  return msg
}

function _createLocalTasks() {
  const tasks = [
    {
      id: '1',
      title: 'Job leader the.',
      description:
        'Thus offer what fund continue true. One plan around sure run trip senior.',
      dueDate: '2024-09-30',
      status: 'Completed',
      creationTime: '2024-08-02T05:15:29Z',
      taskOwner: 'John Miller Jr.',
      priority: 'Low',
      tags: ['Writing', 'Authentication', 'Maintenance'],
    },
    {
      id: '2',
      title: 'Likely usually thing near stand place reality.',
      description: 'I really finish end. Build would mean loss southern.',
      dueDate: '2024-09-11',
      status: 'To Do',
      creationTime: '2024-08-02T11:59:29Z',
      taskOwner: 'Theresa Young',
      priority: 'Low',
      tags: ['Writing', 'Documentation', 'Backend'],
    },
    {
      id: '3',
      title: 'Million clearly along threat.',
      description:
        'Politics agency woman build evidence cut action. Buy herself think bring specific chair. Let turn adult nor song adult.',
      dueDate: '2024-09-28',
      status: 'To Do',
      creationTime: '2024-07-04T10:50:29Z',
      taskOwner: 'Cassandra Wilson',
      priority: 'High',
      tags: ['Testing', 'Code Review', 'Writing'],
    },
    {
      id: '4',
      title: 'Republican grow though number.',
      description: 'Hold join visit behavior table. Stop it give say.',
      dueDate: '2024-09-09',
      status: 'To Do',
      creationTime: '2024-07-06T09:24:29Z',
      taskOwner: 'Amanda White PhD',
      priority: 'Critical',
      tags: ['Writing', 'Code Review'],
    },
    {
      id: '5',
      title: 'Life piece ability decide data sound.',
      description:
        'Nice follow question industry subject drug performance. That could night together. Most treat laugh.',
      dueDate: '2024-10-08',
      status: 'In Progress',
      creationTime: '2024-08-11T22:49:29Z',
      taskOwner: 'Kayla Fuller',
      priority: 'High',
      tags: ['Code Review', 'Testing', 'Authentication'],
    },
  ]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
