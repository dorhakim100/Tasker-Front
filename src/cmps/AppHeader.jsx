import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useRecoilState } from 'recoil'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
// import { logout } from '../store/actions/user.actions'
import { logout } from '../state/menu.js'

import { loggedinUser } from '../state/atom.js'

import { Button } from '@mui/material'

export function AppHeader() {
  // const user = useSelector((storeState) => storeState.userModule.user)
  const [user, setUser] = useRecoilState(loggedinUser)

  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      setUser(null)
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className='app-header full'>
      <nav>
        <NavLink to='/' className='logo'>
          Tasker
        </NavLink>
        <NavLink to='task'>Tasks</NavLink>

        {user?.isAdmin && <NavLink to='/admin'>Admin</NavLink>}

        {!user && (
          <NavLink to='login-signup/login' className='login-link'>
            Login
          </NavLink>
        )}
        {user && (
          <div className='user-info'>
            <Link to={`user/${user._id}`}>
              {/* {user.imgUrl && <img src={user.imgUrl} />} */}
              {user.fullname}
            </Link>
            {/* <span className="score">{user.score?.toLocaleString()}</span> */}
            <Button variant='contained' onClick={onLogout}>
              logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
