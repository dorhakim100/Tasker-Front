import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import { store } from './store/store'
import { RootCmp } from './RootCmp'

import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RecoilRoot>
    <Router>
      <RootCmp />
    </Router>
  </RecoilRoot>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
