
import { useEffect, useState, Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Switcher from '../components/layout-components/switcher/switcher'
import { Provider } from 'react-redux'
import store from '../components/common/redux/store'

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Switcher />
        <Outlet />
      </Provider>
    </Fragment>
  )
}

export default App