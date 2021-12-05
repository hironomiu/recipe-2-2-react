import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as C from '../../config/index'

const initialState = {
  isAuthentication: false,
  csrfToken: '',
  csrfFetchState: 'idle',
  token: '',
  tokenFetchState: 'idle',
  authenticationState: 'idle',
  postAuthenticationState: 'idle',
  logoutState: 'idle',
  isSignUp: false,
  signUpState: 'idle',
}

export const fetchCsrfTokenAsync = createAsyncThunk(
  'auth/fetchCsrfToken',
  async () => {
    const res = await fetch(C.URL + '/api/v1/csrf-token', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()
    return data.csrfToken
  }
)

export const fetchTokenAsync = createAsyncThunk('auth/fetchToken', async () => {
  const res = await fetch(C.URL + '/api/v1/login', {
    method: 'GET',
    credentials: 'include',
  })
  const data = await res.json()
  return data
})

export const signUp = createAsyncThunk('auth/signUp', async (credentials) => {
  const res = await fetch(C.URL + '/api/v1/users', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': credentials.csrfToken,
    },
    redirect: 'follow',
    body: JSON.stringify({
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    }),
  })
  const data = await res.json()
  return data
})

export const postAuthenticationAsync = createAsyncThunk(
  'auth/postAuthentication',
  async (credentials) => {
    const ret = await fetch(C.URL + '/api/v1/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': credentials.csrfToken,
      },
      redirect: 'follow',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })
    const data = await ret.json()
    return data
  }
)

export const logout = createAsyncThunk('auth/logout', async (credentials) => {
  const ret = await fetch(C.URL + '/api/v1/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': credentials.csrfToken,
    },
    redirect: 'follow',
  })
  const data = await ret.json()
  return data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    successAuthentication: (state) => {
      state.isAuthentication = true
    },
    clearToken: (state) => {
      state.token = ''
      sessionStorage.clear()
      state.isAuthentication = false
    },
    toggleSignUp: (state) => {
      state.isSignUp = !state.isSignUp
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfTokenAsync.pending, (state) => {
        state.csrfFetchState = 'loading'
      })
      .addCase(fetchCsrfTokenAsync.fulfilled, (state, action) => {
        state.csrfToken = action.payload
        state.csrfFetchState = 'idle'
      })
      .addCase(fetchTokenAsync.pending, (state) => {
        state.tokenFetchState = 'loading'
      })
      .addCase(fetchTokenAsync.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.token = action.payload.token
          state.isAuthentication = true
        }
        state.tokenFetchState = 'idle'
      })
      .addCase(postAuthenticationAsync.pending, (state) => {
        state.postAuthenticationState = 'loading'
      })
      .addCase(postAuthenticationAsync.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          console.log('called')
          state.token = action.payload.token
          sessionStorage.token = action.payload.token
          state.isAuthentication = true
        } else {
          console.log(action.payload)
          alert(action.payload.message)
        }
        state.postAuthenticationState = 'idle'
      })
      .addCase(postAuthenticationAsync.rejected, (state) => {
        state.postAuthenticationState = 'rejected'
      })
      .addCase(logout.pending, (state) => {
        state.logoutState = 'loading'
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.token = ''
        state.isAuthentication = false
        state.logoutState = 'idle'
      })
      .addCase(signUp.pending, (state) => {
        state.signUpState = 'loading'
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.isSuccess) {
          state.isSignUp = false
        } else {
          console.log(action.payload)
          alert(action.payload.message)
        }
        state.signUpState = 'idle'
      })
  },
})

export const { clearToken, successAuthentication, toggleSignUp } =
  authSlice.actions
export const selectIsAuthentication = (state) => state.auth.isAuthentication
export const selectCsrfTokenState = (state) => state.auth.csrfToken
export const selectTokenState = (state) => state.auth.token
export const selectIsSignUp = (state) => state.auth.isSignUp
export default authSlice.reducer
