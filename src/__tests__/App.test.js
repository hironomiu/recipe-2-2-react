import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tasksReducer from '../features/tasks/tasksSlice'
import App from '../components/App'
import userEvent from '@testing-library/user-event'

let store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
})

describe('App', () => {
  it('renders learn react link', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(getByText('Super Web Site')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('to-signup-span'))
    expect(await screen.findByText('SignUp')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('to-login-span'))
    expect(await screen.getByText('Login')).toBeInTheDocument()
  })
})
