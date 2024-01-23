import { Outlet } from "react-router-dom";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <header>
        <h1>Header</h1>
      </header>
      <Outlet />
    </LayoutContainer>
  )
}