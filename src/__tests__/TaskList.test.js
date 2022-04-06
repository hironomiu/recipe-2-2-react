import { render, screen } from '@testing-library/react'
import TaskList from '../components/TaskList'
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

describe('TaskList', () => {
  it('tasksが空のケース', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    )
    expect(screen.getByTestId('task-list-null')).toBeInTheDocument()
  })
  // TODO TaskList をレンダリングする際に feature/tasks/taskSlice fetchTasksAsyncで取得するデータのモックの仕方について調べる
})
