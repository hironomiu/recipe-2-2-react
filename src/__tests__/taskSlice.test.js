import reducer, {
  fetchTasksAsync,
  deleteTaskAsync,
} from '../features/tasks/tasksSlice'

const initialState = {
  tasksStatus: 'idle',
  deleteTaskStatus: 'idle',
  updateTaskStatus: 'idle',
  insertTaskStatus: 'idle',
  value: [],
}

describe('taskSlice', () => {
  describe('fetchTasksAsync', () => {
    it('pending', () => {
      const action = { type: fetchTasksAsync.pending }
      const state = reducer(initialState, action)
      expect(state.tasksStatus).toEqual('loading')
      // 他のステータスはinitialStateのままであること
      expect(state.deleteTaskStatus).toEqual('idle')
      expect(state.updateTaskStatus).toEqual('idle')
      expect(state.insertTaskStatus).toEqual('idle')
      expect(state.value).toEqual([])
    })
    it('fulfilled', () => {
      const action = {
        type: fetchTasksAsync.fulfilled,
        payload: [
          {
            id: 1,
            title: 'dummy title1',
            task: 'dummy task1',
            status: 1,
            status_name: '未着手',
          },
          {
            id: 2,
            title: 'dummy title2',
            task: 'dummy task2',
            status: 1,
            status_name: '未着手',
          },
        ],
      }
      const state = reducer(initialState, action)
      expect(state.tasksStatus).toEqual('idle')
      expect(state.value).toEqual([
        {
          id: 1,
          title: 'dummy title1',
          task: 'dummy task1',
          status: 1,
          status_name: '未着手',
        },
        {
          id: 2,
          title: 'dummy title2',
          task: 'dummy task2',
          status: 1,
          status_name: '未着手',
        },
      ])
      // 他のステータスはinitialStateのままであること
      expect(state.deleteTaskStatus).toEqual('idle')
      expect(state.updateTaskStatus).toEqual('idle')
      expect(state.insertTaskStatus).toEqual('idle')
    })
  })
  describe('deleteTaskAsync', () => {
    it('pending', () => {
      const action = { type: deleteTaskAsync.pending }
      const state = reducer(initialState, action)
      expect(state.deleteTaskStatus).toEqual('loading')
      // 他のステータスはinitialStateのままであること
      expect(state.tasksStatus).toEqual('idle')
      expect(state.updateTaskStatus).toEqual('idle')
      expect(state.insertTaskStatus).toEqual('idle')
      expect(state.value).toEqual([])
    })
    it('fulfilled isSuccess true', () => {
      const action = {
        type: deleteTaskAsync.fulfilled,
        payload: { isSuccess: true },
      }
      const state = reducer(initialState, action)
      expect(state.deleteTaskStatus).toEqual('idle')
    })
  })
})
