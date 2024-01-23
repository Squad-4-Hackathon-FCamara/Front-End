import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <header>
      <header>
        <h1>Header</h1>
      </header>
      <Outlet />
    </header>
  )
}