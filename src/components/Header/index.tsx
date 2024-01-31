import { MouseEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderContainer, NavigationContainer, ProfileContainer } from './style'
import {
  Menu as MenuComponent,
  IconButton,
  MenuItem,
  Divider,
} from '@mui/material'
import OrangeLogo from './../../assets/images/orange-logo.svg'
import { Logout, Menu, Notifications } from '@mui/icons-material'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { AxiosAPI } from '../../AxiosConfig'
import { ApplicationContext } from '../../contexts/ApplicationContext'

export function Header() {
  const { applicationState, storeUserData } = useContext(ApplicationContext)

  const navigate = useNavigate()
  const screenWidth = useScreenWidth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function getUserData() {
    await AxiosAPI.get('user/me/data')
      .then((response) => {
        console.log('Response: ', response.data)
        storeUserData(
          response.data.id,
          response.data.firstName,
          response.data.lastName,
          response.data.avatar_url,
          response.data.projects,
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // Busca dados do usuário logado
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <HeaderContainer>
      <NavigationContainer>
        {screenWidth < 768 && (
          <>
            <IconButton
              id="basic-button"
              aria-label="notifications"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleOpenMenu}
            >
              <Menu id="menu-icon"></Menu>
            </IconButton>
            {/* 
              anchorReference, anchorPosition, anchorOrigin e transformOrigin
              são usadas para posicionar o menu de forma correta
              ver: https://mui.com/material-ui/react-popover/#anchor-playground
            */}
            <MenuComponent
              id="navigation-menu"
              anchorReference="anchorPosition"
              anchorPosition={{ top: 74, left: 0 }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                  navigate('/')
                }}
              >
                <p>Meus Projetos</p>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleClose()
                  navigate('/discover')
                }}
              >
                <p>Descobrir</p>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleClose()
                }}
              >
                <p>Configurações</p>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleClose()
                }}
              >
                <p>Sair</p>
              </MenuItem>
            </MenuComponent>
          </>
        )}
        <img src={OrangeLogo} alt="Logo" />
        {screenWidth >= 768 && (
          <nav>
            <a href="/">Meus projetos</a>
            <a href="/discover">Descobrir</a>
          </nav>
        )}
      </NavigationContainer>

      <ProfileContainer>
        <img src={applicationState.userData.avatarUrl} alt="Avatar" />
        <IconButton aria-label="notifications">
          <Notifications id="notifications-icon" />
        </IconButton>
      </ProfileContainer>
    </HeaderContainer>
  )
}
