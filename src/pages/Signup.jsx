import { useState } from 'react'
import { useNavigate } from 'react-router'

import { signup } from '../state/menu.js'
import { loggedinUser } from '../state/atom.js'
import { useRecoilState } from 'recoil'

import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user/user.service.js'
import { Button } from '@mui/material'

export function Signup() {
  const [user, setUser] = useRecoilState(loggedinUser)
  const [credentials, setCredentials] = useState(userService.getEmptyUser())
  const navigate = useNavigate()

  function clearState() {
    setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
  }

  function handleChange(ev) {
    const type = ev.target.type

    const field = ev.target.name
    const value = ev.target.value
    setCredentials({ ...credentials, [field]: value })
  }

  async function onSignup(ev = null) {
    if (ev) ev.preventDefault()

    if (!credentials.username || !credentials.password || !credentials.fullname)
      return
    try {
      const signedUp = await signup(credentials)
      setUser(signedUp)
      clearState()
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  function onUploaded(imgUrl) {
    setCredentials({ ...credentials, imgUrl })
  }

  return (
    <form className='signup-form'>
      <input
        type='text'
        name='fullname'
        value={credentials.fullname}
        placeholder='Fullname'
        onChange={handleChange}
        required
      />
      <input
        type='text'
        name='username'
        value={credentials.username}
        placeholder='Username'
        onChange={handleChange}
        required
      />
      <input
        type='password'
        name='password'
        value={credentials.password}
        placeholder='Password'
        onChange={handleChange}
        required
      />
      <ImgUploader onUploaded={onUploaded} />
      <Button variant='contained' onClick={onSignup}>
        Signup
      </Button>
    </form>
  )
}
