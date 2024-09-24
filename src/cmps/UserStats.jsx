import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'

import { loggedinUser } from '../state/atom.js'

export function UserStats() {
  const user = useRecoilValue(loggedinUser)

  return (
    <div className='user-stats-container'>
      <span>
        {(user && user.fullname) || (
          <Link to={'/login-signup/login'}>Login</Link>
        )}
      </span>
    </div>
  )
}
