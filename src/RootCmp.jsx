import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { TaskIndex } from './pages/TaskIndex.jsx'

import { TaskDetails } from './pages/TaskDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { UserStats } from './cmps/UserStats'

export function RootCmp() {
  return (
    <div className='main-container'>
      <AppHeader />
      <UserMsg />
      <UserStats />
      <main>
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='task' element={<TaskIndex />} />
          <Route path='task/:taskId' element={<TaskDetails />} />
          <Route path='user/:id' element={<UserDetails />} />
          <Route path='login-signup' element={<LoginSignup />}>
            <Route path='login' index element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
