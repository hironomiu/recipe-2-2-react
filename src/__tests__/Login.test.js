import { render, screen } from '@testing-library/react'
import { Login } from '../components/Login'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tasksReducer from '../features/tasks/tasksSlice'
import { Provider } from 'react-redux'

let store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
})

describe('Login', () => {
  it('Login', () => {
    const setUser = jest.fn()
    render(
      <Provider store={store}>
        <Login user={'user'} setUser={setUser} />
      </Provider>
    )
  })
})
