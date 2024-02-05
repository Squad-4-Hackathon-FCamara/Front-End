import { Outlet } from 'react-router-dom'
import { LayoutContainer, Spacer } from './style'
import { Header } from '../../components/Header'

// layou padrão da aplicação
export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Spacer />
      <Outlet />
    </LayoutContainer>
  )
}
