import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { MyPortfolio } from './pages/MyPortfolio'
import { Discover } from './pages/Discover'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  function isUserLoggedIn() {
    const isUserLoggedIn = Boolean(
      document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('is-logged-in='))
        ?.split('=')[1],
    )

    return isUserLoggedIn
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />}
      ></Route>
      <Route
        path="/register"
        element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />}
      ></Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={
            isUserLoggedIn() ? <MyPortfolio /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/discover"
          element={isUserLoggedIn() ? <Discover /> : <Navigate to="/login" />}
        ></Route>
      </Route>
    </Routes>
  )
}
