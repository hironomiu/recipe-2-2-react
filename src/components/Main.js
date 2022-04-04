import { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTokenState,
  selectCsrfTokenState,
} from '../features/auth/authSlice'
import {
  fetchTasksAsync,
  selectDeleteTaskState,
  selectUpdateTaskState,
  selectInsertTaskState,
} from '../features/tasks/tasksSlice'
import TaskList from './TaskList'
import TaskInsertModal from './TaskInsertModal'

const Main = memo(() => {
  const dispatch = useDispatch()
  const token = useSelector(selectTokenState)
  const csrfToken = useSelector(selectCsrfTokenState)
  const deleteTaskState = useSelector(selectDeleteTaskState)
  const updateTaskState = useSelector(selectUpdateTaskState)
  const insertTaskState = useSelector(selectInsertTaskState)
  const [insertModalOn, setInsertModalOn] = useState(false)

  useEffect(() => {
    dispatch(fetchTasksAsync({ token: token }))
  }, [dispatch, token, deleteTaskState, updateTaskState, insertTaskState])

  return (
    <div className="flex flex-col flex-1 items-center my-5 mx-5">
      <TaskList />

      <div className="mt-2 mb-5">
        <button
          className="bg-gray-600 text-white py-3 px-6 text-l rounded"
          onClick={() => setInsertModalOn(true)}
        >
          新規登録
        </button>
      </div>
      {insertModalOn ? (
        <TaskInsertModal
          setInsertModalOn={setInsertModalOn}
          credentials={{ csrfToken: csrfToken }}
        />
      ) : null}
    </div>
  )
})

export default Main
