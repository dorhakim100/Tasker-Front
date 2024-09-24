import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user/user.service.js'
import { login } from '../state/menu.js'
import { loggedinUser } from '../state/atom.js'
import { useRecoilState } from 'recoil'

import { Button } from '@mui/material'

export function Login() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useRecoilState(loggedinUser)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    fullname: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const users = await userService.getUsers()
    setUsers(users)
  }

  async function onLogin(ev = null) {
    if (ev) ev.preventDefault()

    if (!credentials.username) return
    try {
      const loggedinUser = await login(credentials)
      setUser(loggedinUser)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  return (
    <form className='login-form' onSubmit={onLogin}>
      <select
        name='username'
        value={credentials.username}
        onChange={handleChange}
      >
        <option value=''>Select User</option>
        {users.map((user) => (
          <option key={user._id} value={user.username}>
            {user.fullname}
          </option>
        ))}
      </select>
      <Button variant='contained'>Login</Button>
    </form>
  )
}
