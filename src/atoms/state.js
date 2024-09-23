import { atom, selector, useSetRecoilState } from 'recoil'

import { taskService } from '../services/task/task.service.js'

// export const tasksState = atom({
//   key: 'tasksState', // unique ID (with respect to other atoms/selectors)
//   default: taskService.query(), // default value (initial state)
// })

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

// export const taskState = atom({
//   key: 'taskState', // unique ID (with respect to other atoms/selectors)
//   default: taskService.getEmptyTask(), // default value (initial state)
// })
