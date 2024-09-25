import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Percentage } from './Chart.jsx'

import { loggedinUser, tasksState } from '../state/atom.js'

export function UserStats() {
  const user = useRecoilValue(loggedinUser)
  const tasks = useRecoilValue(tasksState)
  const [percentages, setPercentages] = useState(0)
  useEffect(() => {
    getPercentage()
  }, [user, tasks])

  async function getPercentage() {
    const completedTasks = tasks.filter((task) => task.status === 'Completed')
    const percentagesToSet = (completedTasks.length / tasks.length) * 100
    setPercentages(percentagesToSet)
  }
  return (
    <div className='user-stats-container'>
      <span>
        {(user && user.fullname) || (
          <Link to={'/login-signup/login'}>Login</Link>
        )}
      </span>

      <Percentage percentages={percentages} />
    </div>
  )
}
