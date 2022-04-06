import { render, screen } from '@testing-library/react'
import Task from '../components/Task'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import authReducer from '../features/auth/authSlice'
import tasksReducer from '../features/tasks/tasksSlice'

let store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
})

describe('Task', () => {
  it('Task', () => {
    const dummyTask = { id: 1, title: 'dummy title 1', task: 'dummy task 1' }
    render(
      <Provider store={store}>
        <table>
          <tbody>
            <Task task={dummyTask} />
          </tbody>
        </table>
      </Provider>
    )
    expect(screen.getByText('dummy title 1')).toBeInTheDocument()
    expect(screen.getByText('dummy task 1')).toBeInTheDocument()
  })
})
