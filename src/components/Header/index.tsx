/* eslint-disable react-hooks/exhaustive-deps */
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderContainer, NavigationContainer, ProfileContainer } from './style'
import {
  Menu as MenuComponent,
  IconButton,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import OrangeLogo from './../../assets/images/orange-logo.svg'
import { Logout, Menu, Notifications } from '@mui/icons-material'
import { useScreenWidth } from '../../hooks/useScreenWidth'
import { AxiosAPI } from '../../AxiosConfig'
import { ApplicationContext } from '../../contexts/ApplicationContext'
import { useUserData } from '../../hooks/userDataUtils'
import { defaultTheme } from '../../styles/themes/default'
import Cookies from 'universal-cookie'
import { redirect } from 'react-router-dom'

export function Header() {
  const { applicationState, storeUserData, storeTags } =
    useContext(ApplicationContext)

  const navigate = useNavigate()
  const screenWidth = useScreenWidth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorLogout, setAnchorLogout] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const logoutOpen = Boolean(anchorLogout)

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenLogout = (event: MouseEvent<HTMLImageElement>) => {
    setAnchorLogout(event.currentTarget)
  }

  const handleCloseLogout = () => {
    setAnchorLogout(null)
  }

  function isUserLoggedIn() {
    const isUserLoggedIn = Boolean(
      document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('is-logged-in='))
        ?.split('=')[1],
    )

    return isUserLoggedIn
  }

  // Obtem as tags
  async function getTags() {
    const token = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='))
      ?.split('=')[1]

    if (isUserLoggedIn()) {
      await AxiosAPI.get('tag', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          storeTags(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  // Busca dados do usuário logado
  useUserData()

  useEffect(() => {
    // getUserData()
    getTags()
  }, [])

  async function handleLogout() {
    const cookies = new Cookies()

    await AxiosAPI.post('auth/logout')
      .then(() => {
        navigate('/login')
        storeUserData('', '', '', '', [])
        cookies.remove('token')
        cookies.remove('is-logged-in')
      })
      .catch((error) => {
        console.error(error)
      })
  }

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
                  redirect('/')
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: defaultTheme['color-secondary-60'],
                    transition: 'background-color 0.2s',
                  },
                }}
              >
                <p>Meus Projetos</p>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleClose()
                  redirect('/discover')
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: defaultTheme['color-secondary-60'],
                    transition: 'background-color 0.2s',
                  },
                }}
              >
                <p>Descobrir</p>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleClose()
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: defaultTheme['color-secondary-60'],
                    transition: 'background-color 0.2s',
                  },
                }}
              >
                <p>Configurações</p>
              </MenuItem>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleLogout()
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: defaultTheme['color-secondary-60'],
                    transition: 'background-color 0.2s',
                  },
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sair</ListItemText>
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
        <img
          src={applicationState.userData.avatarUrl}
          alt="Avatar"
          aria-label=""
          aria-controls={logoutOpen ? 'logout-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={logoutOpen ? 'true' : undefined}
          onClick={handleOpenLogout}
        />
        {screenWidth > 768 ? (
          <MenuComponent
            id="logout-menu"
            anchorEl={anchorLogout}
            open={logoutOpen}
            onClose={handleCloseLogout}
            MenuListProps={{
              'aria-labelledby': 'logout-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ top: '50' }}
          >
            <MenuItem
              onClick={() => {
                handleClose()
              }}
              sx={{
                width: '138px',
                '&:hover': {
                  backgroundColor: defaultTheme['color-secondary-60'],
                  transition: 'background-color 0.2s',
                },
              }}
            >
              <p>Configurações</p>
            </MenuItem>

            <Divider />
            <MenuItem
              onClick={() => {
                handleLogout()
              }}
              sx={{
                width: '138px',
                '&:hover': {
                  backgroundColor: defaultTheme['color-secondary-60'],
                  transition: 'background-color 0.2s',
                },
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sair</ListItemText>
            </MenuItem>
          </MenuComponent>
        ) : (
          <></>
        )}

        <IconButton aria-label="notifications">
          <Notifications id="notifications-icon" />
        </IconButton>
      </ProfileContainer>
    </HeaderContainer>
  )
}
