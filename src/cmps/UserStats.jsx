import { useState, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { loggedinUser } from '../state/atom.js'

export function UserStats() {
  const user = useRecoilValue(loggedinUser)
  console.log(user)
  return (
    <div className='user-stats-container'>
      <span>{user.fullname}</span>
    </div>
  )
}
