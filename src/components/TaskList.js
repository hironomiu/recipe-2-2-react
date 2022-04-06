import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectTasksState } from '../features/tasks/tasksSlice'
import Task from './Task'

const TaskList = memo(() => {
  const tasks = useSelector(selectTasksState)

  if (!tasks.length) return <div data-testid="task-list-null"></div>

  return (
    <div className="flex flex-col items-center overflow-y-scroll">
      <table>
        <thead>
          <tr className="border-b-2">
            <th className="px-2 py-2">タスク名</th>
            <th className="px-2 py-2 w-80">内容</th>
            <th className="px-2 py-2">ステータス</th>
            <th className="px-2 py-2">修正</th>
            <th className="px-2 py-2">削除</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default TaskList
