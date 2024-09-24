import { atom } from 'recoil'

import { taskService } from '../services/task/task.service.js'
import { userService } from '../services/user/user.service.js'

export const tasksState = atom({
  key: 'tasksState',
  default: taskService.query(),
})

export const filterState = atom({
  key: 'filterState',
  default: taskService.getDefaultFilter(),
})

export const loggedinUser = atom({
  key: 'loggedinUserState',
  default: userService.getLoggedinUser(),
})

export const currTask = atom({
  key: 'currTaskState',
  default: taskService.getEmptyTask(),
})

/*
export const filterState = atom({
    key: 'filterState',
    default: taskService.getDefaultFilter(),
  })
  
  export const filteredTasksState = selector({
    key: 'filteredTasksState',
    get: async ({ get }) => {
      const filter = get(filterState)
      console.log(filter)
      try {
        const tasks = await taskService.query(filter)
        console.log(tasks)
        return tasks
      } catch (err) {
        console.log('Cannot load tasks', err)
        throw err
      }
    },
  })

  */
