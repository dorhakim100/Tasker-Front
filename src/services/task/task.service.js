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
  getDefaultFilter,
  getEmptyTask,
}
window.cs = taskService

async function query(filterBy = { txt: '' }) {
  var tasks = await storageService.query(STORAGE_KEY)
  const { txt, dueDate, status, creationTime, priority, tags, sortDir } =
    filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    tasks = tasks.filter(
      (task) => regex.test(task.title) || regex.test(task.description)
    )
  }
  if (dueDate) {
    tasks = tasks.filter((task) => task.dueDate <= dueDate)
  }

  if (status && status !== 'All') {
    tasks.filter((task) => task.status === status)
  }

  if (priority && priority !== 'All') {
    tasks = tasks.filter((task) => task.priority === priority)
  }

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
  if (task.id) {
    const taskToSave = {
      id: task.id,
      title: task.title,
      dueDate: task.dueDate,
      description: task.description,
      status: task.status,
      priority: task.priority,
      tags: task.tags,
      description: task.description,
    }
    savedTask = await storageService.put(STORAGE_KEY, taskToSave)
  } else {
    const taskToSave = {
      title: task.title,
      dueDate: task.dueDate,
      description: task.description,
      status: task.status,
      priority: task.priority,
      tags: task.tags,
      creationTime: new Date().toISOString(),
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
