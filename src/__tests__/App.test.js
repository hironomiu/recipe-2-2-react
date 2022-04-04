import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import tasksReducer from '../features/tasks/tasksSlice'
import App from '../components/App'

let store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
})

describe('App', () => {
  it('renders learn react link', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    expect(getByText('Super Web Site')).toBeInTheDocument()
  })
})
